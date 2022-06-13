<template>
  <div class="about-view-container p-3 page">
    <h4>Dashboard created by Muhammad Muqriz Bin Othman</h4>

    <div class="change-log-box">
      <div class="box" v-for="log of changeLogs" :key="log.version">
        <h5>{{ log.version }}</h5>
        <div class="feature-container">
          <ul
            class="feature-box"
            v-for="feature of log.lists"
            :key="feature.feature"
          >
            <li>
              <span>{{ feature.feature }}</span> -
              <span>{{ feature.description }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  setup() {
    const changeLogs = ref(
      [
        {
          version: "1.0",
          lists: [
            {
              feature: "Login",
              description: "Users can now login",
            },
            {
              feature: "Navbar",
              description: "Navbar is now working",
            },
            {
              feature: "Table",
              description: "Table is now showing all users",
            },
            {
              feature: "UI Basic",
              description: "Basic UI has been launched",
            },
          ],
        },
        {
          version: "1.1",
          lists: [
            {
              feature: "Fix Table",
              description: "Fixed table issue layout",
            },
            {
              feature: "Reworked Navbar",
              description: "Adjust Navbar sizing and position to look optimal",
            },
            {
              feature: "Table Buttons",
              description: "Added Table to button",
            },
            {
              feature: "Added Logo",
              description: "Added Company logo to look more professional",
            },
          ],
        },
        {
          version: "1.2",
          lists: [
            {
              feature: "Fix User Address",
              description: "Fixed user address of undefined",
            },
            {
              feature: "Active Menu Items",
              description: "Added active properties onto menu items on sidebar",
            },
            {
              feature: "Remove User Added",
              description: "Ability to remove user added",
            },
            {
              feature: "Viewable User Added",
              description: "Ability to view user is added",
            },
            {
              feature: "Sidebar",
              description: "Added sidebar to dashboard",
            },
          ],
        },
        {
          version: "1.2.1",
          lists: [
            {
              feature: "Bug Fix",
              description: "Fixed a bug",
            },
            {
              feature: "More Bug Fix",
              description: "Fixed another bug",
            },
          ],
        },
        {
          version: "1.3",
          lists: [
            {
              feature: "Update User",
              description: "Can now update a user",
            },
            {
              feature: "Add User",
              description: "Ability to add a user added",
            },
            {
              feature: "Route Guard",
              description:
                "Added check to route so unlogged user cannot access dashboard",
            },
            {
              feature: "Fixed UI Bug",
              description: "Fixed UI Bug on Sidebar and Page",
            },
            {
              feature: "Clean Up",
              description: "Clean up code on comment and unused variables",
            },
          ],
        },
      ].reverse()
    );
    return { changeLogs };
  },
});
</script>

<style lang="less" scoped>
.change-log-box {
  margin-bottom: 8rem;
  .feature-container {
    font-size: 12px;
  }
}
</style>
