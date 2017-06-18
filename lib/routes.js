FlowRouter.route('/', {
  name: 'home',
  waitOn: function() {
    Meteor.subscribe('projects');
    Meteor.subscribe('resources');
    Meteor.subscribe('entries');

    return Meteor.subscribe('entryTypes');

  },
  subscriptions: function(params, queryParams) {
    this.register('projects', Meteor.subscribe('projects'));
    this.register('resources', Meteor.subscribe('resources'));
    this.register('entries', Meteor.subscribe('entries'));
    this.register('entryTypes', Meteor.subscribe('entryTypes'));
  },
  action: function() {
     BlazeLayout.render('MainLayout', {main: 'timeline'});
  }
});
FlowRouter.route('/classic', {
  name: 'home',
  action: function() {
     BlazeLayout.render('MainLayout', {main: 'calendarIndex'});
  }
});
