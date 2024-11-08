import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', () => {
  const cartList = ref([])
  // 添加购物车
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

  // 删除购物车
  const delCart = (id) => {
    // 找到要删除的商品
    // 1. 找到要删除的商品的索引值,通过slice删除
    // const index = cartList.value.findIndex(item => item.skuId === id)
    // 1. 通过filter删除
    cartList.value = cartList.value.filter(item => item.skuId !== id)
    // 2. 删除商品
    // cartList.value.splice(index, 1)
  }

  // 单选功能
  const checkItem = (selected, id) => {
    // 找到要修改的商品
    const item = cartList.value.find(item => item.skuId === id)
    // 修改商品选中状态
    item.selected = selected
  }

  // 计算购物车商品总数
  const allTatal = computed(() => {
    return cartList.value.reduce((pre, item) => {
      return pre + item.count
    }, 0)
  })

  // 计算商品总额
  const allPrice = computed(() => {
    return cartList.value.reduce((pre, item) => {
      return pre + item.count * item.price
    }, 0)
  })
 

  return {
    cartList,
    addCart,
    delCart,
    allTatal,
    allPrice,
    checkItem
  }
},{
  // 持久化store
  persist: true,
})