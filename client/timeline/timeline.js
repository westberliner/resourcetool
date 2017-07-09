var createResourceLink = function(id, name) {
  var textNode = document.createTextNode(name);
  var link = document.createElement('a');
  link.setAttribute('class', 'edit-resource');
  link.setAttribute('data-resource-id', id);
  link.appendChild(textNode);
  return link;
}

Template.timeline.onCreated(function() {
  self = this;

  Resources.find().observeChanges({
    added: function (id, fields) {
      timeline.groups.add({content: createResourceLink(id, fields.name), id: id, value: fields.name, className: id});
    },
    changed: function(id, fields) {
      if(undefined != fields.name) {
        // for some reason we need to clear content. otherwise it will append the new content
        timeline.groups.update({id: id, content: ''});
        var item = {id: id, content: createResourceLink(id, fields.name )};
        timeline.groups.update(item);
      }
    },
    removed: function (id) {
      timeline.groups.remove(id);
    }
  });
  Entries.find().observeChanges({
    added: function (id, fields) {
      var item = {
        id: id,
        start: new Date(fields.from),
        end: new Date(fields.till),
        type: 'range',
        group: fields.resource,
        className: (fields.project != undefined)?fields.project:''
      };
      timeline.entries.add(item);
    },
    changed: function(id, fields) {
      var item = {id: id},
          currentItem = timeline.entries.get(id),
          changed = false;
      if(undefined != fields.project) {
        // for some reason we need to clear content. otherwise it will append the new content
        item.className = fields.project;
        changed = true;
      }
      if(undefined != fields.from && fields.from != currentItem.start) {
        item.start = fields.from;
        changed = true;
      }
      if(undefined != fields.till && fields.till != currentItem.end) {
        item.end = fields.till;
        changed = true;
      }
      if(undefined != fields.resource && fields.resource != currentItem.group) {
        item.group = fields.resource;
        changed = true;
      }
      if(changed) {
        timeline.entries.update(item);
      }

    },
    removed: function (id) {
      var currentItem = timeline.entries.get(id);
      if(currentItem) {
        timeline.entries.remove(id);
      }
    }
  });

})

Template.timeline.onRendered(function() {
  var container = document.getElementById('timeline-chart');

  timeline.init(container);

});

Template.timeline.helpers({
  projects: ()=> {
    return Projects.find({active: true});
  }
});

Template.timeline.events({
  'click .edit-project': function(e, template) {
    var id = $(e.currentTarget).attr('data-project-id');
    Overlay.show('editProject', {project: Projects.findOne(id)});
  },
  'click .edit-resource': function(e, template) {
    var id = $(e.currentTarget).attr('data-resource-id');
    Overlay.show('editResource', {resource: Resources.findOne(id)});
  },
  'click .item': function(e, template) {
    var id = $(e.currentTarget).attr('data-id');
   // Overlay.show('editEntry', {entry: Entries.findOne(id)});
  }
});

var timeline = {
  container: null,
  entries: new vis.DataSet(),
  groups: new vis.DataSet(),
  timelineBeginAt: moment().locale('de').second(0).minute(0).hour(0).day(1).month(1).year(moment().locale('de').year()-1),
  timelineEndAt: moment().locale('de').second(59).minute(23).hour(59).day(31).month(12).year(moment().locale('de').year()+1),
  timeline: null,
  init: function(container) {
    var self = this;
    this.container = container;
    // set min, max
    this.options.min = this.timelineBeginAt.toDate();
    this.options.max = this.timelineEndAt.toDate();
    // hide sa, sar
    this.options.hiddenDates[0].start = this.timelineBeginAt.isoWeekday('Saturday').format("YYYY-MM-DD HH:mm:ss");
    this.options.hiddenDates[0].end = this.timelineBeginAt.day(8).isoWeekday('Monday').format("YYYY-MM-DD HH:mm:ss");
    this.timeline = new vis.Timeline(this.container);
    this.timeline.setOptions(this.options);
    this.timeline.setGroups(this.groups);
    this.timeline.setItems(this.entries);
    self.timeline.setWindow(
      moment().isoWeekday('Monday').hour(0).minute(0).toDate(),
      moment().day(30).hour(0).minute(0).toDate()
    );
    this.entries.on('update', function(event, properties, senderId) {
      var item = properties.data[0],
          end = moment(item.end),
          diff = end.diff(item.start);
      if((diff/1000/60/60/24) < 0.9) {
        item.end = end.day(end.day()+1).toDate();
        self.entries.update({id: item.id, end: item.end});
      };
      if(item.id) {
        Entries.update(item.id, {
          $set: {
            from: item.start,
            till: item.end,
            resource: item.group
          }
        });
      }
    });
  },
  options: {
    groupOrder: function (a, b) {
      return a.value - b.value;
    },
    groupOrderSwap: function (a, b, groups) {
    	var v = a.value;
    	a.value = b.value;
    	b.value = v;
    },
    orientation: 'top',
    editable: true,
    start: moment().locale('de').toDate(),
    dataAttributes: ['id'],
    onAdd: function(item, callback) {
      var d = moment(item.start).hour(0).minute(0),
          nd = d.clone().day(d.day()+1);
      item.start = d.toDate();
      item.end = nd.toDate();
      item.type = 'range';
      var entry = Entries.insert({
        from: item.start,
        till: item.end,
        resource: item.group,
        entryType: 'default'
      });
    },
    onRemove: function(item, callback) {
      Entries.remove(item.id);
    },
    snap: function (date, scale, step) {
      var snapTo = moment(date).locale('de').hour(0).minute(0).second(0);
      return snapTo.toDate();
    },
    hiddenDates: [
      {start: '2013-10-26 00:00:00', end: '2013-10-28 00:00:00', repeat: 'weekly'}, // daily weekly monthly yearly
    ],
    format: {
      minorLabels: {
        millisecond:'SSS',
        second:     's',
        minute:     'HH:mm',
        hour:       'HH:mm',
        weekday:    'ddd D.',
        day:        '[KW-]w D.',
        week:       '[KW-]w',
        month:      'MMM',
        year:       'YYYY'
      },
      majorLabels: {
        millisecond:'HH:mm:ss',
        second:     'D MMMM HH:mm',
        minute:     'ddd D MMMM',
        hour:       'ddd D MMMM',
        weekday:    'MMMM YYYY [KW-]w',
        day:        'MMMM YYYY',
        week:       'MMMM YYYY',
        month:      'YYYY',
        year:       ''
      }
    },
    timeAxis: {scale: 'weekday', step: 1},
    locales: {
      de: {
        current: 'Aktuelle',
        time: 'Zeit'
      }
    },
    locale: 'de',
    min: null,
    max: null,
    zoomMin: 1000 * 60 * 60 * 24 * 5,             // one day in milliseconds
    zoomMax: 1000 * 60 * 60 * 24 * 31 * 12     // about three months in milliseconds
  }
}




