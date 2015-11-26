// attach events to our poll template
Template.poll.events({

  // event to handle clicking a choice
  'click .vote': function (event, template) {

    // prevent the default behavior
    event.preventDefault();

    // get the parent (poll) id
    var pollID = $(event.currentTarget).parent('.poll').data('id');
    var voteID = $(event.currentTarget).data('id');



    console.log(template.data.totalvotes);
    // create the incrementing object so we can add to the corresponding vote
    var voteString = 'choices.' + voteID + '.votes';
    var action = {};
    action[voteString] = 1;
  action['totalvotes'] = 1;


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
    if(Meteor.user()) {

      if (Meteor.user().username === this.creator) {

        return true;
      }
      else return false;
    }
  },
    belowThreshold: function (){
        if(this.totalvotes >= this.threshold)
        {
            return false;
        }
        else return true;
    },
    exceedsThreshold: function (){
        if(this.totalvotes >= this.threshold)
        {
            return true;
        }
        else return false;
    }
  ,
  getMaxVoted: function (){
    var max = -999;
    var i = 0;
    var which = 0;
    for (i; i < 3; i++)
    {
if(this.choices[i].votes > max)
{
  console.log(this.choices[i].votes);
  max = this.choices[i].votes;
  which = i;
}

    }
    return this.responses[which].text;
  }

});
