<template>
  <div
    id="login-container"
    class="flex flex-column justify-content-center align-items-center"
  >
    <div class="header text-center mt-4">
      <div class="sensMasterLogo flex flex-column">
        <span class="sensMasterName">
          <span class="first">Sens</span><span class="second">Master</span>
        </span>

        <span class="tag">Safety - Environment - Security</span>
      </div>
      <p>Dashboard</p>
    </div>

    <form class="card p-3 flex flex-column justify-content-center">
      <div class="field flex flex-column">
        <label for="email">Email</label>
        <InputText
          type="text"
          name="email"
          v-model="loginForm.email"
          placeholder="Email"
          class="p-inputtext-filled"
        />
      </div>

      <div class="field flex flex-column">
        <label for="password">Password</label>
        <InputText
          type="password"
          name="password"
          v-model="loginForm.password"
          placeholder="Password"
        />
      </div>

      <div class="field">
        <Button type="button" label="Login" class="p-button" @click="onLogin" />
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { reactive } from "vue";
import { loginUser } from "../shared/authenticate";
import { saveData } from "@/shared/utils";
import { useRouter } from "vue-router";
import { useToast } from "primevue/usetoast";
import { ToastSeverity } from "primevue/api";

export default {
  setup() {
    const loginForm = reactive({
      email: "",
      password: "",
    });

    const toast = useToast();
    const router = useRouter();

    // authenticate
    const onLogin = () => {
      loginUser(loginForm).then((resp) => {
        if (resp.status === 200) {
          let savedData = {
            email: loginForm.email,
            password: loginForm.password,
            token: resp.data.token,
          };

          // save user data
          saveData("user", savedData);
          // navigate to dashboard/users
          router.push({
            path: "dashboard/users",
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
    };

    return { loginForm, onLogin };
  },
};
</script>

<style lang="less" scoped>
#login-container {
  .header {
    h1 {
      text-align: center;
      letter-spacing: 0.25px;
    }
  }

  form {
    label {
      font-size: 12px;
      letter-spacing: 0.5px;
    }

    width: 500px;
  }
}
</style>
