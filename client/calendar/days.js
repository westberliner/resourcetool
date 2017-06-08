Template.days.helpers({
  daysOfTheWeek: function() {
    var currentWeek = moment().week(Template.instance().data.week),
        days = [];
    for (var i = 1; i <= 5; i++) {
      var day = {cssDate: currentWeek.isoWeekday(i).format('D-M-YY'), valueDate: currentWeek.isoWeekday(i).format('M/D/YY')};
      days.push(day);
    }
    return days;
  }
});

Template.days.events({
  'click .add': function(e, template) {
    var dom = $(e.currentTarget),
        id = dom.attr('data-resource-id'),
        day = dom.attr('data-day');
    Overlay.show('addEntry', {resourceId: id, dayFrom: day});
  }
});
