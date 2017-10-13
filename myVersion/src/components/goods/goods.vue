<template>
  <div class="goods">
      <div class="menu-wrapper" ref="menu">
          <ul>
              <li v-for="(item,index) in goods" class="menu-item" @click="rollHeight(index)" :class="{selected: index==isSelected}" >
                <!-- 这里一定要把图片和文字包在一个span或div里，文字才会环绕图片，否则想我刚开始两个span连在一起，文字不会环绕图片，还会有各种bug -->
                <div class="text">
                  <span class="icon" v-if="item.type > 0" :class="classMap[item.type]"></span>{{item.name}}
                </div>
              </li>
          </ul>
      </div>
      <div class="content-wrapper" ref="content">
          <ul>
              <li v-for="item in goods" class="content-item"> 
                  <h2 class="type">{{item.name}}</h2>
                  <div class="food">
                      <ul>
                          <li v-for="food in item.foods" class="food">
                                <div class="avatar"><img :src="food.icon" width="52" height="52"></div>
                                <div class="content">
                                    <div class="name">{{food.name}}</div>
                                    <div class="description">{{food.description}}</div>
                                    <div class="status">
                                        <span class="count">月售{{food.sellCount}}份</span>
                                        <span class="review">好评率{{food.rating}}%</span>
                                    </div>
                                    <div class="price">
                                        <span class="newPrice">￥{{food.price}}</span>
                                        <span v-if="food.oldPrice" class="oldPrice">￥{{food.oldPrice}}</span>
                                    </div>
                                </div>
                                <CartControl :price="food.price" :foodList="foodList"></CartControl>
                          </li>
                      </ul>
                  </div>
              </li>
          </ul>
      </div>
      <div class="shopcart-wrapper">
          <ShopCart :seller="seller" :foodList="foodList"></ShopCart>
      </div>
  </div>
</template>

<script>
import BScroll from "better-scroll"
import CartControl from "../cartcontrol/cartcontrol"
import ShopCart from "../shopcart/shopcart"
export default {
    name: "goods",
    props: {
        seller: {
            type: Object
        }
    },
    components: {
        CartControl,
        ShopCart,
        BScroll
    },
    data() {
        return {
            goods: [],
            classMap: ["decrease","discount","special","invoice","guarantee"],
            heightArr: [],
            isSelected: 0
        }
    },
    computed: {
        foodList: function() {
            let arr = []
            this.goods.forEach(function(item){
                item.foods.forEach(function(good){
                    let isExit = false
                    for (let i=0;i<arr.length;i++){
                        if(arr[i].sale==good.price){
                            isExit = true
                            break
                        }
                    }
                    if(!isExit) {
                        arr.push({
                            count: 0,
                            sale: good.price
                        })
                    }

                })
            })
            console.log(arr)
            return arr
        }
    },
    created: function() {
        // 必须！还是坑了我一把,vue-resource竟然不用这么写？
        var that = this
        this.$axios.get('/api/goods')
          .then(function (response) {
            let responseData = response.data
            if(responseData.errno == 0){
                that.goods = responseData.data
                // 一定要写在这里，不能写在下面，不知道为什么
                that.$nextTick(function(){
                    that.initScroll()
                    that.calHeight()
                })
            }
          })
          .catch(function (error) {
            console.log(error);
          });

        // this.$nextTick(function(){
        //    that.initScroll()
        // })
    },
    methods: {
        initScroll: function() {
            let menu = this.$refs.menu
            // console.log(menu)
            let content = this.$refs.content
            this.menuScroll = new BScroll(menu,{
                click: true,
                probeType: 3
            })
            this.contentScroll = new BScroll(content,{
                click: true,
                probeType: 3
            })
            // 可以实时检测滚动到的位置
            this.contentScroll.on('scroll', (pos) => {
                let scrollY = Math.abs(pos.y)
                for(let j=0;j<this.heightArr.length;j++){
                    if(scrollY>=this.heightArr[j] && scrollY<this.heightArr[j+1]){
                        this.isSelected = j
                    }
                }
            })
        },
        calHeight: function() {
            let height = 0
            this.heightArr.push(height)
            var item = document.getElementsByClassName("content-item")
            // 可以看到所有节点默认带有的属性
            // console.log(item)
            for(let i=0;i<item.length;i++){
                height = height + item[i].scrollHeight
                this.heightArr.push(height)
            }

            // console.log(this.heightArr)
        },
        rollHeight: function(index) {
            let heightRollTo = this.heightArr[index]
            this.contentScroll.scrollTo(0, -heightRollTo, 1000)
        }
    }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.goods
    display: flex
    margin-bottom: 52px
    .menu-wrapper
        flex: 0 0 21%
        height: 444px
        overflow: hidden
        .menu-item
            line-height: 14px
            font-size: 12px
            background-color: #f3f5f7
            height: 54px
            width: 100%
            // border: 1px red solid
            color: rgb(0,0,0)   
            text-align: center
            // 玄学，明天再研究
            display: table
            border-bottom: 1px rgba(7,17,27,0.1) solid
            // 最后一个元素无下边框
            &:last-child
                border: 0
            .text
                // 玄学代码
                display: table-cell
                // ！！！
                vertical-align: middle
                padding: 0 10px
                .icon
                    display: inline-block
                    width: 12px
                    height: 12px
                    background-size: 12px 12px
                    background-repeat: no-repeat
                    vertical-align: top
                    margin-right: 4px
                    &.decrease
                        background-image: url("decrease_3@2x.png")
                    &.discount
                        background-image: url("discount_3@2x.png")
                    &.special
                        background-image: url("special_3@2x.png")
                    &.invoice
                        background-image: url("invoice_3@2x.png")
                    &.guarantee
                        background-image: url("guarantee_3@2x.png")
            &.selected
                background-color: white
    .content-wrapper
        flex: 1
        font-size: 0
        height: 444px
        overflow: hidden
        .type
            font-size: 12px
            color: rgb(147,153,159)
            line-height: 26px
            height: 26px
            background-color: #f3f5f7
            padding-left: 14px
            border-left: 2px solid #d9dde1
        .food
            margin: 18px 0px 18px 8px
            position: relative
            .avatar
                display: inline-block
                margin-right: 10px
                vertical-align: top
            .content
                display: inline-block
                width: 70%
                .name
                    font-size: 14px
                    color: rgb(7,17,27)
                    line-height: 20px
                .description
                    font-size: 10px
                    color: rgb(147,153,159)
                    line-height: 16px
                .status
                    font-size: 10px
                    color: rgb(147,153,159)
                    line-height: 16px
                .price
                    margin-top: 6px
                    .newPrice
                        font-size: 14px
                        color: red
                        font-weight: 200
                    .oldPrice
                        font-size: 10px
                        text-decoration: line-through
                        color: rgb(147,153,159)
                        font-weight: 200
                        margin-left: 8px
    .shopcart-wrapper
        position: fixed
        bottom: 0
        left: 0
        width: 100%
</style>
