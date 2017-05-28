initProjects = function() {
  if ( Projects.find().count() === 0 ) {
    var projects = [
      {name: "Project 1", color: "#ffffff", projectType: "default"},
      {name: "Project 2", color: "#ffffff", projectType: "default"},
      {name: "Project 3", color: "#ffffff", projectType: "default"},
      {name: "Project 4", color: "#ffffff", projectType: "default"}
    ];
    _.each(projects, function(project){
      Projects.insert({
        name: project.name,
        color: project.color,
        active: true,
        projectType: project.projectType
      });
    });
    console.log('Add Projects');
  }
}
