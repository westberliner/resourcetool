Template.calendarIndex.helpers({
  projects: ()=> {
    return Projects.find({active: true})
  },
  resources: ()=> {
    return Resources.find({active: true});
  },
  
});

Template.calendarIndex.events({
  'click #showOverlay': function(e, template) {
    Overlay.show('Overlay');
  }
});
Template.calendarIndex.onCreated(function() {
  self = this;

  self.autorun(function() {
    self.subscribe('projects');
    self.subscribe('resources');
    self.subscribe('entries');
  })
})

// basic functions
getNumberOfWeeks = function() {
  return parseInt(($(window).innerWidth() - 120)/200);
}
