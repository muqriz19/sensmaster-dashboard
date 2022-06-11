<template>
  <div class="user-view-container p-3">
    <div class="action">
      <Button
        label="Add User"
        icon="pi pi-plus"
        @click="toggleDialogBox"
      ></Button>
    </div>
    <Table :columns="headers" :items="allData"></Table>

    <Dialog
      header="Add User"
      position="right"
      v-model:visible="toggleDialog"
      :draggable="false"
      :dismissableMask="true"
      appendTo="self"
    >
      <AddUserForm></AddUserForm>
    </Dialog>
  </div>
</template>

<script lang="ts">
import { computed, onMounted } from "@vue/runtime-core";
import TableVue from "@/components/Table.vue";
import { getUsers } from "@/shared/users";
import { User } from "../shared/data/user";
import { useStore } from "vuex";
import { ref } from "vue";
import AddUserFormVue from "@/components/AddUserForm.vue";

export default {
  name: "UsersView",
  components: {
    Table: TableVue,
    AddUserForm: AddUserFormVue,
  },
  setup() {
    const store = useStore();
    const headers = [
      { field: "id", header: "ID" },
      { field: "email", header: "Email" },
      { field: "username", header: "Username" },
      { field: "name", header: "Full Name" },
      { field: "addressText", header: "Address" },
      { field: "company", header: "Company" },
      { field: "action", header: "Action" },
    ];
    let allData = computed(() => {
      return store.getters.getAllUsersData;
    });

    let toggleDialog = ref(false);

    onMounted(() => {
      // call api get users
      getUsers(1, 10).then((resp) => {
        if (resp && resp.status === 200) {
          store.dispatch("storeAllUsers", processUser(resp.data));
        }
      });
    });

    // process user
    const processUser = (data: any[]): User[] => {
      let newProcessData = [];

      for (let d = 0; d < data.length; d++) {
        const user = new User(
          data[d].id,
          data[d].name,
          data[d].email,
          data[d].username,
          data[d].address,
          data[d].company.name
        );

        newProcessData.push(user);
      }

      return newProcessData;
    };

    const toggleDialogBox = () => {
      toggleDialog.value = !toggleDialog.value;
    };

    return { headers, allData, toggleDialog, toggleDialogBox };
  },
};
</script>

<style lang="less" scoped>
.action {
  margin: 10px 0px;
}
</style>
