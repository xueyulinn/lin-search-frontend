<template>
  <div>
    <a-list :grid="{ gutter: 32, column: 3 }" :data-source="props.userList">
      <template #renderItem="{ item }">
        <a-card hoverable style="width: 240px">
          <template #cover>
            <img
              alt="example"
              src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
            />
          </template>
          <a-card-meta :title="item.userName">
            <template #description> {{ item.userProfile }}</template>
          </a-card-meta>
        </a-card>
      </template>
    </a-list>
  </div>

  <a-pagination
    v-model:current="current"
    :total="props.totalItems"
    :pageSize="10"
    @change="onPageChange"
  />
</template>

<script setup lang="ts">
import { withDefaults, defineProps, ref, defineEmits } from "vue";
// 定义将要触发的事件
const emit = defineEmits(["page-change"]);
const current = ref(1);

interface Props {
  userList: any[];
  totalItems: number;
}

const props = withDefaults(defineProps<Props>(), {
  userList: () => [],
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
