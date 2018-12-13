<template lang="pug">
  #Login
    Card
      p(slot="title") 登入
      FormTool(:Instance="Instance" Button="登入" :Btn_long="true" @handleResult="Login")
      pre {{ Api_Data }}
</template>

<script>

import FormTool from '../components/FormTool';
import { isEmpty } from '../utils';
import pushTo from '@/router/push';
export default {
  name: 'Login',
  components: {
    FormTool,
  },
  data() {
    return {
      Api_Data: {},
      Instance: {
        account: {
          label: '帳號',
          placeholder: '請輸入帳號',
          required: true,
          value: '',
        },
        password: {
          label: '密碼',
          placeholder: '請輸入密碼',
          required: true,
          type: 'password',
          value: '',
        },
      },
    };
  },
  methods: {
    /**
     * Login
     */
    async Login(res) {
      /**
       * Api
       */
      const resp = await this.$api.Login(res);
      if (isEmpty(resp)) {
        return;
      }

 //     const hashKey = 'KEYS';
      
 //     this.Api_Data = resp.data;

      // set localStorage
//      localStorage.setObjectHash(hashKey, resp.data)

      // get localStorage
//      const Values = localStorage.getObjectHash(hashKey);
//      console.log(Values)
      pushTo.main(this.$router)
      console.log(this.$route.path);
    
    },
  },
};
</script>


<style lang="scss" scoped>
@import '../style/_layout.scss';
#Login
{
    background-color: #eee;

    @include Flex;
    @include size;
    .ivu-card
    {
        box-shadow: 0 2px 2px rgba(204, 197, 185, .5);

        @include size(500px, auto);
    }
}

</style>

