Meteor.publish('projects', function(){
  return Projects.find({active: true});
});
