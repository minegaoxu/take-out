<template>
  <div>
    <div class="content">
      <h6>下单立减5元</h6>

      <div class="title">
        <p>购物车</p>
        <small @click="clearcar">清空购物车</small>
      </div>
      <div class="bottom_div">
        <div v-for="item in getshops" :key="item.id" class="list_div">
          <div>
            <h4 class="van-ellipsis">{{ item.name }}</h4>
          </div>
          <p>{{ item.price }}</p>
          <div class="getnum">
            <svg
              v-show="item.num>0"
              @click="clickadd( item.id , -1 )"
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

            <label v-show="item.num>0">{{ item.num }}</label>

            <svg
              @click="clickadd( item.id , 1 )"
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
</template>

<script>
export default {
  data() {
    return {
      value: 0,
    };
  },
  methods: {
    // 加减shang'pin
    clickadd(id, number) {
      this.$store.commit("changeNum", {
        id,
        number,
      });
    },
    // 清空购物车
    clearcar(){
      this.$store.commit('clearCar')
    }
  },
  computed: {
    //计算属性
    getshops() {
      return this.$store.getters.getshopcar;
    },
  },
};
</script>

<style lang="less" scoped>
.content {
  height: 12rem;
  padding: 0 20px 100px;
  background-color: #fff;
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
  display: flex;
  flex-direction: column;
  h6 {
    text-align: center;
    color: rgb(212, 68, 68);
    height: 10px;
    margin: 6px 0;
  }
  .title {
    display: flex;
    justify-content: space-between;
    height: 20px;
    p {
      color: #ed6a0c;
      margin: 0;
    }
    small {
      color: #ccc;
    }
  }
  .getnum {
    label {
      width: 16px;
      font-size: 14px;
    }
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
  .bottom_div {
    height: 100%;
    overflow: hidden;
    overflow-y: scroll;
  }
  .list_div {
    display: flex;
    height: 40px;
    justify-content: space-between;
    align-items: center;

    > div {
      width: 120px;
      overflow: hidden;
    }
    h4 {
      color: cadetblue;
      margin: 0;
      font-size: 16px;
    }
    p {
      margin: 0;
      font-size: 16px;
      font-weight: bold;
      color: rgb(212, 68, 68);
    }
  }
}
</style>