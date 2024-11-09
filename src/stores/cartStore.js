import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { addCartAPI, getCartListAPI, delCartAPI } from '@/apis/cart'
import { useUserStore } from './userStore'
import { ElMessage } from 'element-plus'

export const useCartStore = defineStore('cart', () => {
  const cartList = ref([])
  const userStore = useUserStore()
  const isLogin = computed(() => userStore.userInfo.token)
  // 添加购物车
  const addCart = (goods) => {
    if (isLogin) {
      // 1. 如果登录了，调用添加购物车接口
      addCartAPI(goods).then(res => {
        console.log(res);
        if (res.code == 1) {
          ElMessage({ type: 'success', message: '添加购物车成功' })
          // 2. 如果添加成功，重新获取购物车列表
          getCartList()
        } else {
          ElMessage({ type: 'error', message: '添加购物车失败' })
        }

      })

    } else {
      // 如果未登录，修改本地购物车数据
      // 判断商品是否添加过购物车
      const item = cartList.value.find(item => {
        return item.skuId == goods.skuId
      })

      if (item) {
        // 添加过，count++
        item.count++;
      } else {
        // 没添加过，直接push
        cartList.value.push(goods)
      }
    }

  }

  // 删除购物车
  const delCart = (id) => {
    if (isLogin) {
      delCartAPI({ 'ids': [id] }).then(res => {
        console.log(res);
        if (res.code == 1) {
          // 删除成功，重新获取购物车列表
          getCartList()
          ElMessage({ type: 'success', message: '操作成功！' })
        }
      })

    } else {
      // 找到要删除的商品
      // 1. 找到要删除的商品的索引值,通过slice删除
      // const index = cartList.value.findIndex(item => item.skuId === id)
      // 1. 通过filter删除
      cartList.value = cartList.value.filter(item => item.skuId !== id)
      // 2. 删除商品
      // cartList.value.splice(index, 1)
    }

  }

  // 获取购物车列表
  const getCartList = () => {
    // 1. 获取购物车列表
    getCartListAPI().then(response => {
      console.log('response', response);
      // 2. 赋值给cartList
      cartList.value = response.result
    })
  }

  // 清除购物车数据
  const clearCart = () => {
    cartList.value = []
  }

  // 单选功能
  const checkItem = (selected, id) => {
    // 找到要修改的商品
    const item = cartList.value.find(item => item.skuId === id)
    // 修改商品选中状态
    item.selected = selected
  }

  // 全选操作
  const changeAll = (val) => {
    // 1. 遍历所有商品，修改selected
    cartList.value.forEach(item => item.selected = val)
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

  // 是否全选
  const isCheckAll = computed(() => {
    // 所有商品都被选中，返回true
    return cartList.value.every(item => item.selected)
  })

  // 计算购物车中选定商品的总数
  const selectedCount = computed(() => {
    // 筛选出购物车中被选中的商品
    return cartList.value.filter(item => item.selected).reduce((pre, item) => {
      // 累加被选中商品的数量
      return pre + item.count
    }, 0)
  })

  // 计算选中商品的总价格
  const selectedPrice = computed(() => {
    // 筛选出购物车中选中的商品
    return cartList.value.filter(item => item.selected).reduce((pre, item) => {
      // 累加每个选中商品的价格，计算总价
      return pre + item.count * item.price
    }, 0)
  })


  return {
    cartList,
    addCart,
    delCart,
    allTatal,
    allPrice,
    checkItem,
    isCheckAll,
    changeAll,
    selectedCount,
    selectedPrice,
    clearCart,
    getCartList
  }
}, {
  // 持久化store
  persist: true,
})