import axios from "axios";
import { useToast } from "primevue/usetoast";
import { EToastType } from "./data/toast";
import { useRouter } from "vue-router";
import { IAddress } from "./data/address";

/** POST DATA
 * Pass in URL and data to your specified endpoint
 *
 * @param url
 * @param data
 * @returns AxiosPromise
 */
export const postData = (url: string, data: any) => {
  const headers = generateHeaders();

  return axios({
    method: "post",
    url: url,
    headers,
    data: data,
  })
    .then((resp) => processResponse(resp))
    .catch((e) => processErrorResponse(e));
};

/** Get Data
 * - get data pass in url
 *
 * @param url
 * @returns
 */
export const getData = (url: string) => {
  const headers = generateHeaders();

  return axios({
    method: "get",
    url: url,
    headers,
  })
    .then((resp) => processResponse(resp))
    .catch((e) => processErrorResponse(e));
};

/** Remove Data
 * - remove data pass in url
 *
 * @param url
 * @returns
 */
export const removeData = (url: string) => {
  const headers = generateHeaders();

  return axios({
    method: "delete",
    url: url,
    headers,
  })
    .then((resp) => processResponse(resp))
    .catch((e) => processErrorResponse(e));
};

/** Update Data
 *  - update data pass in url
 *
 * @param url
 * @returns
 */
export const updateData = (url: string, data: any) => {
  const headers = generateHeaders();

  return axios({
    method: "put",
    url: url,
    headers,
    data,
  })
    .then((resp) => processResponse(resp))
    .catch((e) => processErrorResponse(e));
};

/** Generates Headers For Axios
 *
 * @returns object of header properties inside
 */
function generateHeaders() {
  return {
    "Content-Type": "application/json",
  };
}

/** Process HTTP Error Response
 *
 * @param resp
 * @returns  {data: any, status: number}
 */
function processResponse(resp: any): { data: any; status: number } {
  console.log("INCOMING RESP", resp);

  return {
    data: resp.data,
    status: resp.status,
  };
}

/** Process HTTP Error Response
 *
 * @param resp
 * @returns  {data: any, status: number}
 */
function processErrorResponse(resp: any): { data: any; status: number } {
  console.log("INCOMING ERR RESP", resp);

  return {
    data: resp.response.data,
    status: resp.response.status,
  };
}

export function showToast(type: EToastType, title: string, message: string) {
  const toast = useToast();

  toast.add({ severity: type, summary: title, detail: message, life: 3000 });
}

/** Save Data via SessionStorage
 *
 * @param key
 * @param data
 */
export function saveData(key: string, data: any): void {
  let savedData = "";
  if (typeof data === "object") {
    savedData = JSON.stringify(data);
  } else {
    savedData = data;
  }

  sessionStorage.setItem(key, savedData);
}

/** Get Data via SessionStorage
 * - parses it if has object or array like properties
 * @param key
 * @returns any
 */
export function retreiveData(key: string): any {
  const tempData = sessionStorage.getItem(key);

  if (tempData?.includes("{") || tempData?.includes("[")) {
    return JSON.parse(tempData);
  }

  return tempData;
}
/** Clear Data
 * - clear all data
 */
export function clearData(): void {
  sessionStorage.clear();
}

// export const navigateTo = (routeUrl: string): void => {
//   const router = useRouter();

//   console.log(router);
//   router.push({
//     path: routeUrl,
//   });
// };

/** Process Address
 *  - process address - get string of address
 *
 * @param addressObject
 * @returns
 */
export const processAddress = (addressObject: IAddress) => {
  const street = addressObject.street;
  const suite = addressObject.suite;
  const city = addressObject.city;
  const zipCode = addressObject.zipcode;

  return `${street}, ${suite}, ${city}, ${zipCode}`;
};

/** Generate Random Id
 *  - for now its to use for create user haha
 *
 * @returns
 */
export const generateRandomId = (): number => {
  let newId = "";

  newId += Math.floor(Math.random() * 1000 + 20).toString();

  console.log("New Id", newId);

  return Number(newId);
};
