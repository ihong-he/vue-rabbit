import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', () => {
  const cartList = ref([])
  const addCart = (goods) => {
    // 判断商品是否添加过购物车
    const item = cartList.value.find(item => {
      return item.skuId == goods.skuId
    })

    if(item) {
      // 添加过，count++
      item.count ++;
    }else {
      // 没添加过，直接push
      cartList.value.push(goods)
    }
  }

  return {
    cartList,
    addCart
  }
},{
  // 持久化store
  persist: true,
})