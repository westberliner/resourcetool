EntryTypes = new Mongo.Collection('EntryTypes');

Schema = new SimpleSchema({
  label: {
    type: String,
    label: "Label"
  },
  machineName: {
    type: String,
    label: "Machine Name"
  },
  createdAt: {
    type: Date,
    label: "Created At",
    autoValue: function() {
      return new Date();
    },
    autoform: {
      type: 'hidden'
    }
  }
});

EntryTypes.attachSchema(Schema);
