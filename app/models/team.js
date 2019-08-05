import DS from 'ember-data';
const { Model } = DS;
import { computed } from '@ember/object'
import { union, filterBy, sum, mapBy  } from '@ember/object/computed'


export default Model.extend({
  name: DS.attr('string'),
  homeGames: DS.hasMany('game', {inverse: 'homeTeam'}),
  awayGames: DS.hasMany('game', {inverse: 'awayTeam'}),

  games: union('homeGames', 'awayGames'),

  gamesDrawn: filterBy('games', 'isDrawn'),
  gamesLost: filterBy('games', 'isLost'),
  gamesWon: filterBy('games', 'isWon'),

  homeGoalsScoredArr: mapBy('homeGames', 'homeGoals'),
  homeGoalsScored: sum('homeGoalsScoredArr'),

  awayGoalsScoredArr: mapBy('awayGames', 'awayGoals'),
  awayGoalsScored: sum('awayGoalsScoredArr'),

  goalsScored: computed('homeGoalsScored', 'awayGoalsScored', function(){
    return this.homeGoalsScored + this.awayGoalsScored
  }),

  homeGoalsConcededArr: mapBy('homeGames', 'awayGoals'),
  homeGoalsConceded: sum('homeGoalsConcededArr'),

  awayGoalsConcededArr: mapBy('awayGames', 'homeGoals'),
  awayGoalsConceded: sum('awayGoalsConcededArr'),

  goalsConceded: computed('homeGoalsConceded', 'awayGoalsConceded', function(){
    return this.homeGoalsConceded + this.awayGoalsConceded
  }),

  goalDifference: computed('goalsScored', 'goalsConceded', function(){
    return this.goalsScored - this.goalsConceded;
  }),

  points: computed('gamesWon.length', 'gamesDrawn.length', function(){
    return this.gamesWon.length*3 + this.gamesDrawn.length
  })

});
