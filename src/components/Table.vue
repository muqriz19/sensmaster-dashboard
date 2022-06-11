<template>
  <div class="table-container">
    <DataTable :value="items" :paginator="true" :rows="5" :rowHover="true">
      <Column
        v-for="col of columns"
        :field="col.field"
        :header="col.header"
        :key="col.field"
        :sortable="col.field !== 'action' ? true : false"
      >
        <template #body="{ data }" v-if="col.field === 'action'">
          <div class="button-action-container flex">
            <Button icon="pi pi-eye" @click="toggleRow(data)" />

            <Button icon="pi pi-trash" @click="deleteRow(data)" />
          </div>
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script lang="ts">
import { ToastSeverity } from "primevue/api";
import { useToast } from "primevue/usetoast";
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

export default defineComponent({
  name: "TableData",
  props: ["columns", "items"],
  setup(props: any) {
    const store = useStore();
    const router = useRouter();
    const toast = useToast();
    let id = 0;

    function toggleRow(data: any) {
      id = data.id;

      store.dispatch("storeCurrentViewedUserById", id);

      store.dispatch("setPageHeaderData", id);

      router.push({
        path: "/user/" + id,
      });
    }

    function deleteRow(data: any) {
      const userId = data.id;
      store.dispatch("removeUserById", Number(userId)).then((result) => {
        if (result.success) {
          toast.add({
            severity: ToastSeverity.SUCCESS,
            summary: "Success",
            detail: "Successfully removed user of id " + userId,
            life: 3000,
          });
        } else {
          toast.add({
            severity: ToastSeverity.WARN,
            summary: "Warning",
            detail: "Could not remove user of id " + userId,
            life: 3000,
          });
        }
      });
    }

    return {
      deleteRow,
      toggleRow,
    };
  },
});
</script>

<style lang="less" scoped>
.button-action-container {
  button {
    margin: 0 5px;
  }
}
</style>
