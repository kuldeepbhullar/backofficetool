<template>
  <div>
    <div class="uk-child-width-1-2" uk-grid>
      <div>
          <div class="uk-card uk-card-muted">

            <div class="uk-card-body">

              <p class="uk-text-uppercase"> Firstname: <input type="text" v-model="firstname"></p>
              <p class="uk-text-uppercase"> Last name: <input type="text" v-model="lastname"></p>
              <p class="uk-text-uppercase"> E-mail: <input type="text" v-model="email"></p>
              <p class="uk-text-uppercase"> Password: <input type="text" v-model="password"></p>
              <p class="uk-text-uppercase"> Biography: <input type="text" v-model="biography"></p>

              <button class="text-center" @click="updateProfile">Update Profile</button>
            </div>
            <button @click="clearCookie">Log out</button>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    const user = this.$cookies.get('cookie-user')
    if(user)
      return {
        firstname: user.user.firstname,
        lastname:user.user.lastname,
        email:user.user.email,
        password:user.user.password,
        biography:user.user.biography,
        api_url: process.env.strapiBaseUri,
      }
    else {
      return {
        firstname:"",
        lastname:"",
        email:"",
        password:"",
        biography:"",
        api_url: process.env.strapiBaseUri,
      }
    }
  },
  methods: {
    clearCookie() {
      this.$cookies.set("cookie-user", undefined)
      this.$router.push("/login")
    },

    updateProfile() {
      this.$axios.$put(`/api/users/${this.userInfo.user.id}`, {
          firstname: this.firstname,
          lastname: this.lastname,
          email: this.email,
          biography:this.biography,
          password: this.password
        },
        {
          headers: {
            Authorization: `Bearer ${this.userInfo.jwt}`,
          }
        }
      ).then(response => {
        console.log("response", response)
        this.$cookies.set('cookie-user', {
          jwt: this.userInfo.jwt,
          user: response
        })
      }).catch((err) => {

      })
    },
  },
  computed: {
    userInfo() {
      const user = this.$cookies.get('cookie-user')
      console.log(user.user)
      if(user)
        return user;
      else {
        return undefined;
      }
    }
  },

}
</script>
