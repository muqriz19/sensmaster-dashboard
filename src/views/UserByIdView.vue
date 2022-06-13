<template>
  <div class="user-by-id-container p-3">
    <div class="action-container mb-2">
      <Button
        label="Edit"
        @click="toggleEdit"
        v-if="isFormDisabled"
        icon="pi pi-pencil"
      ></Button>
      <Button
        label="Save"
        @click="saveForm"
        v-if="isFormDisabled === false"
        icon="pi pi-save"
      ></Button>
    </div>

    <form>
      <Panel class="panel-box" header="User Information">
        <div class="grid">
          <div class="col flex flex-column">
            <label for="name">Name</label>
            <InputText
              type="text"
              name="name"
              v-model="userForm.name"
              placeholder="Name"
              class="p-inputtext-filled"
              :disabled="isFormDisabled"
            />
          </div>

          <div class="col flex flex-column">
            <label for="username">Username</label>
            <InputText
              type="text"
              name="username"
              v-model="userForm.username"
              placeholder="Username"
              class="p-inputtext-filled"
              :disabled="isFormDisabled"
            />
          </div>
          <div class="col flex flex-column">
            <label for="email">Email</label>
            <InputText
              type="text"
              name="email"
              v-model="userForm.email"
              placeholder="Email"
              class="p-inputtext-filled"
              :disabled="isFormDisabled"
            />
          </div>
        </div>
      </Panel>

      <Panel class="panel-box" header="Address">
        <div class="grid">
          <div class="col flex flex-column">
            <label for="street">Street</label>
            <InputText
              type="text"
              name="street"
              v-model="userForm.address.street"
              placeholder="Street"
              class="p-inputtext-filled"
              :disabled="isFormDisabled"
            />
          </div>

          <div class="col flex flex-column">
            <label for="suite">Suite</label>
            <InputText
              type="text"
              name="suite"
              v-model="userForm.address.suite"
              placeholder="Suite"
              class="p-inputtext-filled"
              :disabled="isFormDisabled"
            />
          </div>

          <div class="col flex flex-column">
            <label for="city">City</label>
            <InputText
              type="text"
              name="city"
              v-model="userForm.address.city"
              placeholder="City"
              class="p-inputtext-filled"
              :disabled="isFormDisabled"
            />
          </div>

          <div class="col flex flex-column">
            <label for="zipCode">Zip Code</label>
            <InputText
              type="text"
              name="zipCode"
              v-model="userForm.address.zipcode"
              placeholder="Zip Code"
              class="p-inputtext-filled"
              :disabled="isFormDisabled"
            />
          </div>
        </div>
      </Panel>

      <Panel class="panel-box" header="Misc">
        <div class="grid">
          <div class="col flex flex-column">
            <label for="company">Company</label>
            <InputText
              type="text"
              name="company"
              v-model="userForm.company.name"
              placeholder="Company"
              class="p-inputtext-filled"
              :disabled="isFormDisabled"
            />
          </div>
        </div>
      </Panel>
    </form>
  </div>
</template>

<script lang="ts">
import { User } from "@/shared/data/user";
import { getUserById, updateTheUserById } from "@/shared/users";
import { ToastSeverity } from "primevue/api";
import { useToast } from "primevue/usetoast";
import {
  computed,
  defineComponent,
  onBeforeMount,
  onUnmounted,
  ref,
} from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";

export default defineComponent({
  setup() {
    const route = useRoute();
    const toast = useToast();
    const store = useStore();
    const id = route.params.id as string;

    let isFormDisabled = ref(true);

    let userForm = ref({
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

    // if we are fetching from backend
    // onBeforeMount(() => {
    //   // fetch user by id
    //   getUserById(id).then((resp) => {
    //     if (resp.status === 200) {
    //       store.dispatch("storeCurrentViewedUser", resp.data);
    //       setForm(resp.data);
    //     }
    //   });
    // });

    // via state
    onBeforeMount(() => {
      const viewedUser = store.getters.getCurrentViewedUser;
      // check if viewed user exist
      if (viewedUser && Object.keys(viewedUser).length > 0) {
        setForm(viewedUser);
      }
    });

    onUnmounted(() => {
      store.dispatch("clearCurrentViewedUser");
      store.dispatch("removePageHeaderData");
    });

    function setForm(user: any) {
      userForm.value.id = user.id;
      userForm.value.name = user.name;
      userForm.value.username = user.username;
      userForm.value.email = user.email;
      userForm.value.address.street = user.address.street;
      userForm.value.address.suite = user.address.suite;
      userForm.value.address.city = user.address.city;
      userForm.value.address.zipcode = user.address.zipcode;
      userForm.value.company.name = user.company;
    }

    function toggleEdit() {
      isFormDisabled.value = !isFormDisabled.value;
    }

    function saveForm() {
      isFormDisabled.value = true;
      const userId = userForm.value.id;

      updateTheUserById(userId, userForm.value).then((resp) => {
        if (resp.status === 200) {
          const updatedUser = new User(
            Number(userForm.value.id),
            userForm.value.name,
            userForm.value.email,
            userForm.value.username,
            userForm.value.address,
            userForm.value.company.name
          );

          store.dispatch("updateUser", updatedUser);

          toast.add({
            severity: ToastSeverity.SUCCESS,
            summary: "Success",
            detail: "Successfully updated user of id " + userId,
            life: 3000,
          });
        } else {
          toast.add({
            severity: ToastSeverity.WARN,
            summary: "Warning",
            detail: "Could not update user of id " + userId,
            life: 3000,
          });
        }
      });
    }

    return { userForm, isFormDisabled, toggleEdit, saveForm };
  },
});
</script>

<style lang="less" scoped>
@import url("../assets/styles/form.less");

.panel-box {
  margin: 10px 0px;
}
</style>
