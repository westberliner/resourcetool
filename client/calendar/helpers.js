Template.registerHelper('concat', function () {
    return Array.prototype.slice.call(arguments, 0, -1).join('');
});
