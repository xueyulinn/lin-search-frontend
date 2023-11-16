<template>
  <a-list item-layout="vertical" size="large" :data-source="props.postList">
    <template #renderItem="{ item }">
      <a-list-item key="item.title">
        <template #actions>
          <span v-for="action in actions" :key="action.text">
            <component :is="action.icon" style="margin-right: 8px" />
            {{ action.text }}
          </span>
        </template>
        <template #extra>
          <img
            width="272"
            alt="logo"
            src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
          />
        </template>
        <a-list-item-meta :title="item.title" :description="item.description">
          <template #avatar>
            <a-avatar :src="item.avatar" />
          </template>
        </a-list-item-meta>
        {{ item.content }}
      </a-list-item>
    </template>
  </a-list>

  <a-pagination
    v-model:current="current"
    :total="props.totalItems"
    :pageSize="9"
    @change="onPageChange"
  />
</template>

<script setup lang="ts">
import { withDefaults, defineProps, ref, defineEmits } from "vue";

import {
  StarOutlined,
  LikeOutlined,
  MessageOutlined,
} from "@ant-design/icons-vue";

// 定义将要触发的事件
const emit = defineEmits(["page-change"]);
const current = ref(1);
interface Post {
  title: string;
  content: string;
  href?: string;
  avatar?: string;
  description?: string;
}

interface Props {
  postList: Post[];
  totalItems: number;
}

const props = withDefaults(defineProps<Props>(), {
  postList: () => [],
  totalItems: 0,
});

// 分页变化时触发
const onPageChange = (page: number) => {
  current.value = page;
  // 触发自定义事件，通知父组件
  emit("page-change", page);
};

const actions = [
  { icon: StarOutlined, text: "156" },
  { icon: LikeOutlined, text: "156" },
  { icon: MessageOutlined, text: "2" },
];
</script>

<style scoped></style>
