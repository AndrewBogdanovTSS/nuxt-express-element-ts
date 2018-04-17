<template>
  <div class="House">
    <h1>House {{$route.params.id}}</h1>
    <h3>name:{{house.name}}</h3>
    <nuxt-link to="/">Main</nuxt-link>

  </div>
</template>
<script lang="ts">
  import Vue from "vue"
  import Component from "nuxt-class-component"
  import {State, Action, Getter, namespace} from "vuex-class"
  import {VueWithRoute} from "~/types"

  @Component({
    middleware: 'getHouses'
  })
  export default class extends Vue implements VueWithRoute{
    @State private houses:any[]
    // @Getter('5a3f7cc172fe5f1380356b2e') house
    // @Getter((state) => (id) => this.houses.filter(h => h._id === id)[0]) house
    get house(){
      return this.houses.filter(h => h._id === this.$route.params.id)[0];
    }
  }
</script>
