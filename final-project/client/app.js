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
    'click .btn-secondary': function (event) {
      event.preventDefault();
      console.log(event.target.id);
      Session.set('board', event.target.id);
    },

    'click #update': function () {
      Session.set("board", "submissions");
    },

    'click #newsubmit': function () {
      Session.set("board", "polls");
    }

  });



  Template.body.helpers({
    isStories: function()
    {
      console.log(Session.get('board'));
      return (Session.get('board') == 'polls');
    }
  });
}