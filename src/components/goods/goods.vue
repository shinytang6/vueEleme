<template>
  <div class="goods">
    <div class="menu-wrapper">
        <ul>
            <li v-for="item in goods" class="menu-item">
            <span class="text">
                <span class="icon" v-if="item.type>0" :class="classMap[item.type]"></span>
               <!--  <span class="text"> -->
                   {{item.name}}
                </span>
            </li>
        </ul>
    </div>
    <div class="foods-wrapper"></div>
  </div>
</template>

<script type="text/ecmascript-6">
const ERR_OK = 0;
export default {
    props: {
        seller: {
            type: Object
        }
    },
    data() {
        return {
            goods: [],
            classMap: ["decrease","discount","special","invoice","guarantee"]
        }
    },
    created() {
        this.$http.get('/api/goods').then(response => {
          // get body data
          response = response.body;
          if (response.errno == ERR_OK){
              this.goods = response.data
              console.log(this.goods)
          }

        }, response => {
          // error callback
        });
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus">
.goods
    position: absolute
    top: 174px
    bottom: 46px
    display: flex
    .menu-wrapper
        flex: 0 0 80px
        background: #f3f5f7
        .menu-item
            display: table
            height: 54px
            width: 56px
            line-height: 14px 
            padding-left: 12px
            border-bottom: 1px solid rgba(7,17,27,0.1)
            .text
                display: table-cell
                vertical-align: middle
                font-size: 12px
                .icon
                    display: inline-block
                    width: 12px
                    height: 12px
                    margin-top: 2px
                    background-size: 12px 12px
                    background-repeat: no-repeat
                    &.decrease
                      background-image: url("decrease_3@2x.png")
                    &.discount
                      background-image: url("discount_3@2x.png")
                    &.guarantee
                      background-image: url("guarantee_3@2x.png")
                    &.invoice
                      background-image: url("invoice_3@2x.png")
                    &.special
                      background-image: url("special_3@2x.png")
            
                
    .foods-wrapper
        flex: 1
</style>
