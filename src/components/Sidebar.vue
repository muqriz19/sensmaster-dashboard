<template>
  <div class="sidebar-container">
    <div
      class="menu-item hand noselect flex flex-row justify-content-between"
      :class="item.active ? 'active' : ''"
      v-for="item of sidebarsItems"
      :key="item.label"
      @click="navigateTo(item)"
    >
      <span class="label-text">
        {{ item.label }}
      </span>
      <i :class="'pi ' + item.icon"></i>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

export default defineComponent({
  name: "SideBar",
  setup() {
    const sidebarsItems = ref([
      {
        label: "Users",
        path: "users",
        icon: "pi-users",
        active: false,
      },
      {
        label: "About",
        path: "about",
        icon: "pi-info-circle",
        active: false,
      },
      {
        label: "FAQ",
        path: "faq",
        icon: "pi-question",
        active: false,
      },
    ]);
    let currentRoute = "";
    const router = useRouter();

    onMounted(() => {
      const route = useRoute();
      currentRoute = route.meta.partOf as string;

      setActive();
    });

    // trigger on route change
    router.afterEach((to) => {
      if (typeof to.name === "string") {
        currentRoute = to.meta.partOf as string;
        setActive();
      }
    });

    // set sidebar menu item to active
    const setActive = () => {
      for (let s = 0; s < sidebarsItems.value.length; s++) {
        if (sidebarsItems.value[s].path === currentRoute) {
          sidebarsItems.value[s].active = true;
        } else {
          sidebarsItems.value[s].active = false;
        }
      }
    };

    // navigate to page
    const navigateTo = (item: {
      label: string;
      path: string;
      active: boolean;
      icon: string;
    }) => {
      router.push({
        path: "/" + item.path,
      });
    };

    return {
      navigateTo,
      sidebarsItems,
    };
  },
});
</script>

<style lang="less" scoped>
.sidebar-container {
  width: 200px;
  background: #346751;
  box-shadow: 2px 0px 0px rgb(195, 190, 189);

  height: 100vh;
  .menu-item {
    text-align: center;
    letter-spacing: 0.5px;
    font-size: 20px;
    background-color: rgb(200, 75, 49);
    color: #fff;
    border-bottom: 1px solid rgb(83, 30, 19);
    padding: 10px;

    i {
      top: 0.25rem;
      position: relative;
    }

    &:hover {
      background-color: rgb(144, 76, 62);
    }
  }
}

// when menu is active
.active {
  background-color: rgb(144, 76, 62) !important;
}
</style>
