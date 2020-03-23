<template>
    <div class="container" style="margin-top: 20px">
        <div class="card text-center border-info">
            <div class="card-body">
                <p class="card-text">
                   <b-form-input v-model="search" id="search" placeholder="Digite um nome para buscar"></b-form-input>
                   <button @click="pushBack" type="button" style="margin-top: 10px; margin-left: 10px" class="btn btn-info">Clique aqui para retornar</button>
                </p>
            </div>   
        </div>  
        <div style="margin-top: 20px" class="card text-center border-light">
            <ul class="list-group list-group-flush">
                <li v-for="line in filteredList" :key="line.hour" class="list-group-item">
                    <b> {{ line.user }} </b> - Período: {{ line.label }}
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'


export default {
    data() {
        return {
            search: ''
        }
    },

    created () {
      document.title = 'Lista de oração'
    },
    
    computed: {
        ...mapGetters({
           users: 'users'
        }),

        filteredList() {
            return this.users.filter(post => {
                return post.user.toLowerCase().includes(this.search.toLowerCase())
            })
        }
    },

    methods: {
        pushBack(){
            this.$router.go(-1)
        },
    }
    
}
</script>