PlayersList = new Mongo.Collection('players');

if(Meteor.isClient){
  // this code only runs on the client
  Template.leaderboard.helpers({
    'player': function(){
      return PlayersList.find();
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
    }
  });
  Template.leaderboard.events({
    'click .player': function(){
      let playerId = this._id;
      Session.set('selectedPlayer', playerId);
      let selectedPlayer = Session.get('selectedPlayer');
      console.log(selectedPlayer);
    }
  });
}

if(Meteor.isServer){
  // this code only runs on the server

}

