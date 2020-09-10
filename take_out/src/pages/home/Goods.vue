<template>
  <div id="box">
    <div class="top_div">
      <div class="left">
        <h4>5.0</h4>
        <p>综合评分</p>
        <span>高于周边商家90%</span>
      </div>
      <div class="right">
        <p>
          服务态度
          <span>
            <van-rate
              v-model="value0"
              allow-half
              void-icon="star"
              void-color="#eee"
              color="#ffd21e"
              size="12"
              readonly
            />4.5
          </span>
        </p>
        <p>
          菜品质量
          <span>
            <van-rate
              v-model="value1"
              allow-half
              void-icon="star"
              void-color="#eee"
              color="#ffd21e"
              size="12"
            />4
          </span>
        </p>
        <p>
          服送达时间
          <span>20分钟</span>
        </p>
      </div>
    </div>
    <div id="bottom_div">
      <div>
        <van-tabs
          v-model="active"
          type="card"
          background="#fff"
          color="#ffd21e"
          title-active-color="#fff"
          readonly
        >
          <!-- 全部评价 -->
          <van-tab title="全部">
            <div v-for=" (item,index) in evalList " :key="index" class="bigbox">
              <div class="leftdiv">
                <div>
                  <van-icon name="friends" color="#1989fa" size="40" />
                </div>
              </div>
              <div class="rightdiv">
                <div>
                  <span>{{ item.username }}</span>
                  <span>2020-06-08 21:32:12</span>
                </div>
                <p>
                  <van-rate
                    v-model="item.score"
                    allow-half
                    void-icon="star"
                    void-color="#eee"
                    color="#ffd21e"
                    size="12"
                    readonly
                  />
                  <span style="padding-left:6px">{{ item.deliveryTime }}分钟送达</span>
                </p>
                <p class="van-multi-ellipsis--l2">{{ item.text }}</p>
                <p>
                  <van-icon size="20" color="#ffd21e" name="good-job" />
                  <van-tag
                    v-for=" (val,index) in item.recommend "
                    :key="index"
                    style="margin-left:4px"
                    plain
                    color="#ccc"
                    size="medium"
                  >{{ val }}</van-tag>
                </p>
              </div>
            </div>
          </van-tab>
          <!-- 满意的评价 -->
          <van-tab title="满意">
            <div v-for=" (item,index) in sati " :key="index" class="bigbox">
              <div class="leftdiv">
                <div>
                  <van-icon name="friends" color="#1989fa" size="40" />
                </div>
              </div>
              <div class="rightdiv">
                <div>
                  <span>{{ item.username }}</span>
                  <span>2020-06-08 21:32:12</span>
                </div>
                <p>
                  <van-rate
                    v-model="item.score"
                    allow-half
                    void-icon="star"
                    void-color="#eee"
                    color="#ffd21e"
                    size="12"
                    readonly
                  />
                  <span style="padding-left:6px">{{ item.deliveryTime }}分钟送达</span>
                </p>
                <p class="van-multi-ellipsis--l2">{{ item.text }}</p>
                <p>
                  <van-icon size="20" color="#ffd21e" name="good-job" />
                  <van-tag
                    v-for=" (val,index) in item.recommend "
                    :key="index"
                    style="margin-left:4px"
                    plain
                    color="#ccc"
                    size="medium"
                  >{{ val }}</van-tag>
                </p>
              </div>
            </div>
          </van-tab>
          <!-- 不满意的评价 -->
          <van-tab title="不满意">
            <div v-for=" (item,index) in unsati " :key="index" class="bigbox">
              <div class="leftdiv">
                <div>
                  <van-icon name="friends" color="#1989fa" size="40" />
                </div>
              </div>
              <div class="rightdiv">
                <div>
                  <span>{{ item.username }}</span>
                  <span>2020-06-08 21:32:12</span>
                </div>
                <p>
                  <van-rate
                    v-model="item.score"
                    allow-half
                    void-icon="star"
                    void-color="#eee"
                    color="#ffd21e"
                    size="12"
                    readonly
                  />
                  <span style="padding-left:6px">{{ item.deliveryTime }}分钟送达</span>
                </p>
                <p class="van-multi-ellipsis--l2">{{ item.text }}</p>
                <p>
                  <van-icon size="20" color="#ffd21e" name="good-job" />
                  <van-tag
                    v-for=" (val,index) in item.recommend "
                    :key="index"
                    style="margin-left:4px"
                    plain
                    color="#ccc"
                    size="medium"
                  >{{ val }}</van-tag>
                </p>
              </div>
            </div>
          </van-tab>
        </van-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import { ratings } from "@/api/apis";
import BScroll from "better-scroll";
export default {
  data() {
    return {
      value0: 4.5,
      value1: 4,
      value2: 5,
      active: 0,
      evalList: [],
      sati: [], //满意
      unsati: [], //不满意
    };
  },
  created() {
    ratings().then((res) => {
      if (res.statusText == "OK") {
        this.evalList = res.data.data;
        //满意
        this.sati = this.evalList.filter((item) => item.rateType == 0);
        //不满意
        this.unsati = this.evalList.filter((item) => item.rateType == 1);
      }
    });
  },
  mounted() {
    let bott = new BScroll("#bottom_div", { click: true });
    bott;
  },
};
</script>

<style lang="less" scoped>
#box {
  display: flex;
  flex-direction: column;
}
.bootomBigBox {
  display: flex;
  background-color: #555;
  width: 90%;
  height: 60px;
  border-radius: 60px;
  margin: 0 auto 1rem;
}
.top_div {
  display: flex;
  background-color: #fff;
  padding: 1.5rem;
  .left {
    text-align: center;
    padding: 0 10px;
    h4 {
      margin: 0;
      font-size: 24px;
      color: rgb(202, 31, 245);
      font-weight: bold;
    }
    p {
      margin: 0;
      line-height: 30px;
    }
    span {
      font-size: 12px;
      color: #777;
    }
  }
  .right {
    border-left: 1px solid #ddd;
    padding: 0 10px;
    p {
      font-size: 14px;
      margin: 0;
      line-height: 27px;
      span {
        color: rgb(202, 31, 245);
        font-size: 14px;
      }
    }
  }
}
#bottom_div {
  margin-top: 20px;
  background-color: #fff;
  padding: 8px;
  flex: 1;
  overflow: hidden;
  overflow-y: scroll;
  .bigbox {
    display: flex;
    padding: 20px 14px;
    border-bottom: 1px solid #ccc;
    .leftdiv {
      > div {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        padding: 6px;
        margin: 10px 6px;
        background-color: rgb(191, 231, 225);
      }
    }
    .rightdiv {
      width: 100%;
      margin-left: 10px;
      > div {
        display: flex;
        justify-content: space-between;
        color: #666;
        font-size: 14px;
      }
      p {
        font-size: 14px;
        margin: 0;
        line-height: 24px;
      }
    }
  }
}
</style>