import { ALLENDPOINTS } from "./data/endpoints";
import { IUser, User } from "./data/user";
import { getData, postData, removeData, updateData } from "./utils";

/** Get Users
 * - provide start and end numbers to paginate
 *
 * @param start
 * @param end
 * @returns
 */
export const getUsers = (start?: number, end?: number) => {
  let url = ALLENDPOINTS.jsonPlaceHolder.base + `users`;

  if (start) {
    url += `?_page=${start}`;
  }

  if (end) {
    url += `&_limit=${end}`;
  }

  return getData(url);
};

/** Get User By Id
 * - get user by specified ID
 *
 * @param id
 * @returns
 */
export const getUserById = (id: number | string) => {
  const url = ALLENDPOINTS.jsonPlaceHolder.base + `users/${id}`;

  return getData(url);
};

/** Add User
 * - pass in user object
 *
 * @param user
 * @returns
 */
export const addUser = (user: User) => {
  const url = ALLENDPOINTS.jsonPlaceHolder.base + `users/`;

  return postData(url, user);
};

/** Remove User By Id
 * - pass in id
 *
 * @param id
 * @returns
 */
export const removeTheUserById = (id: number | string) => {
  const url = ALLENDPOINTS.jsonPlaceHolder.base + `users/${id}`;

  return removeData(url);
};

/** Updates the User by Id
 *
 * - pass in id and data
 *
 * @param id
 * @param data
 * @returns
 */
export const updateTheUserById = (id: number | string, data: any) => {
  const url = ALLENDPOINTS.jsonPlaceHolder.base + `users/${id}`;

  return updateData(url, data);
};
