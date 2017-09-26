<template>
  <div class="header">
      <div class="content-wrapper">
          <div class="avatar">
              <img :src="seller.avatar" width="64px" height="64px">
          </div>
          <div class="content">
              <div class="title">
                  <span class="brand"></span>
                  <span class="name">{{seller.name}}</span>
              </div>
              <div class="description">
                  {{seller.description}}/{{seller.deliveryTime}}分钟送达
              </div>
              <!-- 因为seller是异步传过来的，所以其初始值为空，所以要检查一下有没有异步获取到seller.supports再进行下一步操作,直接用seller也行 -->
              <div class="supports" v-if="seller.supports">
                  <span class="icon" :class="classMap[seller.supports[0].type]"></span>
                  <span class="text">{{seller.supports[0].description}}</span>
              </div>
          </div>
          <div class="support-count" v-if="seller.supports">
              <span class="count">{{seller.supports.length}}个</span>
              <i class="icon-keyboard_arrow_right"></i>
          </div>
      </div>
      <div class="bulletin-wrapper"></div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'header',
  data() {
    return {
      classMap : ["decrease","discount","special","invoice","guarantee"]
    }
  },
  props: {
    seller:{
        type: Object

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus">
.header
    color: white
    background: grey
    .content-wrapper
        padding: 24px 12px 18px 24px
        position: relative
        font-size: 0
        // 设置为inline不会发生变化 ，因为设置为内联元素下面不能包含块级元素，而这边的div.content 内包含了块级元素，所以不变化，如果下面没有块级元素则两个div元素会并排显示
        .avatar
            display: inline-block
            vertical-align: top
            img 
              border-radius: 2px
        .content
            display: inline-block
            font-size: 14px
            margin-left: 16px
            .title
                margin: 2px 0 8px 0
                .brand
                    display: inline-block
                    width: 30px
                    height: 18px
                    background-image: url("brand@2x.png")
                    background-size: 30px 18px
                    background-repeat: no-repeat
                    vertical-align: top
                .name
                    margin-left: 6px
                    font-size: 16px
                    font-weight: bold    
                    line-height: 18px
            .description
                font-size: 12px
                font-weight: 200
                line-height: 12px
                margin-bottom: 10px
            .supports
                .icon
                    display: inline-block
                    width: 12px
                    height: 12px
                    margin-right: 2px
                    background-size: 12px 12px
                    background-repeat: no-repeat
                    
                    // & 可以理解为代替了上一层的选择器
                    &.decrease
                      background-image: url("decrease_1@2x.png")
                    &.discount
                      background-image: url("discount_1@2x.png")
                    &.guarantee
                      background-image: url("guarantee_1@2x.png")
                    &.invoice
                      background-image: url("invoice_1@2x.png")
                    &.special
                      background-image: url("special_1@2x.png")
                .text
                    font-size: 10px
                    font-weight: 200
                    line-height: 12px
                    vertical-align: top
        .support-count
            
            font-weight: 200
            line-height: 12px
            height: 12px
            position: absolute
            right: 12px
            bottom: 18px
            padding: 8px 7px
            border-radius: 14px
            background: rgba(0,0,0,0.2)
            text-align: center
            .count
              margin-left: 2px
              vertical-align: top
              font-size: 10px
            .icon-keyboard_arrow_right
              margin-left: 2px
              font-size: 10px

              
   
        
                    
      
                    

</style>
