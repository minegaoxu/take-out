<template>
  <div id="box">
    <div class="nav_div">
      <div>
        <van-sidebar v-model="activeKey">
          <van-sidebar-item
            v-for="(item,index) in getgoodsList_x "
            :key="index"
            :title="item.name"
            @click="onChange(index)"
          />
        </van-sidebar>
      </div>
    </div>
    <div class="big_div">
      <div>
        <div v-for="(item,index) in getgoodsList_x " :key="index" class="conten_div" :id="index">
          <p>{{ item.name }}</p>
          <div v-for="(valu,num) in item.foods" :key="num">
            <img :src="valu.imgUrl" alt />
            <div style="width:100%">
              <h6>{{ valu.name }}</h6>
              <van-tag plain type="danger">{{ valu.category }}</van-tag>
              <p>
                <span>月售60份</span>
                <span>好评度100%</span>
              </p>
              <div class="rig_div">
                <div style="display:flex;width:2rem">
                  <h5>${{ valu.price }}</h5>
                  <del>${{ valu.sellCount }}</del>
                </div>

                <div class="getnum">
                  <svg
                    v-show="valu.num>0"
                    @click="clickadd( valu.id , -1 )"
                    t="1598261161460"
                    class="icon"
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    p-id="3577"
                    width="18"
                    height="18"
                  >
                    <path
                      d="M512 1024C794.769766 1024 1024 794.769766 1024 512 1024 229.230234 794.769766 0 512 0 229.230234 0 0 229.230234 0 512 0 794.769766 229.230234 1024 512 1024ZM192 499.324979C192 470.97897 214.777958 448 243.292006 448L780.707994 448C809.035776 448 832 470.88384 832 499.324979L832 524.675021C832 553.02103 809.222042 576 780.707994 576L243.292006 576C214.964224 576 192 553.11616 192 524.675021L192 499.324979Z"
                      p-id="3578"
                      fill="#d81e06"
                    />
                  </svg>

                  <label v-show="valu.num>0">{{ valu.num }}</label>

                  <svg
                    @click="clickadd( valu.id , 1 )"
                    t="1598261077041"
                    class="icon"
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    p-id="2766"
                    width="20"
                    height="20"
                  >
                    <path
                      d="M530.3 65.9h-45.1C265.8 76.8 75.9 267.3 66.7 486.8v52.6C77.9 757.8 267.1 946.6 485.6 957h35.8c231.8 0.4 437.8-205.8 436.5-437.8v-33.8C947.8 263.5 752.8 71.2 530.3 65.9z m232.6 487.2c-69.7 0.1-139.3 0.1-209 0.1v208.9h-83.3V553.2c-69.7 0-139.3 0-209-0.1v-83.3c69.7-0.1 139.3-0.1 209-0.1V260.9h83.3v208.9c69.7 0 139.3 0 209 0.1v83.2z"
                      fill="#d81e06"
                      p-id="2767"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { goods_list, seller } from "@/api/apis";
// 引入better-scroll
import BScroll from "better-scroll";
export default {
  data() {
    return {
      activeKey: 0,
      shopsdata: {},
    };
  },
  methods: {
    onChange(index) {
      this.bigbox.scrollToElement(document.getElementById(index), 600);
    },
    clickadd(id, number) {
      this.$store.commit("changeNum", {
        id,
        number,
      });
    },
  },
  created() {
    goods_list().then((res) => {
      if (res.statusText == "OK") {
        // 循环为每个商品添加数量
        for (let obja of res.data.goodsList) {
          for (let numc of obja.foods) {
            numc.num = 0;
            // numc.imgUrl =     //手机端开起
            //   "http://192.168.1.4:5000/" +
            //   numc.imgUrl.slice(this.shopsdata.avatar.indexOf("upload"));
          }
        }
        this.$store.commit("changeName", res.data.goodsList);
        // this.goodsList = res.data.goodsList;
        // this.goodsList.push({});
      }
    });
    seller().then((res) => {
      if (res.statusText == "OK") {
        this.shopsdata = res.data.data;

        this.goodsList.forEach((item) => {
          item.foods.forEach((val) => {
            val.imgUrl =
              "http://192.168.1.4:5000/" +
              val.imgUrl.slice(this.shopsdata.avatar.indexOf("upload"));
          });
        });
      }
    });
  },
  mounted() {
    // 使用Bettre-scroll
    this.navbox = new BScroll(document.querySelector(".nav_div"), {
      click: true,
      probeType: 3,
    });
    this.bigbox = new BScroll(document.querySelector(".big_div"), {
      click: true,
      probeType: 3,
    });
    // 右连左
    this.bigbox.on("scroll", (obj) => {
      // 获取div的高度
      let scrY = Math.abs(obj.y);
      // 循环判断
      for (let obj of this.getHeight) {
        if (scrY >= obj.start && scrY < obj.endY) {
          this.activeKey = obj.index;
        }
      }
    });
  },
  //计算属性
  computed: {
    // 获取div的高度
    getHeight() {
      // 高度数组 [{ start:起始位置 , endY:结束位置, index:索引 }]
      let arr = [];
      // 获取起始位置
      let total = 0;
      // 循环
      for (let i = 0; i < this.getgoodsList_x.length; i++) {
        let curHeight = document.getElementById(i).offsetHeight;
        arr.push({ start: total, endY: total + curHeight, index: i });
        total += curHeight;
      }
      return arr;
    },
    // 获取vuex的数据
    getgoodsList_x() {
      return this.$store.state.goodsList;
    },
  },
};
</script>

<style lang="less" scoped>
#box {
  display: flex;
  flex-direction: row;
  width: 100%;
  .nav_div {
    width: 100px;
    overflow-y: scroll;
  }
  .big_div {
    width: 100%;
    overflow-y: scroll;
  }
  .conten_div {
    width: 100%;
    > p {
      margin: 4px 0;
      font-size: 14px;
      color: #666;
      padding-left: 6px;
    }
    > div {
      display: flex;
      padding: 8px 0;
      background-color: #fff;
      width: 100%;
      align-items: center;
      img {
        width: 80px;
        border-radius: 10px;
        margin: 0 14px;
      }
      h6 {
        margin: 5px 0;
        font-size: 14px;
      }
      p {
        margin: 0;
        span {
          line-height: 30px;
          font-size: 12px;
          color: #666;
        }
      }
      .rig_div {
        display: flex;
        justify-content: space-between;
        .getnum {
          label {
            width: 16px;
            font-size: 14px;
          }
          display: flex;
          align-items: center;
          justify-content: flex-end;
        }
        h5 {
          margin: 0;
          font-size: 18px;
          color: rgb(219, 41, 41);
        }
        del {
          font-size: 14px;
          line-height: 24px;
          margin: 0 10px;
          color: #ccc;
        }
        > div {
          margin-right: 10px;
        }
      }
    }
  }
}
</style>