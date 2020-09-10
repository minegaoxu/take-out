//引入axios
import axios from 'axios'

// const IP = "http://127.0.0.1:5000"
// 移动端IP
// const IP = "http://172.20.10.14:5000"
const IP = "http://192.168.1.4:5000"
// 设置默认ip
axios.defaults.baseURL = IP


// 发送axios
// 1.获取商品数据
export const goods_list = () => axios.get('/goods/goods_list')

// 2.获取商家
export const seller = () =>  axios.get('/shop/seller')

// 3.获取评价数据
export const ratings = () =>  axios.get('/shop/ratings')
