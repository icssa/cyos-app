// run this when the meteor app is started
Meteor.startup(function() {

  // if there are no polls available create sample data
  if (Polls.find().count() === 0) {

    // create sample polls
    var samplePolls = [
      {
        creator: "abc",
        threshold: 5,
        totalvotes: 0,
        question: 'You are stuck in a room.',
        choices: [
          { text: 'Retrieve arms', votes: 0 },
          { text: 'Leave room', votes: 0 },
          { text: 'Panic', votes: 0 }
        ],
        responses: [
          { text: 'You already have arms'},
          { text: 'There is no exit'},
          { text: 'You panic, but nothing happens'}
        ]
      }
    ];

    // loop over each sample poll and insert into database
    _.each(samplePolls, function(poll) {
      Polls.insert(poll);
    });

  }

  Meteor.publish("polls", function () {
    return Polls.find({}, {fields: {secretInfo: 0}});
  });
});
