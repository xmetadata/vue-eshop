<template>
  <div class="home">
    <!-- header -->
    <mt-header title="确认订单">
      <router-link to="/" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>

    <mt-field label="用户名" placeholder="用户名" v-model="username" v-validate="'required|email'" name="username"></mt-field>
    <span v-show="errors.has('username')">{{ errors.first('username') }}</span>
    <mt-field label="邮编" placeholder="邮编" v-model="post_code" name="post_code"></mt-field>
  </div>
</template>

<script>
import Vue from 'vue'
import { Field, Header, Button } from 'mint-ui'
import { Validator } from 'vee-validate'

Vue.component(Field.name, Field)
Vue.component(Header.name, Header)
Vue.component(Button.name, Button)

const dictionary = {
  en: {
    attributes: {
      username: 'Email Address'
    }
  },
  ar: {
    attributes: {
      username: 'البريد الاليكتروني'
    }
  }
}

Validator.localize(dictionary)

export default {
  name: 'Buy',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
