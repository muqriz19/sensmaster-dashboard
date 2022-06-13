import { addUser, removeTheUserById } from "@/shared/users";
import { createStore } from "vuex";
import { IUser, User } from "../shared/data/user";
import { clearData } from "../shared/utils";

export default createStore({
  state: {
    allUsers: <IUser[]>[],
    currentViewedUser: {},
    pageHeaderData: null,
  },
  getters: {
    getAllUsersData(state) {
      return state.allUsers;
    },
    getCurrentViewedUser(state) {
      return state.currentViewedUser;
    },

    getPageHeaderData(state) {
      return state.pageHeaderData;
    },
  },
  mutations: {
    mRemoveUserById(state, id: number) {
      for (let a = 0; a < state.allUsers.length; a++) {
        if (state.allUsers[a]["id"] === id) {
          state.allUsers.splice(a, 1);
          break;
        }
      }
    },
    storeAllUsers(state, allUsers) {
      if (state.allUsers.length === 0) {
        state.allUsers = allUsers;
      }
    },
    storeCurrentViewedUser(state, user) {
      state.currentViewedUser = user;
    },

    clearCurrentViewedUser(state) {
      state.currentViewedUser = {};
    },

    updateUser(state, user) {
      for (let a = 0; a < state.allUsers.length; a++) {
        if (state.allUsers[a]["id"] === user.id) {
          state.allUsers[a] = user;
          break;
        }
      }
    },

    storeCurrentViewedUserById(state, id) {
      for (let a = 0; a < state.allUsers.length; a++) {
        if (state.allUsers[a]["id"] === id) {
          state.currentViewedUser = state.allUsers[a];
          break;
        }
      }
    },

    setPageHeaderData(state, data) {
      state.pageHeaderData = data;
    },

    removePageHeaderData(state, data) {
      state.pageHeaderData = null;
    },

    addAUser(state, user) {
      state.allUsers.push(user);
    },
  },
  actions: {
    removeUserById(context, id: number) {
      return new Promise((resolve) => {
        removeTheUserById(id).then((resp) => {
          if (resp.status === 200) {
            context.commit("mRemoveUserById", id);

            resolve({ success: true });
          } else {
            resolve({ success: false });
          }
        });
      });
    },

    storeAllUsers(context, allUsers) {
      context.commit("storeAllUsers", allUsers);
    },

    storeCurrentViewedUser(context, user) {
      context.commit("storeCurrentViewedUser", user);
    },

    clearCurrentViewedUser(context) {
      context.commit("clearCurrentViewedUser");
    },

    updateUser(context, user) {
      context.commit("updateUser", user);
    },

    storeCurrentViewedUserById(context, userid) {
      context.commit("storeCurrentViewedUserById", userid);
    },

    addAUser(context, user) {
      return new Promise((resolve) => {
        addUser(user).then((resp) => {
          if (resp && resp.status === 201) {
            const newUser = new User(
              resp.data.id,
              resp.data.name,
              resp.data.email,
              resp.data.username,
              resp.data.address,
              resp.data.company
            );

            context.commit("addAUser", newUser);
            resolve({ success: true });
          } else {
            resolve({ success: false });
          }
        });
      });
    },

    setPageHeaderData(context, data) {
      context.commit("setPageHeaderData", data);
    },

    removePageHeaderData(context, data) {
      context.commit("removePageHeaderData", data);
    },

    logUserOut(context): Promise<void> {
      return new Promise((resolve, reject) => {
        clearData();
        resolve();
      });
    },
  },
  modules: {},
});

// actions - asynchronous
// mutations - synchronous
