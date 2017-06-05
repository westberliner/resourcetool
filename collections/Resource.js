Resources = new Mongo.Collection('Resources');

// todo modify access
Resources.allow({
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

Schema = new SimpleSchema({
  name: {
    type: String,
    label: "Name"
  },
  active: {
    type: Boolean,
    label: "Active",
    autoValue: function() {return true},
    optional: true
  },
  workdays: {
    type: [Number],
    label: "Workdays",
    optional: true,
  },
  projectType: {
    type: String,
    label: "Project Type"
  },
  resourceType: {
    type: String,
    label: "Resources Type"
  },
  color: {
    type: String,
    label: "Color"
  },
  icon: {
    type: String,
    label: "Icon",
    optional: true,
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

Resources.attachSchema(Schema);
