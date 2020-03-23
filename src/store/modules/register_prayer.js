import Vue from 'vue'
import hours from '../hours'

export default {
    state: {
        message: '',
        messageClass: '',
        messageTitle: '',
        prayers: {
            id: 'Periodo 01',
            createdAt: new Date(),
            schedules: hours
        }
    },
    
    mutations: {
        register(state, { user, hour }) {
            Vue.prototype.$http.get('prayer-watch/prayers.json').then(resp => {
                const data = resp.data
                
                if(data) {
                    state.prayers = data
                }
            })

            let schedules = state.prayers.schedules
            let unavailableHours = []

            hour.forEach(function(hour){
                for (let index = 0; index < schedules.length; index++) {
                   if (schedules[index].hour == hour) {
                      if(schedules[index].user == '' && !schedules[index].user){
                        schedules[index].user = user
                      } else {
                        unavailableHours.push(hour)
                      }
                    }
                }
             });
             
            let prayers = state.prayers
            
            Vue.prototype.$http.put('prayer-watch.json', { prayers })

             if(unavailableHours.length == 0){
                state.message = 'Registro salvo com sucesso!'
                state.messageClass = 'success'
                state.messageTitle = 'Sucesso'
             } else {
                state.message = 'O horário  [' + unavailableHours + '] escolhido não está mais disponível.'
                state.messageClass = 'warning'
                state.messageTitle = 'Atenção'
             }
        }
    },

    actions: {
        register({ commit }, schedule) {
            commit('register', schedule)
        }
    },

    getters: {
        prayers(state){
            return state.prayers
        },

        schedule(state){
            return state.schedule
        },

        message(state){
            return state.message
        },

        messageClass(state){
            return state.messageClass
        },

        messageTitle(state){
            return state.messageTitle
        },

        activeHours(state) {
            Vue.prototype.$http.get('prayer-watch/prayers.json').then(resp => {
                const data = resp.data
                
                if(data) {
                    state.prayers = data
                }
            })
            
            return state.prayers.schedules.filter(function(hour) {
                 return !hour.user
            })
        },

        users(state) {
            Vue.prototype.$http.get('prayer-watch/prayers.json').then(resp => {
                const data = resp.data
                
                if(data) {
                    state.prayers = data
                }
            })
            
            return state.prayers.schedules.filter(function(hour) {
                 return hour.user
            })
        },
    }
}