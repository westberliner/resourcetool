// Init Collection
Entries = new Mongo.Collection('Entries');

// todo modify access
Entries.allow({
  insert: function(userId, doc) {
    return true;
  },
  update: function(userId, doc) {
    return true;
  },
  remove: function(userId, doc) {
    return true;
  }
});

// Schema
Schema = new SimpleSchema({
  from: {
    type: Date,
    label: "From",
    autoform: {
      type: 'bootstrap-datepicker'
    }
  },
  till: {
    type: Date,
    label: "Till",
    autoform: {
      type: 'bootstrap-datepicker'
    }
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
// Index maybe for later. not sure if this is a good idea
//Entries._ensureIndex({resource:1, project:1}, {unique: 1});
// add schema to collection
Entries.attachSchema(Schema);
