<template>
  <div id="app">
    <vHeader></vHeader>
    <div class="tab">
      <div class="tab-item">
          <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
          <router-link to="/ratings">评论</router-link>
      </div>
      <div class="tab-item">
          <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
import header from "./components/header/header"
export default {
  name: 'app',
  components: {
    // 直接用header会与默认header标签名字冲突
    vHeader: header
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
    #app
      .tab
        display: flex
        width: 100%
        height: 40px
        line-height: 40px
        border-bottom: 1px solid rgba(7,17,27,0.1)
        .tab-item
          // border: 1px black solid
          flex: 1
          text-align: center
          a
            display: block
            font-size: 14px
            color: rgb(77,85,93)
          a.active
            color: rgb(240,20,20)



</style>
