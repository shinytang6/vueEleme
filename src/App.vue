<template>
  <div id="app">
    <vHeader :seller="seller"></vHeader>
    <div class="tab border-1px">
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

const ERR_OK = 0;

export default {
  name: 'app',
  data() {
    return {
      seller: {
      }
    }
  },
  created(){
    this.$http.get('/api/seller').then(response => {
      // get body data
      response = response.body;
      if (response.errno == ERR_OK){
          this.seller = response.data
          console.log(this.seller)
      }

    }, response => {
      // error callback
    });
  },
  components: {
    // 直接用header会与默认header标签名字冲突
    vHeader: header
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import "./common/stylus/index"
    #app
      .tab
        display: flex
        width: 100%
        height: 40px
        line-height: 40px
        // border-bottom: 1px solid rgba(7,17,27,0.1)
        border-1px(rgba(7,17,27,0.1))
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
