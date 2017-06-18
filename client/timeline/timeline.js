var groups;
var items;

var addGroups = function() {
  Resources.find().map(function(res) {
    groups.add({content: res.name, id: res._id, value: res.name, className: res._id});
  });
}
var addEntries = function() {
  Entries.find().map(function(entry) {
    var item = {start: new Date(entry.from), end: new Date(entry.till), group: entry.resource, className: entry.project, id: entry._id};
    console.log(item.start, entry.from);
    items.add(item);
    //groups.add({content: res.name, id: res._id, value: res.name, className: res._id});
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
      groups.update({id: id, content: fields.name, value: fields.name, className: id});
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
