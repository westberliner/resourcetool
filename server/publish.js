Meteor.publish('projects', function(){
  return Projects.find({active: true});
});
Meteor.publish('resources', function(){
  return Resources.find({active: true});
});
Meteor.publish('entries', function(){
  return Entries.find({});
});
Meteor.publish('entryTypes', function(){
  return EntryTypes.find({});
});
