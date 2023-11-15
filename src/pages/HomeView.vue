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
import { ref, watch, watchEffect } from "vue";
import PostTab from "@/components/PostTab.vue";
import PictureTab from "@/components/PictureTab.vue";
import UserTab from "@/components/UserTab.vue";
import router from "@/router";
import { useRoute } from "vue-router";
import myAxios from "@/plugins/myAxios";
import { message } from "ant-design-vue";

const route = useRoute();
const postRecords = ref([]);
const userRecords = ref([]);
const pictureRecords = ref([]);

/**
 * 加载数据
 * @param params
 */
const loadData = (params: any) => {
  const { type } = params;

  if (!type) {
    message.error("类别为空");
    return;
  }

  myAxios.post("/search/all", params).then((res: any) => {
    const records = res.data.data.page.records;
    if (params.type === "Post") {
      postRecords.value = records;
    } else if (params.type === "User") {
      userRecords.value = records;
    } else if (params.type === "Picture") {
      pictureRecords.value = records;
    }
  });
};

// 这个是获取动态路由
const activeKey = route.params.category;

const initSearch = {
  type: activeKey,
  searchText: "",
  page: "1",
  pageSize: "10",
};

const param = ref(initSearch);

//watchEffect里的响应式变量发生变化时 重新执行函数  这里是 route.query.searchText， 会把param.value的值更新为初始值，并覆盖text值

//当tab栏变化时 进行搜索
watch(
  () => route.params.category,
  (newCategory) => {
    param.value.type = newCategory;
    loadData(param.value);
  }
);

watch(
  () => route.query.searchText,
  (newSearchText) => {
    param.value.searchText = newSearchText || "";
  }
);

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
