<template>
    <div>
        <div class="container" style="margin-top: 20px">
            <div  class="card border-info">
                <div class="card-title text-center" style="margin-top: 10px"><b>Relógio de Oração AD Brás - Colônia Japonesa e Arraial do Bonfim</b></div>
                <div class="card-body" style="margin-top: -20px">
                    O tempo de oração é de 15 minutos. Se você deseja orar mais, selecione quantos horários quiser. 
                    O objetivo é termos pessoas orando 24 horas por dia.
                </div>
                <div class="card-footer text-center">
                    <small class="text-muted"><b><i>Então, me invocareis, e ireis, e orareis a mim, e eu vos ouvirei.</i></b> Jeremias 29:12</small>
                </div>
            </div>

            <div class="card bg-light" style="margin-top: 20px; margin-bottom: 20px" >
               <div class="card-body">
                    <div class="card-title text-center" style="margin-top: 10px"><b>Digite seu nome e escolha o(os) horário(os), por último, clique em Registrar. </b></div>
                    <hr>
                    <p class="card-text">
                        <b-form>
                            <b-form-group id="user" label-for="user">
                                <b-form-input v-model="user" id="user" required placeholder="Digite aqui seu nome completo"></b-form-input>
                            </b-form-group>

                            <b-form-group>
                                <button @click="registerPrayer" type="button" class="btn btn-success">Registrar</button>
                            </b-form-group>

                            <b-form-group>
                                <button @click="pushToWatch" type="button" class="btn btn-info">Clique aqui se deseja acompanhar a lista de oração</button>
                            </b-form-group>
                        </b-form>
                    </p>
                </div>
            </div>

            <div class="card text-center border-light">
                <table class="table table-reponsive-sm table-sm table-striped">
                <thead>
                    <b><tr>Horários disponíveis</tr></b>
                </thead>
                    <tbody>
                        <tr v-for="line in activeHours" :key="line.hour">
                            <td>
                                <div class="custom-control custom-checkbox">
                                    <input :disabled="line.used" v-model="selected" :value="line.hour" class="custom-control-input" :id="line.hour" type="checkbox" />
                                    <label class="custom-control-label" :for="line.hour"> {{ line.label }}</label>
                                </div> 
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
  
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    data() {
        return {
            selected: [],
            user: null
        }
    },

    created () {
      document.title = 'Registre-se'
    },

    computed: {
        ...mapGetters({ 
            activeHours: 'activeHours',
            message: 'message',
            messageClass: 'messageClass',
            messageTitle: 'messageTitle'  }),
    },
    
    methods: {
        ...mapActions(['register']),
        
        pushToWatch(){
            this.$router.push('Watch')
        },
        registerPrayer() {
            if(this.validateFields()){
                const schedule = {
                    hour: this.selected,
                    user: this.user
                }
                
                this.register(schedule)
                this.showToast(this.message, this.messageTitle, this.messageClass)
                this.cleanFields()
            }
        },

        validateFields(){
            if (!this.user) {
                this.showToast('Digite seu nome', 'Erro', 'danger')
                return false
            }

            if (this.selected.length == 0) {
                this.showToast('Selecione ao menos um horário', 'Erro', 'danger')
                return false
            }

            return true
        },

        showToast(message, title, variant){
            this.$bvToast.toast(message, {
                title: title,
                variant: variant,
                solid: true
            })
        },

        cleanFields(){
            this.selected = []
            this.user = null
        }
    }
}
</script>