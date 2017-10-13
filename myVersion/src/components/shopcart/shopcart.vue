<template>
<div class="shopcart">
  <div class="total">
      <div class="icon-wrapper">
          <!-- <div class="border"></div> -->
          <div class="icon">
             <i class="icon-shopping_cart"></i>
          </div>
      </div>
      <div class="count-wrapper">
          <span class="count">￥0</span>
      </div>
      <div class="border"></div>
  </div>
  <div class="delivery">
    <div class="cost">另需配送费￥{{seller.deliveryPrice}}元</div>
  </div>
  <div class="state">
    <div class="minPrice">
        ￥{{seller.minPrice}}起送
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
      flex: 0 0 44%
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
      .minPrice
          font-size: 12px
          color: rgba(255,255,255,0.4)
          font-weight: 700
      
          
      
        
</style>
