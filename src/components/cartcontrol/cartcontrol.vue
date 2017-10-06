<template>
<div class="cartcontrol">
    <transition name="slide-fade">
        <div class="cart-decrease icon-remove_circle_outline" v-show="food.count>0"  @click = "decreaseCart"></div>
    </transition>
    <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
    <transition name="slide-fade">
        <div class="cart-add icon-add_circle" @click = "addCart"></div>
    </transition>
</div>
</template>

<script type="text/ecmascript-6">
import Vue from "vue";
export default {
    props: {
        food: {
            type: Object
        }
    },
    created: function(){
        // console.log(this.food)
    },
    methods: {
        addCart: function(){
            if(!this.food.count){
                // 用下面这行的话是对food新增了一个属性，dom检测不出的，所以要引入全局的Vue
                // this.food.count = 1
                Vue.set(this.food,"count",1)
            } else {
                console.log(this.food.count)
                this.food.count++
            }
        },
        decreaseCart: function(){
            if(this.food.count){
                this.food.count--
            }
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus">
.cartcontrol
    font-size: 0
    .cart-count
        display: inline-block
        vertical-align: top
        width: 12px
        padding-top: 12px
        text-align: center
        font-size: 10px
        color: rgb(147,153,159)
    .cart-decrease,.cart-add
        display: inline-block
        font-size: 24px
        line-height: 24px
        padding: 6px
        color: rgb(0,160,220)
        &.slide-fade-enter-active 
          transition: all .3s ease
        &.slide-fade-leave-active 
          transition: all .3s ease
        &.slide-fade-enter,&.slide-fade-leave-to
          transform: translateX(10px)
          opacity: 0


</style>
