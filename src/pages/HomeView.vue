<template>
  <div class="home">
    <a-input-search
      v-model:value="param.text"
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
      <PictureTab />
    </a-tab-pane>
    <a-tab-pane key="User" tab="用户">
      <UserTab />
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

const postRecords = ref([]);

myAxios
  .post("/post/list/page/vo", {})
  .then((res) => (postRecords.value = res.data.data.records));

const route = useRoute();

const initSearch = {
  text: "",
  page: "1",
  pageSize: "10",
};

const param = ref(initSearch);

const activeKey = route.params.category;

watchEffect(() => {
  param.value = {
    ...initSearch,
    text: route.query.text as string,
  };
});
const onSearch = (value: string) => {
  router.push({
    query: param.value,
  });
};

const onChange = (value: string) => {
  router.push({ path: `/${value}`, query: param.value });
};
</script>
