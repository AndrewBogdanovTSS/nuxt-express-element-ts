<template>
  <section>
    <nuxt-link to="/house">House</nuxt-link>
    <el-row :gutter="20">
      <el-col v-for="house in houses" :key="house.id" :sm="8" :span="12">
        <House :house="house"/>
      </el-col>
    </el-row>

  </section>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'nuxt-class-component'
  import House from '~/components/House'
  import {State, Action, Getter, namespace} from 'vuex-class'

  @Component({
    components: {House},
    middleware: 'getHouses'
  })
  export default class extends Vue {
    @State houses: any[]
  }
</script>

<style lang="scss">
  .el-col {
    margin-bottom: 20px;
  }
</style>
