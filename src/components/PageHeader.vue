<template>
  <div class="page-header-container">
    <i
      class="pi pi-arrow-circle-left hand"
      title="Go to previous page"
      @click="goToPreviousPage"
    ></i>

    <span class="title-page"
      >{{ currentTitlePage }} <span v-if="data">{{ data }}</span></span
    >
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";

export default defineComponent({
  name: "PageHeader",
  setup() {
    const router = useRouter();
    const route = useRoute();
    const store = useStore();

    let currentTitlePage = ref("");
    let data = computed(() => {
      return store.getters.getPageHeaderData;
    });

    function goToPreviousPage() {
      router.back();
    }

    onMounted(() => {
      currentTitlePage.value = route.meta.title as string;

      router.beforeEach((to) => {
        currentTitlePage.value = to.meta.title as string;
      });
    });

    return {
      goToPreviousPage,
      currentTitlePage,
      data,
    };
  },
});
</script>

<style lang="less" scoped>
.page-header-container {
  background: #161616;
  padding: 20px;
  color: #fff;

  .title-page {
    padding-left: 20px;
    position: relative;
    bottom: 0.1rem;
  }
}
</style>
