import Vue from "vue";

import VueCookies from "vue-cookies";
import Toasted from "vue-toasted";
import iconPicker from "e-icon-picker";

import "e-icon-picker/dist/symbol.js"; //基本彩色图标库
import "e-icon-picker/dist/index.css"; // 基本样式，包含基本图标
import "font-awesome/css/font-awesome.min.css"; //font-awesome 图标库
// import "element-ui/lib/theme-chalk/icon.css"; //element-ui 图标库

Vue.use(iconPicker, {
  FontAwesome: true,
  // ElementUI: true,
  eIcon: true,
  eIconSymbol: true
});
// Vue.use(iconPicker, { FontAwesome: true });
Vue.use(VueCookies);
Vue.use(Toasted);
