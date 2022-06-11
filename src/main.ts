import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import PrimeVue from "primevue/config";

import "normalize.css";
import "primevue/resources/themes/fluent-light/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.min.css";
import "./assets/styles/global.less";

import ToastService from "primevue/toastservice";

import InputText from "primevue/inputtext";
import Checkbox from "primevue/checkbox";
import Button from "primevue/button";
import Toast from "primevue/toast";
import Menubar from "primevue/menubar";
import Menu from "primevue/menu";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Accordion from "primevue/accordion";
import AccordionTab from "primevue/accordiontab";
import Panel from "primevue/panel";
import Dialog from "primevue/dialog";

createApp(App)
  .use(PrimeVue)
  .use(ToastService)
  .use(store)
  .use(router)
  .component("InputText", InputText)
  .component("Button", Button)
  .component("Checkbox", Checkbox)
  .component("Toast", Toast)
  .component("Menubar", Menubar)
  .component("Menu", Menu)
  .component("DataTable", DataTable)
  .component("Column", Column)
  .component("Accordion", Accordion)
  .component("AccordionTab", AccordionTab)
  .component("Panel", Panel)
  .component("Dialog", Dialog)
  .mount("#app");
