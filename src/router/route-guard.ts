import { retreiveData } from "@/shared/utils";

export const routeGuard = (to: any, from: any, next: any) => {
  if ("auth" in to.meta && to.meta.auth) {
    // check login token
    const token = retreiveData("user");

    if (token && token !== "") {
      return next();
    }

    return next("/login");
  } else {
    return next();
  }
};
