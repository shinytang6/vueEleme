<template>
<div class="shopcart">
    <div class="content">
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
</div>

</template>

<script type="text/ecmascript-6">
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
        .content-left
            flex: 1
            .logo-wrapper
                display: inline-block
                position: relative
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
</style>
