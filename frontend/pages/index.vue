

<template>
  <div>
    <div class="tab">
      <button @click="openTab('item')" v-bind:class="{'white': !clicked, 'blue': clicked}" v-on:click="clicked = !clicked">
        Items
      </button>
      <button @click="openTab('profile')">
        Profile
      </button>
    </div>

    <div id="item" class="tabcontent" style="display: block;">
      <h3>Items</h3>
      <Items :items="items" ></Items>
    </div>

    <div id="profile" class="tabcontent">
      <h3>Edit Profile</h3>
      <Profile />
    </div>

  </div>
</template>

<script>
import itemsQuery from '~/apollo/queries/item/items.gql'
import Items from '~/components/Items'
import Profile from '~/components/Profile'
export default {
  created () {
    var login_cookie = this.$cookies.get('cookie-user');
    if(!login_cookie) {
      this.$router.push('/login');
    }
  },
  watch: {
  },
  data() {
    return {
      items: {
        data: [],
      },
    }
  },
  apollo:{
    items:{
      prefetch: true,
      query: itemsQuery
    }
  },
  components:{
    Items,
    Profile
  },
  methods: {
    openTab(tabName){
      var i, tabcontent, tablinks;
      tabcontent = document.getElementsByClassName("tabcontent");
      for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
      }
      tablinks = document.getElementsByClassName("tablinks");
      for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
      }
      document.getElementById(tabName).style.display = "block";
    }
  }
};
</script>

<style>
  .white {
    background-color: blue;
  }
  .blue {
    background-color: red;
  }
</style>
