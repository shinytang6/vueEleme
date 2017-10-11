<template>
<div class="header">
    <div class="main-wrapper">
        <div class="avatar">
            <img :src="seller.avatar" width="64" height="64">
        </div>
        <div class="main-content">
            <div class="title-wrapper">
                <span class="title-icon"></span>
                <span class="title">{{seller.name}}</span>
            </div>
            <div class="description-wrapper">
                <p class="description">{{seller.description}}/{{seller.deliveryTime}}分钟送达</p>
            </div>
            <div class="support-wrapper">
                <span class="support-icon"></span>
                <span class="support" v-if="seller.supports">{{seller.supports[0].description}}</span>
            </div>
        </div>
    </div>
    <div class="bulletin">
  
    </div>
</div>
</template>

<script>
export default {
  name: 'header',
  data() {
    return{
        seller: {}
    }
  },
  created: function() {
    // 必须！还是坑了我一把
    // vue-resource竟然不用这么写？
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
.header
    width: 100%
    background: rgba(7,17,27,0.5)
    font-size: 0
    .main-wrapper
        width: 100%
        padding: 24px 12px 18px 24px
        .avatar
            width: 64px
            height: 64px
            display: inline-block
            vertical-align: top
            img
                border-radius: 2px
        .main-content
            display: inline-block
            margin-left: 16px
            font-size: 12px
            .title-wrapper
                margin-top: 2px
                .title-icon
                    background-image: url("brand@2x.png")
                    background-size: 26px 18px
                    background-repeat: no-repeat
                    display: inline-block
                    height: 18px
                    width: 26px
                .title
                    font-size: 16px
                    font-weight: bold
                    color: rgb(255,255,255)
            .description-wrapper
                margin-top: 8px
                font-size: 12px
                color: rgb(255,255,255)
                font-weight: 200
            .support-wrapper
                margin-top: 10px
                font-size: 10px
                color: rgb(255,255,255)
                font-weight: 200
</style>
