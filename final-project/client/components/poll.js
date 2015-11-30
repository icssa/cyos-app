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
      console.log(pollID);
    Polls.update(
        {_id: pollID},
        {$inc: action}
    );


  },


  //event to handle clicking delete
  'click .delete': function (event) {
    var pollID = $(event.currentTarget).parent('.poll').data('id');
  Polls.remove(pollID);
  },

    //event to handle clicking update
    'click .update': function (event) {
        var pollID = $(event.currentTarget).parent('.poll').data('id');
        Polls.update(
            {_id: pollID},
            {$inc: action}
        );
    },

    'submit form': function(event, template) {

        // stop the form from submitting
        event.preventDefault();
        var pollID = $(template.data);
        console.log(pollID);
        // get the data we need from the form
        var newPoll = {
            totalvotes: 0,
            creator: Meteor.user().username,
            threshold: event.target.threshold.value,
            question: event.target.question.value,
            choices: [
                {  text: event.target.choice1.value, votes: 0 },
                {  text: event.target.choice2.value, votes: 0 },
                {  text: event.target.choice3.value, votes: 0 }
            ],
            responses: [
                {  text: event.target.response1.value},
                {  text: event.target.response2.value},
                {  text: event.target.response3.value}
            ]
        };

        // create the new poll
        Polls.update(
            {_id: template},
            {}
        );
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
  max = this.choices[i].votes;
  which = i;
}

    }
    return this.responses[which].text;
  }

});
