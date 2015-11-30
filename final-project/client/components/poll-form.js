Template.pollForm.events({

  // handle the form submission
  'submit form': function(event) {

    // stop the form from submitting
    event.preventDefault();

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
    Polls.insert(newPoll);
  }


});