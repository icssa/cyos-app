Meteor.subscribe("polls");
Template.body.helpers({

  polls: function() {
    return Polls.find();
  }

});

// adds index to each item
UI.registerHelper('indexedArray', function(context, options) {
  if (context) {
    return context.map(function(item, index) {
      item._index = index;
      return item;
    });
  }
});


Accounts.ui.config({
  passwordSignupFields: "USERNAME_ONLY"
});


if (Meteor.isClient) {
  Template.body.created = function() {
    Session.set("board", "polls");
  }

  Template.selectFrame.helpers({
    active: function() {
      return Session.get('board');
    }
  });

  Template.body.events({
    'click .btn-primary': function (event) {
      event.preventDefault();
      console.log(event.target.id);
      Session.set('board', event.target.id);
    }
  });
}