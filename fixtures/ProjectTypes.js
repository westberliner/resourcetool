initProjectsTypes = function() {
  if ( ProjectTypes.find().count() === 0 ) {
    var projectTypes = [
      {label: "Default", machineName: "default"},
      {label: "Website", machineName: "website"},
      {label: "Design", machineName: "design"},
      {label: "Motion", machineName: "motion"}
    ];
    _.each(projectTypes, function(projectType){
      ProjectTypes.insert({
        label: projectType.label,
        machineName: projectType.machineName
      });
    });
    console.log('Add ProjectTypes');
  }
}
