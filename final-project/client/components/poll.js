// attach events to our poll template
Template.poll.events({

  // event to handle clicking a choice
  'click .vote': function (event) {

    // prevent the default behavior
    event.preventDefault();

    // get the parent (poll) id
    var pollID = $(event.currentTarget).parent('.poll').data('id');
    var voteID = $(event.currentTarget).data('id');

console.log($(event));
    // create the incrementing object so we can add to the corresponding vote
    var voteString = 'choices.' + voteID + '.votes';
    var action = {};
    action[voteString] = 1;

    // increment the number of votes for this choice
    Polls.update(
        {_id: pollID},
        {$inc: action}
    );
  },


  //event to handle clicking delete
  'click .delete': function (event) {
    var pollID = $(event.currentTarget).parent('.poll').data('id');
  Polls.remove(pollID);
  }

});

Template.poll.helpers({
  isCreator: function (){
    if(Meteor.user().username == this.creator)
    {
        this.totalvotes += 44;
      return true;
    }
    else return false;
  },
    belowThreshold: function (){
        if(this.totalvotes >= this.threshold)
        {
            return true;
        }
        else return false;
    },
    exceedsThreshold: function (){
        if(this.totalvotes >= this.threshold)
        {
            return false;
        }
        else return true;
    }

});
