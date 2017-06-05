Projects = new Mongo.Collection('Projects');

// todo modify access
Projects.allow({
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

Projects.attachSchema(Schema);
