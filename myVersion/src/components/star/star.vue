<template>
 <div class="star-wrapper">
     <span v-for="star in starMap" :class="star" class="star-item"></span>
 </div>
</template>

<script>
export default {
  name: 'star',
  props:{
    size: {
        type: Number
    },
    score: {
        type: Number
    }
  },
  computed: {
    starMap: function(){
        let arr = []
        let onStarNum = Math.floor(this.score)
        for (let i =0;i<onStarNum;i++){
            arr.push("star"+ this.size +"_on")
        }
        let decimal = this.score - onStarNum
        if(decimal>=0.5)
            arr.push("star"+ this.size +"_half")
        while(arr.length<5){
            arr.push("star"+ this.size +"_off")
        }
        return arr
    }
  }

  
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.star-wrapper
    margin-top: 16px
    margin-bottom: 28px
    text-align: center
    .star-item
        margin-left: 10px
        &.star24_on
            background-image: url("star24_on@2x.png")
            background-size: 24px 24px
            display: inline-block
            width: 24px
            height: 24px
        &.star24_half
            background-image: url("star24_half@2x.png")
            background-size: 24px 24px
            display: inline-block
            width: 24px
            height: 24px
        &.star24_off
            background-image: url("star24_off@2x.png")
            background-size: 24px 24px
            display: inline-block
            width: 24px
            height: 24px
            
        &.star36_on
            background-image: url("star36_on@2x.png")
            background-size: 36px 36px
            display: inline-block
            width: 36px
            height: 36px
        &.star36_half
            background-image: url("star36_half@2x.png")
            background-size: 36px 36px
            display: inline-block
            width: 36px
            height: 36px
        &.star36_off
            background-image: url("star36_off@2x.png")
            background-size: 36px 36px
            display: inline-block
            width: 36px
            height: 36px
            
        &.star48_on
            background-image: url("star48_on@2x.png")
            background-size: 48px 48px
            display: inline-block
            width: 48px
            height: 48px
        &.star48_half
            background-image: url("star48_half@2x.png")
            background-size: 48px 48px
            display: inline-block
            width: 48px
            height: 48px
        &.star48_off
            background-image: url("star48_off@2x.png")
            background-size: 48px 48px
            display: inline-block
            width: 48px
            height: 48px
    
    
</style>
