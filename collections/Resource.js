Resources = new Mongo.Collection('Resources');

Schema = new SimpleSchema({
  name: {
    type: String,
    label: "Name"
  },
  active: {
    type: Boolean,
    label: "Active",
    autoValue: function() {return 1},
    optional: true
  },
  workdays: {
    type: [Number],
    label: "Workdays",
    optional: true,
  },
  projectType: {
    type: String,
    label: "Type"
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
