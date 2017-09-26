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
          <div class="support-count" v-if="seller.supports" @click="showDetail">
              <span class="count">{{seller.supports.length}}个</span>
              <i class="icon-keyboard_arrow_right"></i>
          </div>
      </div>
      <div class="bulletin-wrapper" @click="showDetail">
        <span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
      <!-- 背景 -->
      <div class="background">
        <img :src="seller.avatar" width="100%" height="100%">
      </div>
      <!-- 详情弹层页 -->
      <div class="detail" v-show="detailShow">
        
      </div>

  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'header',
  data() {
    return {
      classMap: ["decrease","discount","special","invoice","guarantee"],
      detailShow: false
    }
  },
  props: {
    seller:{
        type: Object

    }
  },
  methods: {
    showDetail: function(){
      this.detailShow = true;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus">
.header
    color: white
    // background: grey
    // 还是要有一个背景色
    background-color: rgba(7,17,27,0.5)
    position: relative
    .content-wrapper
        padding: 24px 12px 18px 24px
        position: relative
        // 两个span在一起有留白，要取消掉要设置font-size为0
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
    .bulletin-wrapper
      height: 28px
      line-height: 28px
      padding: 0 22px 0 12px
      position: relative
      background-color: rgba(7,17,27,0.2)
      // 多余的文字显示...的三个css声明
      white-space: nowrap
      overflow: hidden
      text-overflow: ellipsis
      // font-size: 0
      .bulletin-title
        display: inline-block
        width: 22px
        height: 12px
        background-image: url("bulletin@2x.png")
        background-size: 22px 12px
        background-repeat: no-repeat
      .bulletin-text
        font-size: 10px
        font-weight: 200
        margin: 0 4px
        vertical-align: top
      .icon-keyboard_arrow_right
        position: absolute
        right: 12px
        top: 8px
        font-size: 10px
    .background
      position: absolute
      top: 0
      left: 0
      width: 100%
      height: 100%
      z-index: -1
      // 给背景图添加滤镜
      filter: blur(10px)
      // 将blur效果溢出的部分隐藏
      overflow: hidden
    .detail
      position: fixed
      top: 0
      left: 0
      // z-index只能在定位元素上奏效
      z-index: 100
      width: 100%
      height: 100%
      overflow: auto
      background: rgba(7,17,28,0.8)
      
      

              
   
        
                    
      
                    

</style>
