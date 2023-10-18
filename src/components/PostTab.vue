<template>
  <div>
    <a-list item-layout="horizontal" :data-source="props.postList">
      <template #renderItem="{ item }">
        <a-list-item>
          <a-list-item-meta :description="item.content">
            <template #title>
              <a href="https://www.antdv.com/">{{ item.title }}</a>
            </template>
            <template #avatar>
              <a-avatar src="https://joeschmoe.io/api/v1/random" />
            </template>
          </a-list-item-meta>
        </a-list-item>
      </template>
    </a-list>
  </div>
</template>

<script setup lang="ts">
import myAxios from "@/plugins/myAxios";
import { withDefaults, defineProps } from "vue";

myAxios.get("/post/get/vo");

interface Props {
  postList: any[];
}

const props = withDefaults(defineProps<Props>(), { postList: () => [] });
</script>

<style scoped></style>