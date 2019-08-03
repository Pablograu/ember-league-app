import DS from 'ember-data';
const { Model } = DS;
import { union, filterBy  } from '@ember/object/computed'


export default Model.extend({
  name: DS.attr('string'),
  homeGames: DS.hasMany('game', {inverse: 'homeTeam'}),
  awayGames: DS.hasMany('game', {inverse: 'awayTeam'}),

  games: union('homeGames', 'awayGames'),
  gamesDrawn: filterBy('games', 'isDrawn'),
  gamesLost: filterBy('games', 'isLost'),
  gamesWon: filterBy('games', 'isWon'),
});
