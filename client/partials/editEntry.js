Template.editEntry.events({
  'click button[type=submit]': function(e, template) {
    Overlay.hide();
  },
  'click button[type=reset]': function(e, template) {
    var id = template.data.entry._id;
    Entries.remove(id);
    Overlay.hide();
  }
});
