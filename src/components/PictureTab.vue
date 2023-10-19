<template>
  <div>
    <a-list
      item-layout="horizontal"
      :grid="{ gutter: 16, xs: 1, sm: 2, md: 4, lg: 4, xl: 4, xxl: 3 }"
      :data-source="props.pictureList"
    >
      <template #renderItem="{ item }">
        <a-list-item>
          <a-card
            :hoverable="true"
            style="border-radius: 15px; overflow: hidden"
          >
            <template #cover>
              <div
                style="
                  height: 200px;
                  width: 200px;
                  overflow: hidden;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                "
              >
                <img
                  :src="item.url"
                  style="
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: transform 0.2s;
                    &:hover {
                      transform: scale(1.05);
                    }
                  "
                />
              </div>
            </template>
            <a-card-meta :title="item.title" />
          </a-card>
        </a-list-item>
      </template>
    </a-list>
  </div>
</template>

<script setup lang="ts">
import { withDefaults, defineProps } from "vue";

interface Props {
  pictureList: any[];
}

const props = withDefaults(defineProps<Props>(), { pictureList: () => [] });
</script>

<style scoped></style>
