<template>
<div class="shopcart">
  <div class="total">
      <div class="icon-wrapper">
          <!-- <div class="border"></div> -->
          <div class="icon" :class="{highLight:totalSale>0}">
             <i class="icon-shopping_cart"></i>
          </div>
      </div>
      <div class="count-wrapper">
          <span class="count">￥{{totalSale}}</span>
      </div>
      <div class="border"></div>
  </div>
  <div class="delivery">
    <div class="cost">另需配送费￥{{seller.deliveryPrice}}元</div>
  </div>
  <div class="state">
    <div class="diffPrice" :class="{enough:diffPrice=='结算'}">
        {{diffPrice}}
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: "shopcart",
  props: {
    seller: {
      type: Object
    },
    foodList: {
      type: Array
    }
  },
  // data() {
  //   return {
  //     foodList: [{
  //       count: 1,
  //       sale: 0
  //     }]
  //   }
  // },
  computed: {
    totalSale: function() {
      let total = 0
      // console.log(this.foodList)
      this.foodList.forEach(function(food) {
           total = total + food.count * food.sale
      })
      return total
    },
    diffPrice: function() {
      if(this.totalSale == 0){
        return "￥"+this.seller.minPrice+"起送"
      } else if (this.totalSale<this.seller.minPrice) {
        let diff= this.seller.minPrice - this.totalSale
        return "还差￥"+ diff + "元起送"
      } else {
        return "结算"
      }
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.shopcart
  background-color: #141d27
  height: 50px
  display: flex
  .total
      flex: 1
      font-size: 0
      .icon-wrapper
          display: inline-block
          background-color: #141d27
          margin-left: 16px
          padding: 6px
          position: relative
          border-radius: 50%
          top: -6px
          .icon
              font-size: 24px
              color: rgba(255,255,255,0.4)
              padding: 8px
              background-color: rgba(255,255,255,0.1)
              border-radius: 50%
              &.highLight
                  color: #fff
                  background: rgb(0,160,220)
      .count-wrapper
          display: inline-block
          margin-left: 14px
          position: relative
          bottom: 6px
          .count
              font-size: 16px
              color: rgba(255,255,255,0.4)
              font-weight: 700
      .border
          display: inline-block
          margin-left: 12px
          height: 20px
          border-left: 1px rgba(255,255,255,0.1) solid
  .delivery
      flex: 0 0 40%
      margin-left: 10px
      margin-top: 16px
      .cost
        font-size: 16px
        color: rgba(255,255,255,0.4)
        font-weight: 700
  .state
      flex: 0 0 20%
      line-height: 50px
      background-color: rgba(255,255,255,0.1)
      text-align: center
      .diffPrice
          font-size: 12px
          color: rgba(255,255,255,0.4)
          font-weight: 700
          &.enough
            background: #00b43c
            color: #fff
        
</style>
