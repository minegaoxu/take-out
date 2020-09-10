import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let store = new Vuex.Store({
    // 交互数据
    state: {
        goodsList: [],
    },
    // 更改数据
    mutations: {
        // 两个形参: 参数1 整个state对象 , 参数2 传入的值
        changeName(state, list) {
            // 修改值
            state.goodsList = list
        },
        // 修改商品数量
        changeNum(state, parmas) {
            for (let obj of state.goodsList) {
                for (let newnum of obj.foods) {
                    if (newnum.id == parmas.id) {
                        newnum.num += parmas.number
                    }
                }
            }
        },
        // 清空购物车
        clearCar(state) {
            for (let obj of state.goodsList) {
                for (let newnum of obj.foods)
                    newnum.num = 0
            }
        }
    },


    // 计算属性
    getters: {
        // 筛选数量大于0的foods
        getshopcar(state) {
            let narr = []
            for (let pu of state.goodsList) {
                for (let erver of pu.foods) {
                    if (erver.num > 0) {
                        narr.push(erver)
                    }
                }
            }
            return narr
        }

    }
})
// 暴露
export default store