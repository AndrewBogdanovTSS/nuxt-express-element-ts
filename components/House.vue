<template>
  <div class="House" @click="showId">
    <el-card>
      <div class="image-wrap">
        <img
          src="http://cdn-image.travelandleisure.com/sites/default/files/styles/1600x1000/public/airbnb0615-buy-a-home.jpg?itok=LSmHol46"
          class="image">
      </div>
      <div style="padding: 20px;">
        <span class="house-name">{{house.name}}</span>
        <span class="house-address">{{house.address}}</span>
        <span class="house-sell-price">{{housePrice}}</span>
        <el-row class="details">
          <el-col class="info-rooms" :span="8">
            <div class="details-count">{{house.rooms}}</div>
            <div class="details-title">rooms</div>
          </el-col>
          <el-col class="info-floors" :span="8">
            <div class="details-count">2</div>
            <div class="details-title">floors</div>
          </el-col>
          <el-col class="info-square" :span="8">
            <div class="details-count"><span>{{house.square}} ft</span><sup>2</sup></div>
            <div class="details-title">square</div>
          </el-col>
        </el-row>
      </div>
    </el-card>
  </div>
</template>


<script lang="ts">
  import Vue from 'vue'
  import Component from 'nuxt-class-component'
  import {Prop} from 'vue-property-decorator'

  @Component
  export default class extends Vue {
    @Prop() house
    housePrice = this.house.sellPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    showId(){
      console.log(this.house._id);
      this.$router.push(`/house/${this.house._id}`)
    }
  }
</script>

<style lang="scss">
  @import "../assets/scss/variables.scss";
  @import "../assets/scss/mixins.scss";
  .House {
    cursor: pointer;
    @keyframes card-hover {
      from {left: -75%;}
      to {left: 100%;}
    }
    &:hover {
      .image-wrap {
        &:before {
          animation-name: card-hover;
          animation-duration: .5s;
        }
      }
      .image {
        opacity: .8;
        transform: scale(1);
      }
    }
    .el-card__body {
      padding: 0;
    }
    .image-wrap {
      position: relative;
      background-color: #000;
      overflow: hidden;
      /*backface-visibility: hidden;*/
      /*perspective: 1000;*/
      /*transform: translate3d(0, 0, 0);*/
      &:before {
        content: '';
        display: block;
        position: absolute;
        top: 0;
        left: -75%;
        z-index: 2;
        width: 50%;
        height: 100%;
        background: linear-gradient(to right,rgba(255,255,255,0) 0,rgba(255,255,255,.3) 100%);
        transform: skewX(-25deg);
      }
    }
    .house-name {
      @include ellipsis();
      display: block;
      margin-top: 10px;
      color: $mainGray;
      font-size: 20px;
      font-weight: 600;
      text-transform: uppercase;
      transition: all .3s ease;
      &:hover {
        color: $mainGreen;
      }
    }
    .house-address {
      @include ellipsis();
      display: block;
      margin-top: 7px;
      color: $secondaryGray;
      font-size: 13px;
    }
    .house-sell-price {
      display: block;
      color: $mainGreen;
      font-size: 20px;
      font-weight: 500;
      margin-top: 24px;
      &:before {
        content: '$';
      }
    }
    .bottom {
      margin-top: 13px;
      line-height: 12px;
    }

    .image {
      width: 100%;
      display: block;
      transform: scale(1.1);
      transition: all .3s ease;
    }
  }

  .details {
    text-align: center;
    color: $secondaryGray;
    font-size: 15px;
    font-weight: 600;
    margin-top: 18px;
    .el-col {
      margin-bottom: 0;
    }
    .details-title {
      font-size: 12px;
      font-weight: 300;
      padding-top: 2px;
    }
    sup {
      vertical-align: baseline;
      position: relative;
      top: -.5em;
      font-size: 12px;
    }
  }

</style>
