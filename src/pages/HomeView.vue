<template>
  <div class="home">
    <a-input-search
      v-model:value="param.searchText"
      placeholder="请输入要搜索的内容"
      enter-button="Search"
      size="large"
      @search="onSearch"
    />
  </div>

  <a-tabs v-model:activeKey="activeKey" @change="onChange">
    <a-tab-pane key="Post" tab="文章">
      <PostTab :post-list="postRecords" />
    </a-tab-pane>
    <a-tab-pane key="Picture" tab="图片" force-render>
      <PictureTab :picture-list="pictureRecords" />
    </a-tab-pane>
    <a-tab-pane key="User" tab="用户">
      <UserTab :user-list="userRecords" />
    </a-tab-pane>
  </a-tabs>
</template>

<script setup lang="ts">
import { ref, watchEffect } from "vue";
import PostTab from "@/components/PostTab.vue";
import PictureTab from "@/components/PictureTab.vue";
import UserTab from "@/components/UserTab.vue";
import router from "@/router";
import { useRoute } from "vue-router";
import myAxios from "@/plugins/myAxios";

const route = useRoute();
const postRecords = ref([]);
const userRecords = ref([]);
const pictureRecords = ref([]);

/**
 * 加载数据
 * @param params
 */
const loadData = (params: any) => {
  myAxios
    .post("/post/list/page/vo", params)
    .then((res) => (postRecords.value = res.data.data.records));

  const userQuery = {
    ...params,
    userName: params.searchText,
  };

  myAxios
    .post("/user/list/page/vo", userQuery)
    .then((res) => (userRecords.value = res.data.data.records));

  myAxios
    .post("/picture/list/page/vo", params)
    .then((res) => (pictureRecords.value = res.data.data.records));
};

/*const loadDataOld = (params: any) => {
  myAxios
    .post("/post/list/page/vo", params)
    .then((res) => (postRecords.value = res.data.data.records));

  const userQuery = {
    ...params,
    userName: params.searchText,
  };

  myAxios
    .post("/user/list/page/vo", userQuery)
    .then((res) => (userRecords.value = res.data.data.records));

  myAxios
    .post("/picture/list/page/vo", params)
    .then((res) => (pictureRecords.value = res.data.data.records));
};*/

const loadDataNew = (params: any) => {
  myAxios
    .post("/search/all", params)
    .then((res) => (postRecords.value = res.data.data.records));
};

const initSearch = {
  searchText: "",
  page: "1",
  pageSize: "10",
};

const param = ref(initSearch);

/**
 * 首次请求
 */
loadData(param.value);

// 这个是获取动态路由
const activeKey = route.params.category;

//watchEffect里的响应式变量发生变化时 重新执行函数  这里是 route.query.searchText， 会把param.value的值更新为初始值，并覆盖text值
watchEffect(() => {
  param.value.searchText = route.query.searchText || "";
});

const onSearch = () => {
  router.push({
    query: param.value,
  });

  //搜索的时候加载数据
  loadData(param.value);
};

//切换tab栏时更新url
const onChange = (value: string) => {
  router.push({ path: `/${value}`, query: param.value });
};
</script>
