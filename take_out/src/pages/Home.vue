<template>
  <div id="box">
    <div id="top_box">
      <div class="title">
        <van-image
          class="sope_img"
          width="6rem"
          height="6rem"
          fit="contain"
          :src="shopsdata.avatar"
          @click="bigshow = !bigshow"
        />
        <div>
          <h5>
            <van-button type="danger" size="mini">品牌</van-button>
            {{ shopsdata.name }}
          </h5>
          <p>{{ shopsdata.description }} / {{ shopsdata.deliveryTime }}分钟到达</p>
          <div class="van-ellipsis">
            <van-button size="mini" plain hairline type="info">减</van-button>
            {{ supports }}
          </div>
        </div>
      </div>
      <van-notice-bar background="#fff" left-icon="volume-o" :text=" textTop " />
    </div>
    <!-- 切屏 -->
    <div id="bootm_box">
      <!-- 主体 -->
      <van-tabs v-model="active" swipeable color="#06c1ae" title-active-color="#06c1ae">
        <van-tab title="商品" to="/home/eval"></van-tab>
        <van-tab title="评价" to="/home/goods"></van-tab>
        <van-tab title="商家" to="/home/shops"></van-tab>
      </van-tabs>
    </div>

    <div class="mian_div">
      <router-view></router-view>
    </div>

    <!-- 底部弹出 -->
    <transition name="fade">
      <div v-show="isshow">
        <shopcar></shopcar>
      </div>
    </transition>
    <!-- 底部购物车 -->
    <div class="shopcar" @click="isshow = !isshow">
      <div class="lef_div">
        <van-icon name="smile-o" />
        <p>联系商家</p>
      </div>
      <div class="rig_div">
        <div class="one">
          <van-icon name="shopping-cart" size="36" :color=" alltotal > 0 ? '#f6c761' : '#bfbfbf'" :badge="allnum" />
        </div>
        <div class="two">
          <p>￥{{ alltotal }}</p>
          <span>另需配送费4元 | 支持自取</span>
        </div>
        <div class="three">
          <p>20元起送</p>
        </div>
      </div>
    </div>

    <!-- 商铺详情弹出 -->
    <van-overlay :show="bigshow" @click="bigshow = false">
      <div class="wrapper">
        <div class="big_div">
          <div class="top_div">
            <h2>{{ shopsdata.name }}</h2>
            <van-rate
              v-model="value"
              allow-half
              void-icon="star"
              void-color="#eee"
              color="#ffd21e"
              size="26"
            />
            <van-divider>优惠信息</van-divider>
          </div>
          <div class="center_div">
            <p>
              <van-button plain type="info" size="mini">减</van-button>
              {{ supports }}
            </p>

            <van-divider>商家公告</van-divider>
            <p>{{ shopsdata.bulletin }}</p>
          </div>
        </div>

        <!-- 分割线 -->

        <div class="block" />
      </div>
    </van-overlay>
  </div>
</template>

<script>
import { seller } from "@/api/apis";
import shopcar from "./Shopcar";
export default {
  data() {
    return {
      isshow: false,
      bigshow: false,
      active: 1,
      shopsdata: {},
      textTop:
        "1.2米（不含）以下儿童需到店支付150元/位，2岁以下儿童免费，1.2米（含）以上儿童按成人标准收费",
      value: 5,
      phoneUrl: "",
      supports: "",
    };
  },
  created() {
    let name = this.$route.path;
    switch (name) {
      case "/home/eval":
        this.active = 0;
        break;
      case "/home/goods":
        this.active = 1;
        break;
      case "/home/shops":
        this.active = 2;
        break;
    }
    seller().then((res) => {
      this.shopsdata = res.data.data;
      this.shopsdata.supports.forEach((element) => {
        this.supports += element;
      });
      // 使用移动端服务器时开起
      this.shopsdata.avatar =
        "http://192.168.1.4:5000/" +
        this.shopsdata.avatar.slice(this.shopsdata.avatar.indexOf("upload"));
    });
  },
  methods: {},
  components: {
    shopcar,
  },
  computed: {
    // 计算总价
    alltotal() {
      let allprice = 0;
      for (let all of this.$store.getters.getshopcar) {
        allprice += all.num * all.price;
      }
      return allprice.toFixed(2);
    },
    //计算总条数
    allnum(){
      let allnum = 0
       for( let gao of this.$store.getters.getshopcar){
         allnum += gao.num
      }
      return allnum
    }
  },
};
</script>

<style lang="less" scoped>
@base: cadetblue;
body,
html {
  padding: 0;
  margin: 0;
  height: 100%;
}
/* 可以设置不同的进入和离开动画 */
/* 设置持续时间和动画函数 */
.slide-fade-enter-active {
  transition: all 0.6s ease;
}
.slide-fade-leave-active {
  transition: all 0.6s ease;
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateY(12rem);
  opacity: 0;
}

#box {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  #top_box {
    .title {
      background-color: @base;
      height: 120px;
      display: flex;
      align-items: center;
      padding: 0 0.6rem;
      .sope_img {
        border-radius: 16px;
        overflow: hidden;
        margin: 0 8px;
      }
      > div {
        width: 16em;
        h5 {
          font-size: 18px;
          margin: 0;
          color: #fff;
          line-height: 24px;
        }
        p {
          margin: 0;
          font-size: 16px;
          color: #fff;
          margin: 5px 0;
          padding-left: 6px;
        }
        > div {
          color: rgb(123, 243, 197);
          margin-top: 5px;
          font-size: 16px;
        }
      }
    }
  }
  #bootm_box {
    border-bottom: 1px solid #ccc;
  }
  .mian_div {
    flex: 1;
    overflow-y: scroll;
  }
  .shopcar {
    position: fixed;
    height: 50px;
    width: 100%;
    overflow: hidden;
    border-radius: 25px;
    bottom: 6px;
    display: flex;
    z-index: 10000;
    .lef_div {
      background-color: @base;
      width: 100px;
      text-align: center;
      font-size: 20px;
      color: cornsilk;
      padding: 4px;
      p {
        margin: 0;
        font-size: 14px;
      }
    }
    .rig_div {
      background-color: @base;
      display: flex;
      margin-left: 4px;
      justify-content: space-between;
      width: 100%;
      .one {
        width: 3rem;
        text-align: center;
        line-height: 60px;
        font-size: 30px;
        background-color: #fff;
        border-radius: 25px;
        margin: 5px 5px 5px 10px;
      }
      .two {
        p {
          margin: 0;
          font-size: 20px;
          line-height: 22px;
          margin-top: 4px;
          font-weight: bold;
          color: honeydew;
        }
        span {
          font-size: 10px;
          color: silver;
        }
      }
      .three {
        line-height: 50px;
        padding: 2px;
        p {
          margin: 0 10px;
          font-size: 12px;
          color: rgb(226, 222, 222);
        }
      }
    }
  }
  .wrapper {
    display: flex;
    height: 100%;
    width: 100%;
    .big_div {
      width: 100%;
      padding: 0 24px;
      .top_div {
        width: 100%;
        text-align: center;
        color: #fff;
      }
      .center_div {
        width: 100%;
        text-align: center;
        color: #fff;
        line-height: 30px;
      }
    }
  }
}
</style>