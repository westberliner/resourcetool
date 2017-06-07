Template.registerHelper("selectProject", function() {
  projects = Projects.find({active: true}).map(function(project){
    return {label: project.name, value: project._id}
  });
  return projects;
});
