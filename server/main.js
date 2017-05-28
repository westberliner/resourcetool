import { Meteor } from 'meteor/meteor';

// fixtures
import "../fixtures/EntryTypes.js"
import "../fixtures/ProjectTypes.js"
import "../fixtures/Resourcetypes.js"
import "../fixtures/Projects.js"
import "../fixtures/Resources.js"

Meteor.startup(() => {
  // init fixtures
  initEntryTypes();
  initProjectsTypes();
  initResourceTypes();
  initResources();
  initProjects();
});
