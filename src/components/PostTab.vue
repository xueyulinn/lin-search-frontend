<template>
  <div>
    <a-list item-layout="horizontal" :data-source="props.postList">
      <template #renderItem="{ item }">
        <a-list-item>
          <a-list-item-meta :description="item.content">
            <template #title>
              <a>{{ item.title }}</a>
            </template>
            <template #avatar>
              <a-avatar src="https://joeschmoe.io/api/v1/random" />
            </template>
          </a-list-item-meta>
        </a-list-item>
      </template>
    </a-list>
  </div>
  <a-pagination
    v-model:current="current"
    :total="props.totalItems"
    :pageSize="9"
    @change="onPageChange"
  />
</template>

<script setup lang="ts">
import { withDefaults, defineProps, ref, defineEmits } from "vue";
// 定义将要触发的事件
const emit = defineEmits(["page-change"]);
const current = ref(1);

interface Props {
  postList: any[];
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
</script>

<style scoped></style>
