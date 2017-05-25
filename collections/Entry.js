// Init Collection
Entries = new Mongo.Collection('Entries');

// Schema
Schema = new SimpleSchema({
  from: {
    type: Date,
    label: "From"
  },
  till: {
    type: Date,
    label: "Till"
  },
  repeat: {
    type: [Number],
    label: "Recuring",
    optional: true
  },
  resource: {
    type: String,
    label: "Resource"
  },
  project: {
    type: String,
    label: "Project"
  },
  entryType: {
    type: String,
    label: "Type"
  },
  allday: {
    type: Boolean,
    label: "All Day",
    optional: true
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

Entries.attachSchema(Schema);
