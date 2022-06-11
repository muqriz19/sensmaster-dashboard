import { ALLENDPOINTS } from "./data/endpoints";
import { ILogin } from "./data/login";
import { postData, retreiveData } from "./utils";

export const loginUser = (body: ILogin) => {
  const url = ALLENDPOINTS.reqress.base + "login";

  return postData(url, body);
};

/** Check User Token
 *  - just check if user got token from successful login
 *
 * @returns
 */
export const checkUserToken = (): boolean => {
  const userData = retreiveData("user");
  let hasToken = false;

  if (userData) {
    if (userData.token) {
      hasToken = true;
    } else {
      hasToken = false;
    }
  }

  return hasToken;
};
