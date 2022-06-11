<template>
  <div class="add-user-form-container">
    <form>
      <div class="grid">
        <div class="col flex flex-column">
          <label for="name">Name</label>
          <InputText
            type="text"
            name="name"
            v-model="addUserForm.name"
            placeholder="Name"
            class="p-inputtext-filled"
          />
        </div>

        <div class="col flex flex-column">
          <label for="username">Username</label>
          <InputText
            type="text"
            name="username"
            v-model="addUserForm.username"
            placeholder="Username"
            class="p-inputtext-filled"
          />
        </div>
        <div class="col flex flex-column">
          <label for="email">Email</label>
          <InputText
            type="text"
            name="email"
            v-model="addUserForm.email"
            placeholder="Email"
            class="p-inputtext-filled"
          />
        </div>
      </div>

      <div class="grid">
        <div class="col flex flex-column">
          <label for="street">Street</label>
          <InputText
            type="text"
            name="street"
            v-model="addUserForm.address.street"
            placeholder="Street"
            class="p-inputtext-filled"
          />
        </div>

        <div class="col flex flex-column">
          <label for="suite">Suite</label>
          <InputText
            type="text"
            name="suite"
            v-model="addUserForm.address.suite"
            placeholder="Suite"
            class="p-inputtext-filled"
          />
        </div>

        <div class="col flex flex-column">
          <label for="city">City</label>
          <InputText
            type="text"
            name="city"
            v-model="addUserForm.address.city"
            placeholder="City"
            class="p-inputtext-filled"
          />
        </div>

        <div class="col-2 flex flex-column">
          <label for="zipCode">Zip Code</label>
          <InputText
            type="text"
            name="zipCode"
            v-model="addUserForm.address.zipcode"
            placeholder="Zip Code"
            class="p-inputtext-filled"
          />
        </div>
      </div>

      <div class="grid">
        <div class="col flex flex-column">
          <label for="company">Company</label>
          <InputText
            type="text"
            name="company"
            v-model="addUserForm.company.name"
            placeholder="Company"
            class="p-inputtext-filled"
          />
        </div>
      </div>

      <div class="grid">
        <div class="col">
          <Button label="Add User" @click="saveForm" icon="pi pi-save"></Button>
        </div>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { User } from "@/shared/data/user";
import { addUser } from "@/shared/users";
import { generateRandomId } from "@/shared/utils";
import { ToastSeverity } from "primevue/api";
import { useToast } from "primevue/usetoast";
import { defineComponent, ref } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  setup() {
    const toast = useToast();
    const store = useStore();

    const addUserForm = ref({
      id: "",
      name: "",
      username: "",
      email: "",
      address: {
        street: "",
        suite: "",
        city: "",
        zipcode: "",
      },
      company: {
        name: "",
      },
    });

    function saveForm() {
      const newUser = new User(
        0, // not really need to generate id as the backend will create for you... hm...
        addUserForm.value.name,
        addUserForm.value.email,
        addUserForm.value.username,
        addUserForm.value.address,
        addUserForm.value.company.name
      );

      //   save to (mock) backend

      store.dispatch("addAUser", newUser).then((resp) => {
        if (resp.success) {
          toast.add({
            severity: ToastSeverity.SUCCESS,
            summary: "Success",
            detail: "Successfully created a user",
            life: 3000,
          });
        } else {
          toast.add({
            severity: ToastSeverity.WARN,
            summary: "Warning",
            detail: resp.data.error,
            life: 3000,
          });
        }
      });
    }

    return {
      addUserForm,
      saveForm,
    };
  },
});
</script>

<style lang="less" scoped>
@import url("../assets/styles/form.less");
</style>
