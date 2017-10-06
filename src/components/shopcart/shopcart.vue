<template>
<div class="shopcart">
    <div class="content" @click="toggleList">
        <div class="content-left">
            <div class="logo-wrapper">
                <div class="logo" :class="{highlight: totalCount>0}">
                    <span class="icon-shopping_cart" :class="{highlight: totalCount>0}"></span>
                </div>
                <div class="num" v-show="totalCount>0">{{totalCount}}</div>
            </div>
            <div class="price" :class="{highlight: totalCount>0}">￥{{totalPrice}}</div>
            <div class="delivery">另配送费￥{{deliveryPrice}}元</div>
        </div>
        <div class="content-right">
            <div class="pay" :class="payClass">
                {{payDesc}}
             </div>
        </div>
    </div>
    <transition name="fold">
    <div class="shopcart-list" v-show="listShow">
        <div class="list-header">
            <h1 class="title">购物车</h1>
            <span class="empty" @click="empty">清空</span>
        </div>
        <div class="list-content" ref="listContent">
            <ul>
                <li class="food" v-for="food in selectFoods">
                    <span class="name">{{food.name}}</span>
                    <div class="price">
                        <span>￥{{food.price*food.count}}</span>
                    </div>
                    <div class="cartcontrol-wrapper">
                        <CartControl :food="food"></CartControl>
                    </div>
                </li>
            </ul>
        </div>
    </div>
    </transition>
    <div class="list-mask" v-show="listShow" @click="hideList"></div>
</div>


</template>

<script type="text/ecmascript-6">
import CartControl from "../cartcontrol/cartcontrol";
import BScroll from "better-scroll";
export default {
    props: {
        deliveryPrice:{
            type: Number,
            default: 0
        },
        minPrice: {
            type: Number,
            default: 0
        },
        selectFoods: {
            type: Array,
            default() {
                return [{
                    count: 1,
                    price: 10
                }]
            }
        }
    },
    data(){
       return{
        fold: true
       } 
    },
    components: {
        CartControl
    },
    computed: {
        totalPrice: function(){
            let total = 0;
            this.selectFoods.forEach((food)=>{
                total = total + food.count * food.price
            })
            return total
        },
        totalCount: function(){
            let count = 0;
            this.selectFoods.forEach((food)=>{
                count = count + food.count;
            })
            return count
        },
        payDesc: function(){
            if(this.totalPrice === 0){
                return "￥"+this.minPrice+"元起送"
            } else if(this.totalPrice<this.minPrice){
                let diff = this.minPrice - this.totalPrice
                return "还差￥"+diff+"元起送"
            } else {
                return "去结算"
            }
        },
        payClass: function(){
            if(this.totalPrice < this.minPrice)
                return "not-enough";
            else
                return "enough";
        },
        listShow: function(){
            if(!this.totalCount) {
                return false
            } else {
                let show = !this.fold
                if(show){
                    this.$nextTick(function(){
                        this.scroll = new BScroll(this.$refs.listContent,{
                            click: true
                        })
                    })
                }
                return show
            }

        }
    },
    methods: {
        toggleList: function(){
            if(!this.totalCount){
                this.fold = true
                return 
            }
            
            this.fold = !this.fold  
            console.log(this.listShow)
        },
        empty: function(){
            this.selectFoods.forEach((food)=>{
                food.count = 0
            })
        },
        hideList: function(){
            this.fold = true
            console.log(this.selectFoods)
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus">
.shopcart
    position: fixed
    bottom: 0
    left: 0
    width: 100%
    height: 48px
    .content
        display: flex
        background: #141d27
        // z-index 仅能在定位元素上奏效,所以这个是后来加上去的
        position: relative
        z-index: 100
        .content-left
            flex: 1
            .logo-wrapper
                display: inline-block
                position: relative
                // z-index: 50
                top: -10px
                margin: 0 12px
                padding: 6px
                width: 56px
                height: 56px
                box-sizing: border-box
                border-radius: 50%
                background: #141d27
                .logo
                    width: 100%
                    height: 100%
                    border-radius: 50%
                    background: #2b343c   
                    text-align: center
                    &.highlight
                        background: rgb(0,160,220)
                    .icon-shopping_cart
                        color: #80858a     
                        font-size: 24px      
                        line-height: 44px
                        &.highlight
                            color: #fff
                .num 
                    position: absolute
                    top: 0
                    right: 0
                    background: rgb(240,20,20)
                    color: #fff
                    border-radius: 16px
                    width: 24px
                    line-height: 16px
                    font-size: 9px
                    font-weight: 700
                    text-align: center
                    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.4)
            .price
                display: inline-block
                vertical-align: top
                margin-top: 12px
                font-size: 16px
                color: rgba(255,255,255,0.4)
                font-weight: 700
                line-height: 24px
                padding-right: 12px
                border-right: 1px solid rgba(255,255,255,0.1)
                &.highlight
                    color: #fff
            .delivery
                display: inline-block
                margin: 18px 0 0 12px
                color: rgba(255,255,255,0.4)
                font-size: 10px
                vertical-align: top
                
        .content-right
            flex: 0 0 105px
            width: 105px 
            .pay
                font-size: 12px
                color: rgba(255,255,255,0.4)
                text-align: center
                line-height: 48px
                font-weight: 700
                &.not-enough
                    background: #2b333b
                &.enough
                    background: #00b43c
                    color: #fff
    .shopcart-list
        position: absolute
        left: 0
        top: 0
        z-index: 50
        width: 100%
        // fold样式
        transform: translate3d(0,-100%,0)
        .list-header
            height: 40px
            line-height: 40px
            padding: 0 18px 
            background: #f3f5f7
            border-bottom: 1px solid rgba(7,17,27,0.1)
            .title
                float: left
                font-size: 14px
                color: rgb(7,17,27)
            .empty
                float: right
                font-size: 12px
                color: rgb(0,160,220)
        .list-content
            padding: 0 18px
            // 超过这个高度就不再无限增高
            max-height: 217px
            // hidden后用better-scroll插件
            overflow: hidden
            background: #fff
            .food
                position: relative
                padding: 12px 0
                border-bottom: 1px solid rgba(7,17,27,0.1)
                .name
                    line-height: 24px
                    font-size: 14px
                    color: rgb(7,17,27)
                .price
                    position: absolute
                    bottom: 12px
                    right: 90px
                    line-height: 24px
                    font-size: 14px
                    font-weight: 700
                    color: rgb(240,20,20)
                .cartcontrol-wrapper
                    position: absolute
                    right: 0
                    bottom: 6px
                    
                    
        &.fold-enter-active,&.fold-leave-active
            transition: all 1s
        &.fold-enter,&.fold-leave-to
            transform: translate3d(0,0,0)
    .list-mask
        position: fixed
        top: 0
        width: 100%
        z-index: 40
        height: 100%
        background: rgba(7,17,27,0.6)
            
            
</style>
