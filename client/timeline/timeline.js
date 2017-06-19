var groups;
var items;

var addGroups = function() {
  Resources.find().map(function(res) {
    groups.add({content: createResourceLink(res._id, res.name), id: res._id, value: res.name, className: res._id});
  });
}

var createResourceLink = function(id, name) {
  var textNode = document.createTextNode(name);
  var link = document.createElement('a');
  link.setAttribute('class', 'edit-resource');
  link.setAttribute('data-resource-id', id);
  link.appendChild(textNode);
  return link;
}
var addEntries = function() {
  Entries.find().map(function(entry) {
    var item = {start: new Date(entry.from), end: new Date(entry.till), group: entry.resource, className: entry.project, id: entry._id};
    items.add(item);

  });
}
var renderTimeline = function() {
  groups = new vis.DataSet();
  items = new vis.DataSet();
  // create visualization
  var container = document.getElementById('timeline-chart');
  var options = {
    // option groupOrder can be a property name or a sort function
    // the sort function must compare two groups and return a value
    //     > 0 when a > b
    //     < 0 when a < b
    //       0 when a == b
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
    start: new Date(2015, 6, 1),
    end: new Date(2015, 10, 1)
  };
  var timeline = new vis.Timeline(container);
  timeline.setOptions(options);
  timeline.setGroups(groups);
  timeline.setItems(items);

};

Template.timeline.events({

});

Template.timeline.onCreated(function() {
  self = this;
  
  Resources.find().observeChanges({
    added: function (id, fields) {
    },
    changed: function(id, fields) {
      if(undefined != fields.name) {
        // for some reason we need to clear content. otherwise it will append the new content
        groups.update({id: id, content: ''});
        var item = {id: id, content: createResourceLink(id, fields.name )};
        groups.update(item);
      }
    },
    removed: function (id) {
    }
  });
})

Template.timeline.onRendered(function() {
  renderTimeline();
  FlowRouter.subsReady("resources", function() {
    addGroups();
  });
  FlowRouter.subsReady("entries", function() {
    addEntries();
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
  }
});
