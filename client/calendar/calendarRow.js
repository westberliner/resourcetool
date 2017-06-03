Template.calendarRow.helpers({
  weeks: ()=> {
    var cw = [],
        currentWeek = moment().week();
    for(var i = 0; i < getNumberOfWeeks(); i++) {
      cw.push(currentWeek+i);
    }
    return cw;
  }
});
