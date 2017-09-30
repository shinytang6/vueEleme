<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
        <ul>
            <li v-for="(item,index) in goods" class="menu-item" :class="{focusMenu: menuIndex === index}" @click="selectMenu(index)">
                <span class="text">
                    <span class="icon" v-if="item.type>0" :class="classMap[item.type]"></span>{{item.name}}
                </span>
            </li>
        </ul>
    </div>
    <div class="foods-wrapper" ref="foodsWrapper">
        <ul>
            <li v-for="item in goods" class="food-list food-list-hook">
                <h1 class="title">{{item.name}}</h1>
                <ul>
                    <li v-for="food in item.foods" class="food-item">
                        <div class="icon">
                            <img :src="food.icon" width="57" height="57">
                        </div>
                        <div class="content">
                            <h2 class="name">{{food.name}}</h2>
                            <p class="description">{{food.description}}</p>
                            <div class="extra"> 
                                <span class="">月售{{food.sellCount}}</span>
                                <span>好评率{{food.rating}}%</span>
                            </div>
                            <div class="price">
                                <span class="newPrice">￥{{food.price}}</span>
                                <span v-if="food.oldPrice" class="oldPrice">￥{{food.oldPrice}}</span>
                            </div>
                        </div>
                    </li>
                </ul>
            </li>
        </ul>
    </div>
    <div class="shopcart">
        <Shopcart></Shopcart>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import BScroll from "better-scroll";
import Shopcart from "../shopcart/shopcart";
const ERR_OK = 0;
export default {
    props: {
        seller: {
            type: Object
        }
    },
    components: {
        Shopcart
    },
    data() {
        return {
            goods: [],
            classMap: ["decrease","discount","special","invoice","guarantee"],
            heightList: [],
            scrollY: 0
        }
    },
    computed: {
        menuIndex: function(){
            for (let j = 0; j < this.heightList.length; j++){
                if(this.scrollY >= this.heightList[j] && this.scrollY < this.heightList[j+1] )
                    return j
            }
            return 0
        }
    },
    created() {
        this.$http.get('/api/goods').then(response => {
          // get body data
          response = response.body;
          if (response.errno == ERR_OK){
              this.goods = response.data
              // 将回调延迟到下次 DOM 更新循环之后执行。在修改数据之后立即使用它，然后等待 DOM 更新。它跟全局方法 Vue.nextTick 一样，不同的是回调的 this 自动绑定到调用它的实例上。
              this.$nextTick(function(){
                this.initScroll()
                this.calHeight()
              })
              
          }

        }, response => {
          // error callback
        });
    },
    methods: {
        initScroll: function(){
            this.menuScroll = new BScroll(this.$refs.menuWrapper,{
                click: true
            })
            this.foodsScroll = new BScroll(this.$refs.foodsWrapper,{
                probeType: 3
            })

            this.foodsScroll.on("scroll", (pos) => {
                this.scrollY = Math.abs(Math.round(pos.y))
                // console.log(this.scrollY)
            })
        },
        calHeight: function(){
            let height = 0;
            this.heightList.push(height)
            let foodsList = this.$refs.foodsWrapper.getElementsByClassName("food-list-hook")
            for(let i=0; i<foodsList.length;i++){
                height = height + foodsList[i].clientHeight
                this.heightList.push(height)
            }
        },
        selectMenu: function(index) {
            // this.scrollY = this.heightList[index]
            let foodsList = this.$refs.foodsWrapper.getElementsByClassName("food-list-hook")
            let el = foodsList[index]
            this.foodsScroll.scrollToElement(el,300)
        }
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
        overflow: hidden
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
        .focusMenu
            background: white
            font-weight: 700
                
    .foods-wrapper
        flex: 1
        overflow: hidden
        .title
            font-size: 12px
            padding-left: 14px
            line-height: 26px
            color: rgb(147,153,159)
            background: #f3f5f7
            border-left: 2px solid #d9dde1
        .food-item
            display: flex
            margin: 18px
            padding-bottom: 18px
            border-bottom: 1px solid rgba(7,17,27,0.1)
            &:last-child
                border-bottom: 0
                margin-bottom: 0
            .icon
                flex: 0 0 57px
                margin-right: 10px
            .content
                flex: 1
                .name
                    line-height: 14px
                    margin: 2px 0 8px 0
                    font-size: 14px
                    color: rgb(7,17,27)
                .description
                    margin-bottom: 8px
                    line-height: 16px
                    font-size: 10px
                    color: rgb(147,153,159)
                .extra
                    margin-bottom: 8px
                    line-height: 10px
                    font-size: 10px
                    color: rgb(147,153,159)
                .price
                    font-size: 0
                    line-height: 24px
                    .newPrice
                        font-size: 14px
                        padding-right: 8px
                        color: rgb(240,20,20)
                    .oldPrice
                        font-size: 10px
                        text-decoration: line-through
                        color: rgb(147,153,159)
            
            
</style>
