import Service from '@ember/service'
import { inject } from '@ember/service'
import { later } from '@ember/runloop'
import { shuffle } from 'ember-composable-helpers/helpers/shuffle'
import { computed } from '@ember/object'

const DELAY_BETWEEN_GAMES = 1000

export default Service.extend({
store: inject(),

teams: computed(function(){
  return this.store.peekAll('team')
}),

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
    let teamNames= ['Madrid', 'Barcelona', 'Atletico M', 'Atletico B', 'Valencia', 'Deportivo', 'Sevilla', 'Elche']

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
