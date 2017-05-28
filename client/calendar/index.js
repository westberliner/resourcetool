Template.calendarIndex.helpers({
  projects: ()=> {
    Projects.find({active: true})
  }
});

Template.calendarIndex.events({
  'click #showOverlay': function(e, template) {
    Overlay.show('Overlay');
  }
});
Template.calendarIndex.helpers({
  projects: ()=> {
    console.log(Projects.find().count());
    return Projects.find({active: true});
  }
});
Template.calendarIndex.onCreated(function() {
  self = this;

  self.autorun(function() {
    self.subscribe('projects');
    self.subscribe('Resources');
    self.subscribe('Entries');
  })
})
