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
            <div class="support-wrapper" v-if="seller.supports">
                <span class="support-icon" :class="classMap[seller.supports[0].type]"></span>
                <span class="support">{{seller.supports[0].description}}</span>
            </div>
        </div>
    </div>
    <div class="bulletin-wrapper" @click="toggleDetail">
        <span class="bulletin-icon"></span>
        <span class="bulletin">{{seller.bulletin}}</span>
    </div>
    <div class="background-wrapper">
        <img src="background" :src="seller.avatar" width="100%" height="100%">
    </div>
    <div class="supports" v-if="seller.supports" @click="toggleDetail">
        <span class="supports-content">{{supportsLength}}个</span>
        <i class="icon-keyboard_arrow_right"></i>
    </div>
    <transition name="fade">
    <div class="detail" v-show="detailShow">
        <div class="name-wrapper">
            <h2 class="name">{{seller.name}}</h2>
        </div>
        <div class="star-wrapper">
            <Star :score="seller.score" :size="24"></Star>
        </div>
        <div class="supports-title">
            <span class="line"></span>
            <span class="title">优惠信息</span>
            <span class="line"></span>
        </div>
        <div class="supports-content">
            <ul>
                <li v-for="support in seller.supports" class="support-item">
                    <span class="icon" :class="classMap[support.type]"></span>
                    <span class="content">{{support.description}}</span>
                </li>
            </ul>
        </div>
        <div class="bulletin-title">
            <span class="line"></span>
            <span class="title">商家公告</span>
            <span class="line"></span>
        </div>
        <div class="bulletin-content">
            <p>{{seller.bulletin}}</p>
        </div>
        <div class="close" @click="toggleDetail">
            <i class="icon-close"></i>
        </div>
    </div>
    </transition>
</div>
</template>

<script>
import Star from "../star/star"
export default {
  name: 'header',
  data() {
    return{
        classMap: ["decrease","discount","special","invoice","guarantee"],
        detailShow: false
    }
  },
  props:{
    seller: {
        type: Object
    }
  },
  computed: {
    supportsLength: function(){
        return this.seller.supports.length
    }
  },
  components:{
     Star
  },
  methods: {
    toggleDetail: function(){
        this.detailShow = !this.detailShow
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.header
    background: rgba(7,17,27,0.5)
    position: relative
    font-size: 0
    .main-wrapper
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
                    // 一定要设置display: inline-block才有效
                    background-image: url("brand@2x.png")
                    background-size: 26px 18px
                    background-repeat: no-repeat
                    display: inline-block
                    height: 18px
                    width: 26px
                    vertical-align: bottom
                .title
                    font-size: 16px
                    font-weight: bold
                    color: rgb(255,255,255)
            .description-wrapper
                margin-top: 8px
                .description
                    font-size: 12px
                    color: rgb(255,255,255)
                    font-weight: 200
            .support-wrapper
                margin-top: 8px
                .support-icon
                    display: inline-block
                    width: 15px
                    height: 15px
                    background-size: 15px 15px
                    background-repeat: no-repeat
                    vertical-align: top
                    &.decrease
                        background-image: url("decrease_1@2x.png")
                    &.discount
                        background-image: url("discount_1@2x.png")
                    &.special
                        background-image: url("special_1@2x.png")
                    &.invoice
                        background-image: url("invoice_1@2x.png")
                    &.guarantee
                        background-image: url("guarantee_1@2x.png")
                .support
                    font-size: 10px
                    color: rgb(255,255,255)
                    font-weight: 200
                    display: inline-block
                    margin-top: 2px
    .bulletin-wrapper
        background-color: rgba(7,17,27,0.1)
        .bulletin-icon
            display: inline-block
            width: 22px
            height: 14px
            margin-left: 12px
            background-size: 22px 14px
            background-repeat: no-repeat
            background-image: url("bulletin@2x.png")
            margin-bottom: 8px
        .bulletin
            font-size: 10px
            color: rgb(255,255,255)
            line-height: 30px
            margin-left: 4px
            display: inline-block
            // CSS实现单行、多行文本溢出显示省略号（…）
            width: 330px
            overflow: hidden
            white-space: nowrap
            text-overflow: ellipsis
    .background-wrapper
        width: 100%
        height: 100%
        position: absolute    
        top: 0   
        z-index: -1
        filter: blur(10px)
        overflow: hidden
    .supports
        position: absolute
        right: 20px
        bottom: 40px
        padding: 7px 10px
        border-radius: 14px
        font-size: 12px
        font-weight: 200
        color: rgb(255,255,255)
        background-color: rgba(0,0,0,0.2)
        .icon-keyboard_arrow_right
            display: inline-block
            margin-left: -4px
    .detail
        position: fixed
        top: 0
        z-index: 100
        height: 100%
        width: 100%
        background-color: rgba(7,17,27,0.8)
        .name-wrapper
            margin-top: 64px
            text-align: center
            .name
                font-size: 16px
                font-weight: 700
                color: rgb(255,255,255)
        .star-wrapper
            margin-left: -6px
        .supports-title
            font-size: 12px
            margin: 0 20px
            .line
                border-bottom: 1px solid rgba(255,255,255,0.2)
                display: inline-block
                width: 116px
                vertical-align: middle
            .title
                margin: 0 12px
                font-size: 14px
                font-weight: 700
                color: rgb(255,255,255)
        .supports-content
            margin-top: 24px
            margin-left: 36px
            .support-item
                margin-top: 12px
                .icon
                    display: inline-block
                    width: 15px
                    height: 15px
                    background-size: 15px 15px
                    background-repeat: no-repeat
                    vertical-align: top
                    &.decrease
                        background-image: url("decrease_1@2x.png")
                    &.discount
                        background-image: url("discount_1@2x.png")
                    &.special
                        background-image: url("special_1@2x.png")
                    &.invoice
                        background-image: url("invoice_1@2x.png")
                    &.guarantee
                        background-image: url("guarantee_1@2x.png")
                .content
                    display: inline-block
                    margin-top: 2px
                    margin-left: 6px
                    font-size: 12px
                    font-weight: 200
                    color: rgb(255,255,255)
        .bulletin-title
            font-size: 12px
            margin: 28px 20px 0 20px
            .line
                border-bottom: 1px solid rgba(255,255,255,0.2)
                display: inline-block
                width: 116px
                vertical-align: middle
            .title
                margin: 0 12px
                font-size: 14px
                font-weight: 700
                color: rgb(255,255,255)
        .bulletin-content
            font-size: 12px
            color: rgb(255,255,255)
            width: 80%
            margin: 24px auto
            line-height: 24px
        .close
            font-size: 32px
            width: 32px
            height: 32px
            margin: 100px auto
            color: rgba(255,255,255,0.5)
        
        &.fade-enter-active, &.fade-leave-active {
              transition: opacity 1s
            }
        &.fade-enter, &.fade-leave-to  {
              opacity: 0
            }
    
            
                     
</style>
