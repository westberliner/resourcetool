FlowRouter.route('/', {
  name: 'home',
  action: function() {
     BlazeLayout.render('MainLayout', {main: 'calendarIndex'});
  }
});
