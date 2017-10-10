<template>
<div class="header">
    <div class="main-wrapper">
        <div class="avatar">
            <img src="">
        </div>
        <div class="main-content">
            <div class="title-wrapper">
                <span class="title-icon"></span>
                <span class="title">{{seller.name}}</span>
            </div>
            <div class="description-wrapper">
                <p class="description"></p>
            </div>
            <div class="support-wrapper">
                <span class="support-icon"></span>
                <span class="support"></span>
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
    var that = this
    this.$axios.get('/api/seller')
      .then(function (response) {
        // console.log(that.seller)
        that.seller = response.data.data
        console.log(that.seller)
      })
      .catch(function (error) {
        console.log(error);
      });
      // this.$nextTick(function(){
      //       console.log(this.seller)
      //   })
  }
}
</script>

<style>

</style>
