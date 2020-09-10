<template>
  <div>
    <div class="top_box">
      <div style="padding:10px 0">
        <p style="font-size:20px;font-weight: bold;margin:10px 0">{{ shopsdata.name }}</p>
        <van-rate
          v-model="value"
          size="16"
          allow-half
          readonly
          void-icon="star"
          void-color="#eee"
          color="#ffd21e"
        />
        <span style="margin:0 10px">(661) 月售1000单</span>
      </div>
      <div style="text-align: center;">
        <van-icon name="like" size="30" :class="{active:on}" dot @click="on = !on" />
        <p style="margin:0;font-size:14px">{{ on?'已经收藏':'点击收藏' }}</p>
      </div>
    </div>
    <div class="scend">
      <div>
        <p>起送价</p>
        <p>
          <span>{{ shopsdata.minPrice }}</span>元
        </p>
      </div>
      <div>
        <p>商家配送</p>
        <p>
          <span>{{ shopsdata.deliveryPrice }}</span>元
        </p>
      </div>
      <div>
        <p>平均配送时间</p>
        <p>
          <span>{{ shopsdata.deliveryTime }}</span>分钟
        </p>
      </div>
    </div>
    <div class="bottom_div">
      <h4>活动与公告</h4>
      <p>{{ shopsdata.bulletin }}</p>
    </div>
  </div>
</template>

<script>
import { seller } from "@/api/apis";
export default {
  data() {
    return {
      value: 5,
      shopsdata: {},
      on: false, //收藏
    };
  },
  created() {
    seller().then((res) => {
      if (res.statusText == "OK") {
        this.shopsdata = res.data.data;
      }
    });
  },
  methods: {},
  computed: {},
};
</script>

<style lang="less" scoped>
.top_box {
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #fff;
  padding: 10px 0;
}
.active {
  color: red;
}
.scend {
  display: flex;
  justify-content: space-around;
  background-color: #fff;
  p {
    font-size: 14px;
    color: #888;
    span {
      font-size: 22px;
      margin: 0 4px;
      color: #000;
      font-weight: bold;
    }
  }
}
.bottom_div {
  margin-top: 20px;
  background-color: #fff;
  padding: 12px;

  h4 {
    margin: 0;
    line-height: 50px;
    font-size: 20px;
  }
  p {
    margin: 0;
    font-size: 15px;
    color: cadetblue;
  }
}
</style>