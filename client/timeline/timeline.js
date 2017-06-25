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
    },
    changed: function(id, fields) {
      if(undefined != fields.project) {
        // for some reason we need to clear content. otherwise it will append the new content
        var item = {id: id, className: fields.project};
        timeline.entries.update(item);
      }
    },
    removed: function (id) {
      timeline.entries.remove(id);
    }
  });

})

Template.timeline.onRendered(function() {
  var container = document.getElementById('timeline-chart');

  timeline.init(container);

  FlowRouter.subsReady("resources", function() {
    timeline.addGroups();
  });
  FlowRouter.subsReady("entries", function() {
    timeline.addEntries();
  });
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
  timeline: null,
  init: function(container) {
    this.container = container;
    this.timeline = new vis.Timeline(this.container);
    this.timeline.setOptions(this.options);
    this.timeline.setGroups(this.groups);
    this.timeline.setItems(this.entries);
  },
  addEntries: function() {
    var self = this;
    Entries.find().map(function(entry) {
      var item = {start: new Date(entry.from), end: new Date(entry.till), group: entry.resource, className: entry.project, id: entry._id};
      self.entries.add(item);
    });
  },
  addGroups: function() {
    var self = this;
    Resources.find().map(function(res) {
      self.groups.add({content: createResourceLink(res._id, res.name), id: res._id, value: res.name, className: res._id});
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
    groupEditable: true,
    start: moment().toDate(),
    dataAttributes: ['id'],
    onAdd: function(item, callback) {
      var d = moment(item.start).hour(0).minute(0);
      item.start = d.toDate();
      item.end = d.hour(23).minute(59).toDate();
      item.type = 'range';
      callback(item);
    },
    min: moment().day(1).month(1).year(moment().year()-1).toDate(),
    max: moment().day(31).month(12).year(moment().year()+1).toDate(),
    zoomMin: 1000 * 60 * 60 * 24 * 5,             // one day in milliseconds
    zoomMax: 1000 * 60 * 60 * 24 * 31 * 12     // about three months in milliseconds
  }

}




