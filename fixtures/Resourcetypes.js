initResourceTypes = function() {
  if ( ResourceTypes.find().count() === 0 ) {
    var resourceTypes = [
      {label: "Default", machineName: "default"},
      {label: "Website", machineName: "website"},
      {label: "Design", machineName: "design"},
      {label: "Motion", machineName: "motion"}
    ];
    _.each(resourceTypes, function(resourceType){
     ResourceTypes.insert({
        label: resourceType.label,
        machineName: resourceType.machineName
      });
    });
    console.log('Add RecourceTypes');
  }
}
