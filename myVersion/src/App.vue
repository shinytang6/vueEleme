<template>
  <div id="app">
    <vHeader :seller="seller"></vHeader>
    <div class="tab">
        <div class="tab-item">
            <router-link to="/goods">商品</router-link>
        </div>
        <div class="tab-item">
            <router-link to="/ratings">评价</router-link>
        </div>
        <div class="tab-item">
            <router-link to="/seller">商家</router-link>
        </div>
    </div>
    <router-view :seller="seller"></router-view>
  </div>
</template>

<script>
import vHeader from "./components/header/header"
export default {
  name: 'app',
  components: {
    vHeader
  },
  data(){
    return {
        seller: {}
    }
  },
  created: function() {
    // 必须！还是坑了我一把,vue-resource竟然不用这么写？
    var that = this
    this.$axios.get('/api/seller')
      .then(function (response) {
        let responseData = response.data
        if(responseData.errno == 0){
            that.seller = responseData.data
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "./common/stylus/icon"
.tab
    display: flex
    border-bottom: 1px solid rgba(7,17,27,0.1)
    .tab-item
        flex: 1
        font-size: 14px
        line-height: 40px
        text-align: center
        a
            display: block
            font-size: 14px
            color: rgb(77,85,93)
        // 这个active属性在路由文件index.js中自己设置，否则默认值为: "router-link-active"
        // Vue提供了这个接口很方便，自己写还要定义数组，方法，略麻烦...
        a.active
            color: rgb(240,20,20)
         
</style>
