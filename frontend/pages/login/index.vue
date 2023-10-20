import { setCookie } from 'nookies';
<template>
  <div>
    <div class="uk-child-width-1-2" uk-grid>
      <div>
        <div class="uk-card uk-card-muted">

          <div class="uk-card-body">

            <p class="uk-text-uppercase"> email:
              <input type="text" name="email" id="email">
            </p>
            <p class="uk-text-uppercase"> password:
              <input type="password" name="password" id="password">
            </p>
            <button type="button" @click="checkAuth">Login</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      api_key: process.env.apiToken
    }
  },

  props: {
  },
  methods: {
    checkAuth() {
      const email = document.querySelector('#email').value;
      const pasword = document.querySelector('#password').value;

      const user = this.$axios.$post(`/api/auth/local`, {
          identifier: email,
          password: pasword
        },
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.api_key}`,
          }
        }
      ).then(response => {
        this.$cookies.set('cookie-user', response, {
          path: '/',
          maxAge: 60 * 60 * 24 * 7
        })
        this.$router.push('/');

      }).catch((err) => {

      })
    },
  },
}
</script>
