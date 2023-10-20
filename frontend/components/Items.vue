<template>
  <div>
    <div class="uk-child-width-1-1" uk-grid>
      <div>
          <div v-for="item in itemDatas" class="uk-card">
            <div class="uk-card-body">
              <p
                id="title"
                v-if="item.attributes.Name"
                class="uk-text-large"
              >
                Name : {{ item.attributes.Name }} ,
                Date Time : {{ item.attributes.Date }} ,
                Important : {{ item.attributes.Important }}
              </p>
            </div>
          </div>
            <div class="uk-card-body">
              <p class="uk-text-uppercase"> Name: <input type="text" v-model="newData.itemName"></p>
              <p class="uk-text-uppercase"> Date: <input type="datetime-local" v-model="newData.date"></p>
              <p class="uk-text-uppercase"> Important:
                <select v-model="newData.important">
                  <option v-for="val in [true, false]" :value="val">{{val}}</option>
              </select>
              </p>
              <button @click="createItem()">Add</button>
            </div>
      </div>
    </div>
  </div>
</template>

<script>

import createItemQuery from '~/apollo/queries/item/newItem.gql'

export default {
  methods: {
    // async createItem() {
    //   try {
    //     const { data } = await this.$apollo.mutate({
    //       mutation: createItemQuery, // Replace with the path to your GraphQL mutation
    //       variables: {
    //         data: {
    //           Name: this.newData.itemName,
    //           Important: this.newData.important,
    //           Date: this.newData.date.toLocaleString('en-GB'),
    //         }
    //       },
    //     });
    //     console.log('Created item:', data);
    //   } catch (error) {
    //     console.error('Error creating item:', error);
    //   }
    // },

    createItem() {
      let data = {
        data:{
          Name: this.newData.itemName,
          Important: this.newData.important,
          Date: this.newData.date.toLocaleString('en-GB'),
        }
      }
      console.log(this.newData)
      this.$axios.$post(`/api/items`, data
        ,
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.userInfo.jwt}`,
          },
        }
      ).then(response => {
      }).catch((err) => {
      })
    }
  },
  mounted() {
    var now = new Date();
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var day = now.getDate();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var localDatetime =
      year +
      '-' +
      (month < 10 ? '0' + month.toString() : month) +
      '-' +
      (day < 10 ? '0' + day.toString() : day) +
      'T' +
      (hour < 10 ? '0' + hour.toString() : hour) +
      ':' +
      (minute < 10 ? '0' + minute.toString() : minute);

    this.newData.date = localDatetime;
  },
  data() {
    return {
      newData:{
        api_url: process.env.strapiBaseUri,
        itemName:"",
        date : new Date(),
        important:false
      }
    };
  },
  props: {
    items: Object,
  },
  computed: {
    itemDatas() {
      return this.items.data;
    },
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
};
</script>
