PlayersList = new Mongo.Collection('players');

if(Meteor.isClient){
  Meteor.subscribe('thePlayers');
  // this code only runs on the client
  Template.leaderboard.helpers({
    'player': function(){
      var currentUserId = Meteor.userId();
      return PlayersList.find({ createdBy: currentUserId },
          { sort: {score: -1, name: 1} });
    },
    'otherHelperFunction': function(){
      return "Some other function";
    },
    'selectedClass': function(){
      let playerId = this._id;
      let selectedPlayer = Session.get('selectedPlayer');
      if(playerId == selectedPlayer){
        return "selected"
      }
    },
    'selectedPlayer': function(){
      var selectedPlayer = Session.get('selectedPlayer');
      return PlayersList.findOne({ _id: selectedPlayer });
    }
  });
  Template.leaderboard.events({
    'click .player': function(){
      let playerId = this._id;
      Session.set('selectedPlayer', playerId);
      let selectedPlayer = Session.get('selectedPlayer');
      console.log(selectedPlayer);
    },
    'click .increment': function(){
      var selectedPlayer = Session.get('selectedPlayer');
      PlayersList.update({ _id: selectedPlayer }, { $inc: {score: 5 }});
    },
    'click .decrement': function(){
      var selectedPlayer = Session.get('selectedPlayer');
      PlayersList.update({ _id: selectedPlayer }, {$inc: {score: -5} });
    },
    'click .remove': function(){
      var selectedPlayer = Session.get('selectedPlayer');
      PlayersList.remove({ _id: selectedPlayer });
    }
  });
  Template.addPlayerForm.events({
    // events go here
    'submit form': function(event){
      event.preventDefault();
      var playerNameVar = event.target.playerName.value;
      var currentUserId = Meteor.userId();
      PlayersList.insert({
        name: playerNameVar,
        score: 0,
        createdBy: currentUserId
      });
      event.target.playerName.value = "";
    }
  });
}

if(Meteor.isServer){
  // this code only runs on the server
  Meteor.publish('thePlayers', function(){
    var currentUserId = this.userId;
    return PlayersList.find({ createdBy: currentUserId });
  });
}

