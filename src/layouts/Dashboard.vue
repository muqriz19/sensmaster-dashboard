<template>
  <div class="dashboard-container">
    <div class="top">
      <Navbar></Navbar>
    </div>

    <div class="center flex">
      <div class="left">
        <Sidebar></Sidebar>
      </div>

      <div class="right w-full">
        <PageHeader></PageHeader>
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import PageHeader from "@/components/PageHeader.vue";
import Navbar from "../components/Navbar.vue";
import Sidebar from "../components/Sidebar.vue";

export default {
  name: "DashboardLayout",
  components: { Navbar, Sidebar, PageHeader },
  setup() {
    return {};
  },
};
</script>

<style lang="less" scoped>
.dashboard-container {
  height: 100vh;
  overflow-y: hidden;

  .center {
    height: 100%;
  }
}
</style>
