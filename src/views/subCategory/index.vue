<script setup>
import { getCategoryFilterAPI, getSubCategoryAPI } from '@/apis/category'
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import GoodsItem from '../Home/components/GoodsItem.vue';

const route = useRoute()

// 获取面包屑导航数据
const subCategoryData = ref([])
const getSubCategory = () => {
  getCategoryFilterAPI(route.params.id).then(res => {
    console.log(res);
    subCategoryData.value = res.result
  }).catch(err => {
    console.log(err);

  })
}


// 获取商品数据
const goodList = ref([])
const reqData = ref({
  categoryId: route.params.id,
  page: 1,
  pageSize: 20,
  sortField: 'publishTime'
})
const getGoods = () => {
  getSubCategoryAPI(reqData.value).then(res => {
    console.log(res);
    goodList.value = res.result.items
  })
  return goodList.value
}

const handleTabChange = (val) => {
  // console.log('val:', val);
  // 注：后端接口没做切换功能
  reqData.value.sortField = val
  reqData.value.page = 1
  getGoods()
}

// 无限滚动实现
const disabled = ref(false)
// 加载方法
const load = () => {
  // 页码+1
  reqData.value.page++
  getSubCategoryAPI(reqData.value).then(res => {
    // 拼接新旧数据
    goodList.value = [...goodList.value, ...res.result.items]
    // 加载完毕，停止监听
    if(res.result.items.length == 0) {
      disabled.value = true
    }
  })

}

onMounted(() => {
  getSubCategory()
  getGoods()
})

</script>

<template>
  <div class="container ">
    <!-- 面包屑 -->
    <div class="bread-container">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: `/category/${subCategoryData.parentId}` }">{{ subCategoryData.parentName }}
        </el-breadcrumb-item>
        <el-breadcrumb-item>{{ subCategoryData.name }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="sub-container">
      <el-tabs type="card" v-model="reqData.sortField" @tab-change="handleTabChange">
        <el-tab-pane label="最新商品" name="publishTime"></el-tab-pane>
        <el-tab-pane label="最高人气" name="orderNum"></el-tab-pane>
        <el-tab-pane label="评论最多" name="evaluateNum"></el-tab-pane>
      </el-tabs>
      <div class="body" v-infinite-scroll="load" :infinite-scroll-disabled="disabled">
        <!-- 商品列表-->
        <GoodsItem v-for="item in goodList" :good="item" />
      </div>
    </div>
  </div>

</template>



<style lang="scss" scoped>
.bread-container {
  padding: 25px 0;
  color: #666;
}

.sub-container {
  padding: 20px 10px;
  background-color: #fff;

  .body {
    display: flex;
    flex-wrap: wrap;
    padding: 0 10px;
  }

  .goods-item {
    display: block;
    width: 220px;
    margin-right: 20px;
    padding: 20px 30px;
    text-align: center;

    img {
      width: 160px;
      height: 160px;
    }

    p {
      padding-top: 10px;
    }

    .name {
      font-size: 16px;
    }

    .desc {
      color: #999;
      height: 29px;
    }

    .price {
      color: $priceColor;
      font-size: 20px;
    }
  }

  .pagination-container {
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }


}
</style>
