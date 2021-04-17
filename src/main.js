import "@vant/touch-emulator";
import {
  Button,
  Cell,
  CellGroup,
  Checkbox,
  CheckboxGroup,
  Col,
  Dialog,
  Empty,
  Field,
  Form,
  Icon,
  Image as VanImage,
  List,
  Loading,
  NavBar,
  Notify,
  Popup,
  PullRefresh,
  Row,
  Search,
  Sticky,
  Switch,
  SwipeCell,
  Tabbar,
  TabbarItem,
  Toast,
  Uploader,
  Tab,
  Tabs,
  Calendar,
  DatetimePicker,
  Popover,
  RadioGroup,
  Radio,
  Picker 
} from "vant";
//import 'vant/lib/index.css';
import "vant/lib/index.less";
import Vue from "vue";
// import "./../public/iconfont/iconfont.css";
import App from "./App.vue";
import "./assets/style/index.less";
import * as filters from "./filters"; // global filters
// import "./permission"; // 登录认证
import router from "./router";
import store from "./store";
Vue.prototype.$Toast = Toast;
Vue.use(Toast);
Vue.use(Notify);
Vue.use(Dialog);

Vue.use(Popup);
Vue.use(CheckboxGroup);
Vue.use(Checkbox);
Vue.use(SwipeCell);
Vue.use(Empty);
Vue.use(Popover);

Vue.use(Button);
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(NavBar);
Vue.use(Icon);
Vue.use(Col);
Vue.use(Row);
Vue.use(Search);
Vue.use(Sticky);
Vue.use(Form);
Vue.use(Field);
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(Loading);
Vue.use(List);
Vue.use(VanImage);
Vue.use(Uploader);
Vue.use(PullRefresh);
Vue.use(Switch);
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(Calendar);
Vue.use(DatetimePicker);
Vue.use(Picker);
Vue.use(RadioGroup);
Vue.use(Radio);
// register global utility filters
Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key]);
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount("#app");
