import Vue from 'vue'

export default {
    state: {
        prayer: {
            id: '20/03/2020',
            date: '',
            schedules: [
                { hour: '08:00', user: ''},
                { hour: '08:30', user: ''},
                { hour: '09:00', user: ''},
                { hour: '09:30', user: ''},
                { hour: '14:00', user: ''},
                { hour: '14:30', user: ''},
                { hour: '15:00', user: ''},
                { hour: '15:30', user: ''},
                { hour: '19:00', user: ''},
                { hour: '19:30', user: ''},
                { hour: '20:00', user: ''},
                { hour: '20:30', user: ''},
            ]
        },
        schedule: {
            user: null,
            hour: null
        },
        isAvailable: true
    },
    
    mutations: {
        register(state, { user, hour }) {
            Vue.prototype.$http('prayer-watch/prayers.json').then(resp => {
                const data = resp.data
                state.prayer = data
            })

            let schedules = state.prayer.schedules
           
            hour.forEach(function(hour){
                for (let index = 0; index < schedules.length; index++) {
                   if (schedules[index].hour == hour) {
                      if(schedules[index].user == '' || schedules[index].user){
                            schedules[index].user = user
                      }
                    }
                }
             });

             let prayers = state.prayer
             
             Vue.prototype.$http.put('prayer-watch.json', { prayers })

        },
    },
    actions: {
        register({ commit }, schedule) {
            commit('register', schedule)
        }
    },
    getters: {
        prayer(state){
            return state.prayer
        },

        schedule(state){
            return state.schedule
        },

        activeHours(state) {
            Vue.prototype.$http('prayer-watch/prayers.json').then(resp => {
                const data = resp.data
                state.prayer = data
            })
            
            return state.prayer.schedules.filter(function(hour) {
                 return !hour.user
             })
        },
        
        prayersList(state) {
            return state.prayer.schedules.filter(function(hour) {
                return hour.user
            })
        }
    }
}