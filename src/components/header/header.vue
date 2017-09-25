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
              <!-- 因为seller是异步传过来的，所以其初始值为空，所以要检查一下有没有异步获取到seller.supports再进行下一步操作 -->
              <div class="supports" v-if="seller.supports">
                  <span class="icon"></span>
                  <span class="text">{{seller.supports[0].description}}</span>
              </div>
          </div>
      </div>
      <div class="bulletin-wrapper"></div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'header',
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
    background: black
    .content-wrapper
        padding: 24px 12px 18px 24px
        // 设置为inline不会发生变化 ，因为设置为内联元素下面不能包含块级元素，而这边的div.content 内包含了块级元素，所以不变化，如果下面没有块级元素则两个div元素会并排显示
        .avatar
            display: inline-block
        .content
            display: inline-block
        

</style>
