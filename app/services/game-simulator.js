import Service from '@ember/service'
import { inject } from '@ember/service'
import { later } from '@ember/runloop'
import { shuffle } from 'ember-composable-helpers/helpers/shuffle'
import { computed } from '@ember/object'

const DELAY_BETWEEN_GAMES = 100

export default Service.extend({
store: inject(),

games: computed(function(){
  return this.store.peekAll('game')
}),

  init(){
    this._super(...arguments);

    console.log('game sim---')

    this.seedTeams()

    later(this, this.simulateGame, DELAY_BETWEEN_GAMES)
  },

  seedTeams(){
    let teamNames= ['Manchester', 'Team 2', 'Team 3', 'Team 4']

    for(let i = 0; i < teamNames.length; i++){
      this.store.createRecord('team', { id: i, name: teamNames[i]})
    }
  },

  simulateGame(){
    let teams =  this.store.peekAll('team')

    let shuffleTeams = shuffle(teams)

    let homeTeam = shuffleTeams[0]
    let awayTeam = shuffleTeams[1]

    let homeGoals = this.randomScore(4)
    let awayGoals = this.randomScore(3)

    console.log({homeGoals, awayGoals});

    this.store.createRecord('game', {
      homeTeam,
      awayTeam,
      homeGoals,
      awayGoals,
      playedDate: new Date()
    })

    later(this, this.simulateGame, DELAY_BETWEEN_GAMES)
  },

  randomScore(maximumGoals){
    return Math.round((Math.random() * maximumGoals))
  }

});