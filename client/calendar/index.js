Template.calendarIndex.helpers({
  projects: ()=> {
    return Projects.find({active: true});
  },
  resources: ()=> {
    return Resources.find({active: true});
  }
  
});

Template.calendarIndex.events({
  'click #showOverlay': function(e, template) {
    Overlay.show('Overlay');
  },
  'click .edit-project': function(e, template) {
    var id = $(e.currentTarget).attr('data-project-id');
    Overlay.show('editProject', {project: Projects.findOne(id)});
  },
  'click .edit-resource': function(e, template) {
    var id = $(e.currentTarget).attr('data-resource-id');
    Overlay.show('editResource', {resource: Resources.findOne(id)});
  }
});
Template.calendarIndex.onCreated(function() {
  self = this;

  self.autorun(function() {
    self.subscribe('projects');
    self.subscribe('resources');
    self.subscribe('entries');

    self.subscribe('entryTypes');
  })
})

// basic functions
getNumberOfWeeks = function() {
  return parseInt(($(window).innerWidth() - 120)/200);
}
