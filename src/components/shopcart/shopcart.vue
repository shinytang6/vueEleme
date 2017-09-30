<template>
<div class="shopcart">
    <div class="content">
        <div class="content-left">
            <div class="logo-wrapper">
                <div class="logo">
                    <span class="icon-shopping_cart"></span>
                </div>
            </div>
            <div class="price">￥0</div>
            <div class="delivery">另配送费￥4元</div>
        </div>
        <div class="content-right"></div>
    </div>
</div>

</template>

<script type="text/ecmascript-6">
export default {
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus">
.shopcart
    position: fixed
    bottom: 0
    left: 0
    width: 100%
    height: 48px
    .content
        display: flex
        background: #141d27
        .content-left
            flex: 1
            .logo-wrapper
                display: inline-block
                position: relative
                top: -10px
                margin: 0 12px
                padding: 6px
                width: 56px
                height: 56px
                box-sizing: border-box
                border-radius: 50%
                background: #141d27
                .logo
                    width: 100%
                    height: 100%
                    border-radius: 50%
                    background: #2b343c   
                    text-align: center
                    .icon-shopping_cart
                        color: #80858a     
                        font-size: 24px      
                        line-height: 44px
            .price
                display: inline-block
                vertical-align: top
                margin-top: 12px
                font-size: 16px
                color: rgba(255,255,255,0.4)
                font-weight: 700
                line-height: 24px
                padding-right: 12px
                border-right: 1px solid rgba(255,255,255,0.1)
            .delivery
                display: inline-block
                margin: 18px 0 0 12px
                color: rgba(255,255,255,0.4)
                font-size: 10px
                vertical-align: top
                
        .content-right
            flex: 0 0 105px
            width: 105px 
</style>
