<template>
<div class="cartcontrol">
    <transition name="slide-fade">
    <span class="minus" v-show="minusShow" @click="minusCount">
       <i class="icon-remove_circle_outline"></i>
    </span>
    </transition>
    <span class="count" v-show="count>0">
        {{count}}
    </span>
    <transition name="slide-fade">
    <span class="add" @click="addCount">
        <i class="icon-add_circle"></i>
    </span>
    </transition>
</div>
</template>

<script>
export default {
    name: "cartcontrol",
    data() {
        return {
            minusShow: false,
            count: 0
        }
    },
    methods: {
        addCount: function() {
            this.count++
            this.minusShow = true
        },
        minusCount: function() {
            this.count-- 
            if(this.count <= 0){
                this.minusShow = false
            }
        }
    }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.cartcontrol
    position: absolute
    right: 12px
    bottom: 2px
    line-height: 18px
    .minus,.add
        font-size: 24px
        border-radius: 50%
        color: rgb(0,160,220)
        vertical-align: middle
        width: 50px
    .count
        text-align: center
        font-size: 12px
        color: rgb(147,153,159)
        height: 20px
        line-height: 10px
        // 调整数字位置，使其居中
        position: relative
        top: 4px
        transform: translateX(-20px)
    .minus
        &.slide-fade-enter-to
            transition: all 1s
        &.slide-fade-leave
            transition: all 1s
        &.slide-fade-enter, &.slide-fade-leave-to
            // transform: translateX(10px)
            opacity: 0
    .add
        &.slide-fade-enter-to
            transition: all 1s
        &.slide-fade-leave
            transition: all 1s
        &.slide-fade-enter, &.slide-fade-leave-to
            // transform: translateX(10px)
            opacity: 0
        
         
</style>
