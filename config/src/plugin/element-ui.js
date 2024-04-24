import Vue from "vue";
import {
  DatePicker,
  Tree,
  Radio,
  Switch,
  Input,
  Button,
  Table,
  TableColumn,
  Dialog,
  Tooltip,
  Image,
  Loading,
  PageHeader,
} from "element-ui";
Dialog.props.lockScroll.default = false; //解决打开弹窗页面右侧会发生变化，缩小了几个像素点bug
// import { Notification, MessageBox, Message } from 'element-ui'
Vue.use(DatePicker)
  .use(Tooltip)
  .use(Image)
  .use(Tree)
  .use(Radio)
  .use(Switch)
  .use(Input)
  .use(Button)
  .use(Table)
  .use(TableColumn)
  .use(PageHeader)
  .use(Loading.directive)
  .use(Dialog);
// Vue.prototype.$message=Message
// Vue.prototype.$loading =Loading
