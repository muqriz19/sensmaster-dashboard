<template>
  <div class="navbar-container">
    <Menubar>
      <template #start>
        <div class="sensMasterLogo flex flex-column">
          <span class="sensMasterName">
            <span class="first">Sens</span><span class="second">Master</span>
          </span>

          <span class="tag">Safety - Environment - Security</span>
        </div>
      </template>

      <template #end>
        <Button icon="pi pi-cog" class="p-button-rounded" @click="toggle" />
        <Menu ref="menu" :model="profileMenuItems" :popup="true" />
      </template>
    </Menubar>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

export default defineComponent({
  name: "NavBar",
  setup() {
    const store = useStore();
    const router = useRouter();

    const profileMenuItems = ref([
      {
        label: "Log Out",
        command: () => {
          store.dispatch("logUserOut").then(() => {
            router.push({ name: "login" });
          });
        },
      },
    ]);

    const menu = ref();

    function toggle(event: any) {
      menu.value.toggle(event);
    }
    return {
      profileMenuItems,
      toggle,
      menu,
    };
  },
});
</script>

<style lang="less" scoped>
.navbar-container {
  box-shadow: 0px 0px 0px 1px #c3bebd;
}
</style>
