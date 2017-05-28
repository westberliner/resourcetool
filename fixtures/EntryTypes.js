initEntryTypes = function() {
  if ( EntryTypes.find().count() === 0 ) {
    var entryTypes = [
      {label: "Default", machineName: "default"},
      {label: "Education", machineName: "education"},
      {label: "Overtime", machineName: "overtime"},
      {label: "Vacation", machineName: "vacation"}
    ];
    _.each(entryTypes, function(entryType){
      EntryTypes.insert({
        label: entryType.label,
        machineName: entryType.machineName
      });
    });
    console.log('Add EntryTypes');
  }
}
