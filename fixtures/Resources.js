initResources = function() {
  if ( Resources.find().count() === 0 ) {
    var resources = [
      {name: "Resource 1", color: "#ffffff", resourceType: "default", projectType: "default"},
      {name: "Resource 2", color: "#ffffff", resourceType: "default", projectType: "default"},
      {name: "Resource 3", color: "#ffffff", resourceType: "default", projectType: "default"},
      {name: "Resource 4", color: "#ffffff", resourceType: "default", projectType: "default"}
    ];
    _.each(resources, function(resource){
      Resources.insert({
        name: resource.name,
        color: resource.color,
        active: true,
        resourceType: resource.resourceType,
        projectType: resource.projectType
      });
    });
    console.log('Add Resources');
  }
}
