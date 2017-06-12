Template.days.helpers({
  daysOfTheWeek: function() {
    var currentWeek = moment().week(Template.instance().data.week),
        days = [],
        resourceId = Template.instance().data.resourceId;
    for (var i = 1; i <= 5; i++) {
      var currentDate = currentWeek.isoWeekday(i),
          day = {
            cssDate: currentWeek.isoWeekday(i).format('D-M-YY'),
            valueDate: currentWeek.isoWeekday(i).format('M/D/YY')
         };
      day.entries = Entries.find({resource: resourceId, from: {$lte: currentDate.toDate()}, till: {$gte: currentDate.toDate()}}).fetch();
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
  },
  'click .entry': function(e, template) {
    var dom = $(e.currentTarget),
        id = dom.attr('data-edit-entry');
    if(entry = Entries.findOne(id)) {
      Overlay.show('editEntry', {entry: entry});
    }

  }
});
