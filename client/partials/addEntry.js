Template.registerHelper("selectProject", function() {
  projects = Projects.find({active: true}).map(function(project){
    return {label: project.name, value: project._id}
  });
  return projects;
});
Template.registerHelper("selectResource", function() {
  resources = Resources.find({active: true}).map(function(resource){
    return {label: resource.name, value: resource._id}
  });
  return resources;
});
Template.registerHelper("selectEntryType", function() {
  entryTypes = EntryTypes.find().map(function(entryType){
    return {label: entryType.label, value: entryType.machineName}
  });
  return entryTypes;
});

Template.addEntry.events({
  'click button[type=submit]': function(e, template) {
    Overlay.hide();
  }
});
