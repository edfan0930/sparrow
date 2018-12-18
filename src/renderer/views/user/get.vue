<template>
    <div>
        <Input search enter-button placeholder="Enter something..." v-model="si" @on-search="gg"/>
    </div>
</template>
<script>
    export default {
        data (){
            return {
                si:''
            }
        },
        methods: {
            gg () {
                console.log(this.si);
            }
        }
    }
</script>
