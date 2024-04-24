<template>
  <div id="app" v-cloak>
    <div class="content">
      <div class="content-side">
        <div class="is-switch">
          <span>企业层级</span>
          <span>是否包含下级</span>
          <!-- <el-radio v-model="isContain" label="1">包含</el-radio>
        <el-radio v-model="isContain" label="0">不包含</el-radio> -->
          <el-switch
            v-model="isContain"
            active-color="#407DCD"
            inactive-color="#DCDFE6"
            @change="getAllData"
          >
          </el-switch>
        </div>
        <div class="is-input">
          <el-input
            placeholder="输入搜索关键字"
            v-model="searchTree"
            class="input-with-select"
            size="small"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="search"
              size="small"
            ></el-button>
          </el-input>
        </div>
        <el-tree
          class="is-tree"
          :props="props"
          :load="loadNode"
          @node-click="clickTree"
          node-key="id"
          :default-expanded-keys="defaultExpandedCids"
          lazy
        >
          <!-- <span slot-scope="{ node }" :title="node.label" v-text="node.label"> -->
          <span slot-scope="{ node }">
            <i v-if="node.level === 1" class="iconfont"></i>
            <i v-else class="iconfontSon"></i>
            {{ node.label }}
          </span>
        </el-tree>
      </div>
      <div class="echarts-box">
        <!-- 通知公告 相关政策制度 -->
        <div class="top-infos">
          <template v-for="(item, index) of noticeSystem">
            <div class="info-item" :key="index">
              <div class="info-item-l">
                <img :src="item.url" alt="" />
                <span class="name">{{ item.title }}</span>
                <el-button class="btn" @click="seeMores(index)"
                  >查看更多</el-button
                >
              </div>
              <div class="info-item-r" v-if="item.data.length != 0">
                <template v-for="(i, ind) of item.data.slice(0, 3)">
                  <div class="item" :key="ind" @click="seeForm(i.id)">
                    <span class="index">{{
                      ind + 1 > 10 ? ind + 1 : "0" + (ind + 1)
                    }}</span>
                    <span class="name">{{ i.title }}</span>
                    <span class="time">{{ i.time }}</span>
                  </div>
                </template>
              </div>
              <p v-else class="top-nodata">暂无数据</p>
            </div>
          </template>
        </div>
        <!-- 
        <div class="select-timer-box">
          <span>日期范围</span>
          <el-date-picker
            v-model="timer"
            type="daterange"
            range-separator="~"
            start-placeholder="请选择日期"
            end-placeholder=""
            @change="changeTime"
          >
          </el-date-picker>
        </div> -->
        <!-- <div class="echarts1-box">
          <div class="left-box">
            <div class="title">问题线索查处状态</div>
            <div class="pie1-box">
              <div id="pie1"></div>
              <div class="pie1-detail">
                <span v-for="(item, index) in pie1Data" :key="index">
                  {{ item.value }}
                  <p>{{ item.name }}</p>
                </span>
              </div>
            </div>
          </div>
          <div class="right-box">
            <div class="title">问题线索来源</div>
            <div id="line1"></div>
          </div>
        </div> -->
        <div class="echarts1-box">
          <div class="left-box">
            <div class="title">问题线索查处状态</div>
            <ul class="ul-box">
              <li class="row-li" @click.stop="getStateDetail('已受理')">
                已受理<span>{{ cardTreeData[0].value }}</span>
              </li>
              <li class="row-li" @click.stop="getStateDetail('已完成初核')">
                已完成初核<span>{{ cardTreeData[1].value }}</span>
              </li>
              <li class="row-li-box">
                <ul class="ul-row">
                  <li class="column-li" @click.stop="getStateDetail('已了结')">
                    已了结<span>{{ cardTreeData[2].value }}</span>
                  </li>
                  <li class="column-li" @click.stop="getStateDetail('中止')">
                    中止<span>{{ cardTreeData[3].value }}</span>
                  </li>
                  <li class="column-li">
                    <div
                      class="div-row"
                      @click.stop="getStateDetail('已完成核查')"
                    >
                      已完成核查<span>{{ cardTreeData[4].value }}</span>
                    </div>
                    <ul class="ul-row-column">
                      <li @click.stop="getStateDetail('已作出处理')">
                        已作出处理<span>{{ cardTreeData[5].value }}</span>
                      </li>
                      <li @click.stop="getStateDetail('已下发整改通知')">
                        已下发整改通知<span>{{ cardTreeData[6].value }}</span>
                      </li>
                      <li @click.stop="getStateDetail('已追责结束')">
                        已追责结束<span>{{ cardTreeData[7].value }}</span>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
          <div class="right-box">
            <div class="title">问题线索来源</div>
            <div id="line1"></div>
          </div>
        </div>
        <div class="echarts2-box">
          <div class="left-box">
            <div class="title">问题线索查处完结状况</div>
            <div class="pie-box">
              <div id="pie2"></div>
              <div id="pie3"></div>
            </div>
          </div>
          <div class="right-box">
            <div class="title">问题线索类型分布</div>
            <div id="bar1"></div>
          </div>
        </div>
        <div class="echarts3-box">
          <div class="title">本级与下属企业问题线索查处完结情况</div>
          <div id="bar2"></div>
        </div>
        <div class="echarts3-box">
          <div class="title">下属企业风险提示通报情况</div>
          <div id="bar3"></div>
        </div>
      </div>
    </div>
    <el-dialog
      title="提示"
      :visible.sync="showDialog"
      :width="dialogWidth"
      :destroy-on-close="true"
      @close="handleClose"
    >
      <span slot="title" class="dialog-footer">
        <span v-show="showList">{{ dialogTitle }}</span>
        <!-- <el-page-header
          @back="showList = true"
          content="详情页面"
          v-show="!showList"
        >
        </el-page-header> -->
        <div @back="showList = true" v-show="!showList">详情页面</div>
      </span>
      <div class="dialog-box" v-show="showList" v-loading="tableLoading">
        <Etable
          :column="column"
          :tableData="tableData"
          :showEarly="showEarly"
          :isLoading="tableLoading"
          :needMerge="needMerge"
        />
      </div>
      <div class="dialog-detail-box" v-show="!showList">
        <!-- <el-page-header @back="goBack" content="详情页面"> </el-page-header> -->
        <iframe
          name="stage"
          id="stage"
          frameborder="0"
          width="100%"
          :src="iframeUrl"
        ></iframe>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import http from "./api/api.js";
import { Loading } from "element-ui";
import Etable from "./views/Etable.vue";
let pieChart1 = null;
let pieChart2 = null; //模拟圆环
let pieChart3 = null; //模拟圆环
let line1Chart = null;
let barChart1 = null;
let barChart2 = null;
let barChart3 = null;

export default {
  components: { Etable },
  data() {
    return {
      //弹窗——————————————————
      showDialog: false,
      tableLoading: false,
      needMerge: false,
      showList: true,
      iframeUrl: "",
      dialogTitle: "详情",
      filid: "", //树结构所需参数
      noticeSystem: [
        {
          title: "通知公告",
          url: require("./img/notice.png"),
          data: [],
        },
        {
          title: "相关政策制度",
          url: require("./img/policy.png"),
          data: [],
        },
      ],
      // 通知公告
      noticeId: null,
      // 政策制度
      policyId: null,
      defaultExpandedCids: [],
      node_had: "", //这里是关键！在data里面定义一个变量，将node.level == 0的node存起来
      resolve_had: "", //同上，把node.level == 0的resolve也存起来
      searchTree: "",
      timer: [],
      isContain: true, //是否包含下级（包含：1，不包含 0，默认包含）
      clickTreeData: {},
      props: {
        label: "name",
        children: "children",
        isLeaf: "leaf",
      },
      treeData: [],
      pie1Data: [
        { value: 0, name: "已受理" },
        { value: 0, name: "已初步审核和分类处置" },
        { value: 0, name: "已核查" },
        { value: 0, name: "整改中" },
        { value: 0, name: "整改结束" },
        { value: 0, name: "中止" },
      ],
      cardTreeData: [
        { value: 0, name: "已受理" },
        { value: 0, name: "已完成初核" },
        { value: 0, name: "已了结" },
        { value: 0, name: "中止" },
        { value: 0, name: "已完成核查" },
        { value: 0, name: "已做出处理" },
        { value: 0, name: "已下发整改通知" },
        { value: 0, name: "已追责结束" },
      ],
      lineData1: {
        xData: [],
        sData: [],
        // xData: [
        //   "国资系统外部监督部门",
        //   "市国资委",
        //   "企业内部监督部门",
        //   "上级移交或资企业报告",
        //   "信访、举报",
        //   "其它",
        // ],
        // sData: [1, 5, 6, 8, 9, 3],
      },
      bar1Data: {
        xData: [],
        sData: [],
        // xData: [
        //   "集团管控",
        //   "购销管理",
        //   "工程承包建设",
        //   "转让产权、上市公式股权和资产",
        //   "固定资产投资",
        //   "投资并购",
        //   "改组改制",
        //   "资金管理",
        //   "担保责任",
        //   "风险管理",
        //   "其他",
        // ],
        // sData: [0, 0, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      },
      barData2: {
        xData: [
          "成都银行",
          "成都农商银行",
          "成都产业集团",
          "成都城投集团",
          "成都传媒集团",
          "成都交投集团",
          "成都文旅集团",
          "成都轨道集团",
          "成都环境集团",
          "成都兴城集团",
          "市公交集团",
          "成都交子金控集团",
          "成都益民集团",
          "锦泰保险公司",
          "成都设计咨询集团",
          // "成都设计咨询集团",
        ],
        noEnd: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        end: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      },
      barData3: {
        xData: [],
        seriesData1: [],
        seriesData2: [],
        seriesData3: [],
      },
      pie2Data: "",
      pie3Data: "",
      pie23Alldata: "",
      // defaultProps: {
      //   children: "children",
      //   label: "name",
      // },
      //表格参数————————————————
      column: [],
      tableData: [],
      showEarly: true,
    };
  },
  computed: {
    isContainNum: function () {
      //是否包含下级（包含：1，不包含 0，默认包含）
      return this.isContain ? "1" : "0";
    },
    dialogWidth: function () {
      return this.showList ? "90%" : "940px";
    },
  },
  mounted() {
    // this.getTreeParams();
    this.getDict();
    this.getAllData();
  },
  methods: {
    // 查看更多
    seeMores(index) {
      this.showEarly = false;
      this.column = [
        { prop: "index", label: "序号" },
        { prop: "title", label: "标题" },
        { prop: "time", label: "发布时间" },
        { prop: "hits", label: "点击数" },
        {
          label: "操作",
          width: 80,
          formatter: (row) => {
            return (
              <el-button
                size="mini"
                type="primary"
                onClick={this.seeForm.bind(this, row.id)}
              >
                查看
              </el-button>
            );
          },
        },
      ];
      this.showDialog = true;
      this.tableData = this.noticeSystem[index].data;
    },
    // 查看详情
    seeForm(id) {
      let url = `${window.origin}/cms/information/viewInfo.dhtml?id=${id}`;
      window.open(
        url,
        "_blank",
        `height=${window.screen.height}, width=${window.screen.width}`
      );
    },
    handleClose() {
      this.showList = true;
      this.tableData = [];
    },
    handleClose1() {},
    async getAllData() {
      let loadingInstance = Loading.service({ fullscreen: true });
      // this.questionQueryState(); //问题线索查处状态
      this.questionQueryStateCard(); //问题线索查处状态卡片版本
      this.questionSource(); //问题线索来源
      this.questionEndState(); //问题线索查处完结状况
      this.questionBranch(); //问题线索类型分布
      this.subordinateState(); //下属企业问题线索受理和查处情况
      await this.subordinateRisk(); //下属企业问题线索受理和查处情况
      loadingInstance.close(); //关闭加载loading
    },
    //清除创建的echarts实例
    destroyEcharts(echartsName) {
      if (echartsName != null || echartsName != undefined) {
        echartsName.dispose();
      }
    },
    //子节点点击
    clickTree(node) {
      //截取id 删除-org-1
      if (node?.id) {
        node.id = node.id.replace(/\-org-1/g, "");
      }
      // if (node.children) return;
      this.clickTreeData = node;
      this.getAllData();
    },
    async search() {
      this.defaultExpandedCids = [];
      this.node_had.childNodes = []; //把存起来的node的子节点清空，不然会界面会出现重复树！
      this.loadNode(this.node_had, this.resolve_had); //再次执行懒加载的方法
    },
    changeTime(e) {
      this.timer = [new Date(e[0]).getTime(), new Date(e[1]).getTime()];
      this.getAllData();
    },
    getDefault(data) {
      for (let j = 0; j < data.length; j++) {
        if (data[j].children) {
          this.defaultExpandedCids.push(data[j].id);
          this.getDefault(data[j].children);
        }
      }
    },
    async loadNode(node, resolve) {
      // console.log(">>>node, resolve", node);
      //最外层
      if (node.level === 0) {
        this.node_had = node; //这里是关键！在data里面定义一个变量，将node.level == 0的node存起来
        this.resolve_had = resolve; //同上，把node.level == 0的resolve也存起来

        let dataArr = "";
        // debugger;
        // while (!this.filid) {}
        dataArr = await this.getTree(); //正式
        // let dataArr= await this.getTree(this.searchTree?this.searchTree:'0');//本地模拟
        let data = [];
        for (let i = 0; i < dataArr.length; i++) {
          //成都国资委用法
          // if (dataArr[i]["name"] == "委机关") {
          // if (dataArr[i]["id"] == "ena211628882ee45c78a47af2ee9bd0391-org-1") {
          // data.push(dataArr[i]);
          //   break;
          // }
          //省国资委用法
          data.push(dataArr[i]);
        }
        //查询已存在的子节点  默认展开
        this.getDefault(data);
        return resolve(data);
      }
      // if (node.level > 1) return resolve([]);
      //里层  isParent==true代表还有子级
      // if (node.level >= 1 && node.data.isParent) {
      // if (node.level >= 1 && node.data.subNode) {
      if (node.level >= 1) {
        //有children直接用  不用请求数据
        if (node.data.children) {
          let childrenArr = [...node.data.children];
          for (let i = 0; i < childrenArr.length; i++) {
            if (!childrenArr[i].children && !childrenArr[i].subNode) {
              childrenArr[i].leaf = true;
            }
          }
          return resolve(childrenArr);
        } else if (node.data.subNode) {
          return resolve(await this.getTree(node.data.id));
        } else {
          resolve([]);
        }
      }
    },
    // mockTree(id) {
    //   let data;
    //   if (id == "0") {
    //     data = arrAll;
    //   } else if (id == "enf05fcb421f584e7989e26b6cfc888e60-org-0") {
    //     data = isarr0;
    //   } else if (id == "en2486c041e9d942f78f34cdb91b3092c3-org-1") {
    //     data = isarr2;
    //   } else if (id == 999) {
    //     data = arrAll1;
    //   } else if (id == "运维单位") {
    //     data = searchArr;
    //   } else if (id == "22") {
    //     data = searchArr1;
    //   } else {
    //     data = isarr1;
    //   }
    //   return Promise.resolve(data);
    // },
    //正式
    async getTree(id = "0") {
      try {
        //getTree需要this.filid的值  通过getTreeParams获取
        if (!this.filid) {
          await this.getTreeParams();
        }
        let { rCode, results } = await http.getTree({
          id,
          filid: this.filid,
          showarea: 1, //展示范围:0:单位;1:单位+部门
          seachkey: this.searchTree, //关键字搜索
          requestbusinessSubCentercode:
            "business_jdzz_wtxsgl_business_center_code",
        });
        if (rCode == 0) {
          results.forEach((item) => {
            //表示子节点是最里层了  不能展开
            // !item.isParent && (item.leaf = true);
            //subNode代表是否还有子级 最外层的subNode为false 但是把值放到children里的
            if (!item.children && !item.subNode) {
              item.leaf = true;
            }
          });
          // console.log(">>>getTree", results);

          return results;
        }
      } catch (error) {
        console.log(">>>err", error);
      }
    },
    //字典查询
    async getDict() {
      try {
        let { rCode, results } = await http.getDict({
          sysAppCode: "HomeColumnId",
        });
        if (rCode == 0) {
          results.forEach((item) => {
            switch (item.shortName) {
              case "jdzz_tzgg":
                this.noticeId = item.cciValue;
                break;
              case "jdzz_xgzcwj":
                this.policyId = item.cciValue;
                break;
            }
          });
          this.getNotice(); //通知公告
        }
      } catch (error) {
        console.log(">>>err", error);
      }
    },

    async getTreeParams() {
      try {
        // let { rCode, results } = await this.mockTree(id); //本地模拟
        //正式
        let { rCode, results } = await http.getTreeParams(); //获取树结构所需参数
        if (rCode == 0) {
          this.filid = results;
        }
      } catch (error) {
        console.error(">>>err", error);
      }
    },
    //通知公告
    async getNotice() {
      try {
        //通知公告
        let { status, data } = await http.getNotice({
          size: 10,
          columnId: this.noticeId,
          // columnId: "0fca40bd97384b70b603f871a6979441",
        });
        //相关政策制度
        let { status: policyStatus, data: policyData } = await http.getNotice({
          size: 10,
          columnId: this.policyId,
          // columnId: "a7f5085a31c94355b28a4efc62026c2b",
        });
        if (status == "success" && data.length > 0) {
          this.noticeSystem[0].data = data.map((item, index) => {
            let nowTime = new Date(item.publishTime);
            return {
              ...item,
              index: ++index,
              time: `${nowTime.getFullYear()}-${
                nowTime.getMonth() + 1
              }-${nowTime.getDate()}`,
            };
          });
        } else {
          this.noticeSystem[0].data = [];
        }

        if (policyStatus == "success" && policyData.length > 0) {
          this.noticeSystem[1].data = policyData.map((item, index) => {
            let nowTime = new Date(item.publishTime);
            return {
              ...item,
              index: ++index,
              time: `${nowTime.getFullYear()}-${
                nowTime.getMonth() + 1
              }-${nowTime.getDate()}`,
            };
          });
        } else {
          this.noticeSystem[1].data = [];
        }
        // this.pie1Data = results.detail;
        // this.pie1Fn();
      } catch (error) {
        console.error(">>>error", error);
      }
    },
    //问题线索查处状态
    async questionQueryState() {
      try {
        let { rCode, results } = await http.questionQueryState({
          orgId: this.clickTreeData.id || null, //企业id(不传则默认当前企业)
          startTime: this.timer[0] || null, //受理开始时间：时间戳（毫秒）
          endTime: this.timer[1] || null, //	受理结束时间：时间戳（毫秒）
          isContain: this.isContainNum, //是否包含下级（包含：1，不包含 0，默认包含）
        });
        this.pie1Data = results.detail;
        this.pie1Fn();
      } catch (error) {
        console.error(">>>error", error);
      }
    },
    //问题线索查处状态卡片版本
    async questionQueryStateCard() {
      try {
        let { rCode, results } = await http.questionQueryStateCard({
          orgId: this.clickTreeData.id || null, //企业id(不传则默认当前企业)
          startTime: this.timer[0] || null, //受理开始时间：时间戳（毫秒）
          endTime: this.timer[1] || null, //	受理结束时间：时间戳（毫秒）
          isContain: this.isContainNum, //是否包含下级（包含：1，不包含 0，默认包含）
        });
        this.cardTreeData = results.list;
        // this.pie1Fn();
      } catch (error) {
        console.error(">>>error", error);
      }
    },
    //问题线索来源
    async questionSource() {
      try {
        let { rCode, results } = await http.questionSource({
          orgId: this.clickTreeData.id || null, //企业id(不传则默认当前企业)
          startTime: this.timer[0] || null, //受理开始时间：时间戳（毫秒）
          endTime: this.timer[1] || null, //	受理结束时间：时间戳（毫秒）
          isContain: this.isContainNum, //是否包含下级（包含：1，不包含 0，默认包含）
        });
        // this.pie1Data=results.detail
        // this.pie1Fn();
        if (rCode == 0) {
          let xData = [];
          let sData = [];
          results.forEach((item) => {
            xData.push(item.name);
            sData.push(item.value);
          });
          this.lineData1 = {
            xData,
            sData,
          };
          this.line1Fn();
        }
      } catch (error) {
        console.log(">>>error", error);
      }
    },
    //问题线索查处完结状况
    async questionEndState() {
      try {
        let { rCode, results } = await http.questionEndState({
          orgId: this.clickTreeData.id || null, //企业id(不传则默认当前企业)
          startTime: this.timer[0] || null, //受理开始时间：时间戳（毫秒）
          endTime: this.timer[1] || null, //	受理结束时间：时间戳（毫秒）
          isContain: this.isContainNum, //是否包含下级（包含：1，不包含 0，默认包含）
        });
        // this.pie1Data=results.detail
        // this.pie1Fn();
        if (rCode == 0) {
          let all = 0;
          results.forEach((item) => {
            all += item.value;
            switch (item.name) {
              case "问题查处尚未结束":
                this.pie2Data = item.value;
                break;
              case "问题查处已结束":
                this.pie3Data = item.value; //已结束
                break;
            }
          });
          //总数
          this.pie23Alldata = all;
          // console.log(">>>this.pie23Alldata", this.pie23Alldata);

          // this.pie23AllData = (results[0].value - 0 )+ (results[1].value - 0);
          this.pie2Fn();
          this.pie3Fn();
        }
      } catch (error) {
        // this.$message.error(error)
        // console.log(">>>error", error);
      }
    },
    //问题线索类型分布
    async questionBranch() {
      try {
        let { rCode, results } = await http.questionBranch({
          orgId: this.clickTreeData.id || null, //企业id(不传则默认当前企业)
          startTime: this.timer[0] || null, //受理开始时间：时间戳（毫秒）
          endTime: this.timer[1] || null, //	受理结束时间：时间戳（毫秒）
          isContain: this.isContainNum, //是否包含下级（包含：1，不包含 0，默认包含）
        });
        if (rCode == 0) {
          let xData = [];
          let sData = [];
          results.forEach((item) => {
            xData.push(item.name);
            sData.push(item.value);
          });
          if (!results.length) {
            xData.push("暂无数据");
            sData.push(0);
          }
          this.bar1Data = {
            xData,
            sData,
          };
          this.barFn1();
        }
      } catch (error) {
        // this.$message.error(error)
        // console.log(">>>error", error);
      }
    },
    //下属企业问题线索受理和查处情况
    async subordinateState() {
      try {
        let { rCode, results } = await http.subordinateState({
          orgId: this.clickTreeData.id || null, //企业id(不传则默认当前企业)
          startTime: this.timer[0] || null, //受理开始时间：时间戳（毫秒）
          endTime: this.timer[1] || null, //	受理结束时间：时间戳（毫秒）
          isContain: this.isContainNum, //是否包含下级（包含：1，不包含 0，默认包含）
        });
        if (rCode == 0) {
          let noEndData, endData;
          results.forEach((item) => {
            switch (item.name) {
              case "问题查处尚未结束":
                noEndData = item;
                break;
              case "问题查处已结束":
                endData = item;
                break;
            }
          });
          let xData = [];
          let noEnd = [];
          let end = [];
          noEndData.value.forEach((item, index) => {
            xData.push(item.name);
            noEnd.push({ value: item.value, orgId: item.orgId });
            end.push({
              value: endData.value[index].value,
              orgId: endData.value[index].orgId,
            });
          });
          if (!noEndData.value.length) {
            xData.push("暂无数据");
            noEnd.push({ value: 0, orgId: null });
            end.push({ value: 0, orgId: null });
          }
          this.barData2 = {
            xData,
            noEnd,
            end,
          };
          this.barFn2();
        }
      } catch (error) {
        // this.$message.error(error)
        console.log(">>>error", error);
      }
    },
    //下属企业风险提示通报情况
    async subordinateRisk() {
      try {
        let { rCode, results } = await http.subordinateRisk({
          orgId: this.clickTreeData.id || null, //企业id(不传则默认当前企业)
          startTime: this.timer[0] || null, //受理开始时间：时间戳（毫秒）
          endTime: this.timer[1] || null, //	受理结束时间：时间戳（毫秒）
          isContain: this.isContainNum, //是否包含下级（包含：1，不包含 0，默认包含）
        });
        if (rCode == 0) {
          let seriesDataInit1, seriesDataInit2, seriesDataInit3;
          let xData = [],
            seriesData1 = [],
            seriesData2 = [],
            seriesData3 = [];
          results.forEach((item) => {
            switch (item.name) {
              case "提示函":
                seriesDataInit1 = item.value;
                break;
              case "通报":
                seriesDataInit2 = item.value;
                break;
              case "责任约谈":
                seriesDataInit3 = item.value;
                break;
            }
          });
          seriesDataInit1.forEach((item, index) => {
            xData.push(item.name);
            seriesData1.push({ value: item.value, orgId: item.orgId });
            seriesData2.push({
              value: seriesDataInit2[index].value,
              orgId: seriesDataInit2[index].orgId,
            });
            seriesData3.push({
              value: seriesDataInit3[index].value,
              orgId: seriesDataInit3[index].orgId,
            });
          });
          if (!seriesData1.length) {
            xData.push("暂无数据");
            seriesData1.push(0);
            seriesData2.push(0);
            seriesData3.push(0);
          }
          this.barData3 = {
            xData,
            seriesData1,
            seriesData2,
            seriesData3,
          };
          this.barFn3();
        }
      } catch (error) {
        // this.$message.error(error)
        console.log(">>>error", error);
      }
    },
    //查看详情 “问题线索查处状态”、
    async getStateDetail(type) {
      // console.log(">>>", type, endType, problemType, orgId);return
      try {
        this.tableLoading = true;
        this.showDialog = true;
        this.needMerge = true;
        this.showEarly = true;
        this.dialogTitle = (type || endType || problemType) + "详情";

        this.column = [
          {
            prop: "row_num",
            label: "序号",
            width: 60,
            fixed: "left",
          },
          // { prop: "isWarn", label: "预警", width: 140 },
          { prop: "thread_number", label: "线索编号", width: 140 },
          { prop: "accept_date", label: "受理时间", width: 140 },
          { prop: "problem_clue_source", label: "线索来源", width: 140 },

          { prop: "fill_org_name", label: "当前线索所在单位", width: 200 },

          {
            prop: "ssgy_org_name",
            label: "当事企业名称",
            width: 140,
            fixed: "left",
          },
          { prop: "sj_org_level", label: "当事企业层级", width: 140 },
          { prop: "thread_level", label: "线索管理级次", width: 140 },
          { prop: "problem_clue_describe", label: "问题线索描述", width: 140 },
          { prop: "status", label: "追责进度", width: 140 },
          { prop: "zrrdqk", label: "违规认定", width: 140 },
          { prop: "blyxqk", label: "损失及不良后果", width: 140 },
          { prop: "name", label: "姓名", width: 140 },
          { prop: "post_name", label: "职务", width: 140 },
          { prop: "duty_type", label: "责任类型", width: 140 },
          { prop: "handle_decide", label: "处理方式", width: 140 },
          { prop: "report_status", label: "审核状态", width: 140 },
          {
            label: "操作",
            width: "80",
            formatter: (row) => {
              return (
                <el-button
                  size="mini"
                  type="primary"
                  onClick={this.look.bind(this, row.main_id, 0)}
                >
                  查看
                </el-button>
              );
            },
          },
        ];

        let typeObj = {
          已受理: 1,
          已完成初核: 2,
          已了结: 3,
          中止: 4,
          已完成核查: 5,
          已作出处理: 6,
          已下发整改通知: 7,
          已追责结束: 8,
        };
        let postData = {
          orgId: this.clickTreeData.id || null, //企业id(不传则默认当前企业)
          startTime: this.timer[0], //受理开始时间：时间戳（毫秒）
          endTime: this.timer[1], //	受理结束时间：时间戳（毫秒）
          isContain: this.isContainNum,
          type: typeObj[type],
        };
        let { rCode, results: data } = await http.getStateDetail(postData);
        this.tableLoading = false;
        if (rCode == 0) {
          let mergeNum = 1, //记录总合并值
            sameNum = 0, //记录需要被写入合并值大于1的数组下标 默认0被记录
            lastRow = {}; //上一次被循环的对象  跟当前做对比
          for (let i = 0; i < data.length; i++) {
            if (i === 0) {
              lastRow = data[i];
              if (data.length === 1) {
                data[0].mergeNum = 1; //不需要合并
              }
              continue;
            }
            if (lastRow.main_id == data[i].main_id) {
              mergeNum++;
              //处理最后一个
              if (i == data.length - 1) {
                data[sameNum].mergeNum = mergeNum;
                break;
              }
              data[i].mergeNum = 0; //需要被合并

              continue;
            } else {
              data[sameNum].mergeNum = mergeNum; //设置上一个
              data[i].mergeNum = 1; //不需要合并
              // mergeNum > 1 && (data[sameNum].mergeNum = mergeNum);
              lastRow = data[i];
              mergeNum = 1;
              sameNum = i;
            }
          }
          this.tableData = data;
        } else {
          this.tableData = [];
        }
      } catch (error) {
        this.tableData = [];
        this.tableLoading = false;
        // this.$message.error(error)
        console.log(">>>error", error);
      }
    },
    //查看详情 “问题线索来源”、“问题线索查处完结状态”、“下属企业问题线索受理和查处情况
    async getDetail(
      type = null,
      endType = null,
      problemType = null,
      orgId = null
    ) {
      // console.log(">>>", type, endType, problemType, orgId);return
      try {
        this.tableLoading = true;
        this.showDialog = true;
        this.needMerge = true;
        this.showEarly = true;
        this.dialogTitle = (type || endType || problemType) + "详情";

        this.column = [
          {
            prop: "row_num",
            label: "序号",
            width: 60,
            fixed: "left",
          },
          // { prop: "isWarn", label: "预警", width: 140 },
          { prop: "thread_number", label: "线索编号", width: 140 },
          { prop: "accept_date", label: "受理时间", width: 140 },
          { prop: "problem_clue_source", label: "线索来源", width: 140 },

          { prop: "fill_org_name", label: "当前线索所在单位", width: 200 },

          {
            prop: "ssgy_org_name",
            label: "当事企业名称",
            width: 140,
            fixed: "left",
          },
          { prop: "sj_org_level", label: "当事企业层级", width: 140 },
          { prop: "thread_level", label: "线索管理级次", width: 140 },
          { prop: "problem_clue_describe", label: "问题线索描述", width: 140 },
          { prop: "status", label: "追责进度", width: 140 },
          { prop: "zrrdqk", label: "违规认定", width: 140 },
          { prop: "blyxqk", label: "损失及不良后果", width: 140 },
          { prop: "name", label: "姓名", width: 140 },
          { prop: "post_name", label: "职务", width: 140 },
          { prop: "duty_type", label: "责任类型", width: 140 },
          { prop: "handle_decide", label: "处理方式", width: 140 },
          { prop: "report_status", label: "审核状态", width: 140 },
          {
            label: "操作",
            width: "80",
            formatter: (row) => {
              return (
                <el-button
                  size="mini"
                  type="primary"
                  onClick={this.look.bind(this, row.main_id, 0)}
                >
                  查看
                </el-button>
              );
            },
          },
        ];
        let typeObj = {
            已受理: 1,
            已初步审核和分类处置: 2,
            已核查: 3,
            已处理: 4,
            整改中: 5,
            已结束: 6,
            中止: 7,
          },
          endTypeObj = {
            总数: 0,
            问题查处尚未结束: 1,
            问题查处已结束: 2,
          },
          problemObj = {
            政府审计: 1,
            巡视巡察: 2,
            纪检监察: 3,
            行业监管: 4,
            群众举报: 5,
            国资委监督: 6,
            企业内部监督: 7,
            其他: 8,
          };
        let postData = {
          orgId: this.clickTreeData.id || null, //企业id(不传则默认当前企业)
          startTime: this.timer[0], //受理开始时间：时间戳（毫秒）
          endTime: this.timer[1], //	受理结束时间：时间戳（毫秒）
          isContain: this.isContainNum,
          // 状态类型(1已受理 2已初步审核和分类处置 3已核查 4已处理 5整改中 6已结束 7中止)	query	false
          // type: typeObj[type],
          // endType: endTypeObj[endType] || null, //完结情况类型(0总数 1未结束 2已结束)
          //问题线索来源(1国资系统外部监督部门 2市国资委 3企业内部监督部门 4上级移交或资企业报告 5信访、举报 6其它)
          // problemType: problemObj[problemType] || null, //完结情况类型(1未结束 2已结束)
        };
        type ? (postData.type = typeObj[type]) : "";
        endType ? (postData.endType = endTypeObj[endType]) : "";
        problemType ? (postData.problemType = problemObj[problemType]) : "";
        let { rCode, results: data } = await http.getDetail(postData);
        this.tableLoading = false;
        if (rCode == 0) {
          let mergeNum = 1, //记录总合并值
            sameNum = 0, //记录需要被写入合并值大于1的数组下标 默认0被记录
            lastRow = {}; //上一次被循环的对象  跟当前做对比
          for (let i = 0; i < data.length; i++) {
            if (i === 0) {
              lastRow = data[i];
              if (data.length === 1) {
                data[0].mergeNum = 1; //不需要合并
              }
              continue;
            }
            if (lastRow.main_id == data[i].main_id) {
              mergeNum++;
              //处理最后一个
              if (i == data.length - 1) {
                data[sameNum].mergeNum = mergeNum;
                break;
              }
              data[i].mergeNum = 0; //需要被合并

              continue;
            } else {
              data[sameNum].mergeNum = mergeNum; //设置上一个
              data[i].mergeNum = 1; //不需要合并
              // mergeNum > 1 && (data[sameNum].mergeNum = mergeNum);
              lastRow = data[i];
              mergeNum = 1;
              sameNum = i;
            }
          }
          this.tableData = data;
        } else {
          this.tableData = [];
        }
      } catch (error) {
        this.tableData = [];
        this.tableLoading = false;
        // this.$message.error(error)
        console.log(">>>error", error);
      }
    },
    //下属企业风险提示通报情况 详情
    async getRiskDetail(type, orgId) {
      try {
        this.showDialog = true;
        this.tableLoading = true;
        this.needMerge = false;
        this.dialogTitle = (type || endType) + "详情";
        this.column = [
          { prop: "issue_time", label: "发文日期", width: 140 },
          { prop: "issue_number", label: "文号", width: 140 },
          { prop: "types", label: "监督类型", width: 140 },
          { prop: "issue_org_name", label: "业务处室", width: 140 },
          { prop: "tips_org_name", label: "监督对象" },
          {
            prop: "item_overview",
            label: "提示、通报或约谈事项概述",
            width: 220,
          },
          { prop: "create_time", label: "工作方案报送时间", width: 200 },
          { prop: "report_times", label: "定期报告情况", width: 160 },
          { prop: "report_time", label: "办结报告报送时间", width: 140 },
          { prop: "result", label: "业务处室评估情况", width: 140 },
          { prop: "is_true", label: "是否销账", width: 140 },
          {
            label: "操作",
            width: "80",
            formatter: (row) => {
              return (
                <el-button
                  size="mini"
                  type="primary"
                  onClick={this.look.bind(this, row.id, 1)}
                >
                  查看
                </el-button>
              );
            },
          },
        ];
        let typeObj = {
          总数: 0,
          提示函: 1,
          通报: 2,
          责任约谈: 3,
        };
        let { rCode, results } = await http.getRiskDetail({
          orgId: this.clickTreeData.id || null, //企业id(不传则默认当前企业)
          startTime: this.timer[0] || null, //受理开始时间：时间戳（毫秒）
          endTime: this.timer[1] || null, //	受理结束时间：时间戳（毫秒）
          // 1提示函 2通报 3责任约谈
          type: typeObj[type] ?? null,
        });
        this.tableLoading = false;

        if (rCode == 0) {
          this.tableData = results;
        } else {
          this.tableData = [];
        }
      } catch (error) {
        this.tableLoading = false;
        this.tableData = [];
        // this.$message.error(error)
        console.log(">>>error", error);
        getDetail;
      }
    },

    pie1Fn() {
      this.destroyEcharts(pieChart1);

      // let text = 2000
      let text = this.pie1Data.reduce((item, next) => {
        return item + next.value;
      }, 0);
      text += "";
      pieChart1 = this.$echarts.init(document.getElementById("pie1"));
      let option = {
        title: {
          text,
          left: "center",
          top: "center",
          textStyle: {
            color: "#188BFF",
            fontWeight: "bold",
            fontSize: 24,
          },
        },
        tooltip: {
          trigger: "item",
        },
        // legend: {
        //   width: "46%",
        //   top: "30%",
        //   right: 32,
        // },
        color: [
          "#44DE9E",
          "#40EDFF",
          "#FE6562",
          "#9271FE",
          "#FFD14C",
          "#5FA9F8",
          "#fc8452",
          "#9a60b4",
          "#ea7ccc",
        ],
        series: [
          {
            type: "pie",
            center: ["50%", "50%"],
            radius: ["50%", "80%"],
            colorBy: "data", //自定义取色盘取色
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 2,
              borderColor: "#fff",
              borderWidth: 2,
            },
            label: {
              show: false,
              position: "center",
            },
            //圆环中间显示内容
            // emphasis: {
            //   label: {
            //     show: true,
            //     fontSize: "40",
            //     fontWeight: "bold",
            //   },
            // },
            labelLine: {
              show: false,
            },
            data: this.pie1Data,
          },
        ],
      };
      //给柱子添加点击事件——————————————————————
      let _this = this;
      // console.log('>>>pieChart1',pieChart1);
      pieChart1.on("click", function (params) {
        _this.getDetail(params.name);
      });
      //-----------------------------
      option && pieChart1.setOption(option);
      window.addEventListener("resize", () => {
        pieChart1.resize();
      });
    },
    line1Fn() {
      this.destroyEcharts(line1Chart);
      line1Chart = this.$echarts.init(document.getElementById("line1"));
      let option;
      option = {
        grid: {
          top: "13%",
          left: "3%",
          right: "3%",
          bottom: "0%",
          containLabel: true,
        },
        // tooltip: {
        //   trigger: "axis",
        //   formatter: function (val) {
        //     val = val[0];
        //     let res = `<div>${val.name}：<span style="color:#188BFF;margin-left:10px">${val.value}个</span></div>`;
        //     return res;
        //   },
        // },
        xAxis: {
          type: "category",
          boundaryGap: true, //坐标轴两边留白策略
          //坐标轴刻度相关设置
          axisTick: {
            show: false,
          },
          //刻度标签相关
          axisLabel: {
            interval: 0, //表示『隔x个标签显示x个标签』不设置文字太长会自动影藏

            margin: 20,
            color: "#333333",
            fontSize: 12,
            width: 70,
            overflow: "break", //truncate=... break=换行
            rotate: 45,
          },
          data: this.lineData1.xData,
          // data: [
          //   "国资系统外部监督部门",
          //   "市国资委",
          //   "企业内部监督部门",
          //   "上级移交或子企业报告",
          //   "信访",
          //   "举报",
          //   "其他",
          // ],
        },
        yAxis: {
          type: "value",
          name: "单位：个",
        },
        series: [
          {
            data: this.lineData1.sData,
            // data: [20, 46, 40, 30, 49, 20, 10],
            type: "line",
            // showSymbol: false, //曲线上的点只在鼠标移入时展示
            smooth: true, //启动平滑曲线
            //折线图填充面
            areaStyle: {
              opacity: 0.8,
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "rgb(165,207,250)",
                },
                {
                  offset: 1,
                  color: "rgb(236,247,255)",
                },
              ]),
            },
            label: {
              show: true,
              position: "top",
              color: "#295CB7",
              //  formatter: function (params) {
              //   return `${params.value}个`;
              // },
            },
          },
        ],
      };
      //给柱子添加点击事件——————————————————————
      let _this = this;
      line1Chart.on("click", function (params) {
        console.log(">>>params", params);
        // let type = params.seriesName.substr(params.seriesName.length - 3);
        // return;
        _this.getDetail(null, null, params.name);
      });
      //-----------------------------

      option && line1Chart.setOption(option);
      window.addEventListener("resize", () => {
        line1Chart.resize();
      });
    },

    pie2Fn() {
      this.destroyEcharts(pieChart2);
      pieChart2 = this.$echarts.init(document.getElementById("pie2"));
      let option = {
        color: ["#FF941F", "#FFF8EC"], //圆环两色
        //  color :[],//圆环两色
        // 标题组件，包含主标题和副标题
        title: {
          show: true,
          text: "问题查处尚未结束",
          x: "center",
          bottom: 20,
          textStyle: {
            fontSize: "16",
            color: "#333",
            fontWeight: 400,
          },
        },
        // //  提示框组件
        // tooltip: {
        //   show: false,
        //   // 触发类型: item:数据项触发，axis：坐标轴触发
        //   trigger: "item",
        //   formatter: "{a} <br/>{b}: {c} ({d}%)",
        // },
        // 系列列表。每个系列通过 type 决定自己的图表类型
        series: [
          {
            // 系列名称，用于tooltip的显示，legend 的图例筛选，在 setOption 更新数据和配置项时用于指定对应的系列。
            name: "任务进度",
            type: "pie",
            // 饼图的半径，数组的第一项是内半径，第二项是外半径
            radius: ["60%", "70%"],
            center: ["50%", "40%"],
            // 是否启用防止标签重叠策略，默认开启
            avoidLabelOverlap: false,
            // hoverAnimation: false,
            // 标签的视觉引导线样式，在 label 位置 设置为'outside'的时候会显示视觉引导线
            // labelLine: {
            //   normal: {
            //     show: false,
            //   },
            // },
            data: [
              {
                // 数据值
                value: this.pie2Data,
                // 数据项名称
                name: "问题查处尚未结束",
                //该数据项是否被选中
                selected: false,
                // 单个扇区的标签配置
                label: {
                  // normal: {
                  // 是显示标签
                  show: true,
                  position: "center",
                  fontSize: 30,
                  fontWeight: "bold",
                  // 标签内容格式器，支持字符串模板和回调函数两种形式，字符串模板与回调函数返回的字符串均支持用 \n 换行
                  formatter: "{c}",
                  // },
                },
              },
              {
                value: this.pie23Alldata - this.pie2Data,
                name: "",

                label: {
                  // normal: {
                  show: false,
                  // },
                },
              },
            ],
          },
        ],
      };
      //给柱子添加点击事件——————————————————————
      let _this = this;
      pieChart2.on("click", function (params) {
        // console.log('>>>pieChart2',params);
        if (!params.name) return; //点击虚色进度条不处理
        _this.getDetail(null, params.name);
      });
      //-----------------------------
      pieChart2.setOption(option);
      window.addEventListener("resize", () => {
        pieChart2.resize();
      });
    },
    pie3Fn() {
      this.destroyEcharts(pieChart3);
      pieChart3 = this.$echarts.init(document.getElementById("pie3"));
      let option = {
        color: ["#1285FF", "#E7F3FF"], //圆环两色
        //  color :[],//圆环两色
        // 标题组件，包含主标题和副标题
        title: {
          show: true,
          text: "问题查处已结束",
          x: "center",
          bottom: 20,
          textStyle: {
            fontSize: "16",
            color: "#333",
            fontWeight: 400,
          },
        },
        // //  提示框组件
        // tooltip: {
        //   show: false,
        //   // 触发类型: item:数据项触发，axis：坐标轴触发
        //   trigger: "item",
        //   formatter: "{a} <br/>{b}: {c} ({d}%)",
        // },
        // 系列列表。每个系列通过 type 决定自己的图表类型
        series: [
          {
            // 系列名称，用于tooltip的显示，legend 的图例筛选，在 setOption 更新数据和配置项时用于指定对应的系列。
            name: "任务进度",
            type: "pie",
            // 饼图的半径，数组的第一项是内半径，第二项是外半径
            radius: ["60%", "70%"],
            center: ["50%", "40%"],
            // 是否启用防止标签重叠策略，默认开启
            avoidLabelOverlap: false,
            // hoverAnimation: false,
            // 标签的视觉引导线样式，在 label 位置 设置为'outside'的时候会显示视觉引导线
            // labelLine: {
            //   normal: {
            //     show: false,
            //   },
            // },
            data: [
              {
                // 数据值
                value: this.pie3Data,
                // 数据项名称
                name: "问题查处已结束",
                //该数据项是否被选中
                selected: false,
                // 单个扇区的标签配置
                label: {
                  // normal: {
                  // 是显示标签
                  show: true,
                  position: "center",
                  fontSize: 30,
                  fontWeight: "bold",
                  // 标签内容格式器，支持字符串模板和回调函数两种形式，字符串模板与回调函数返回的字符串均支持用 \n 换行
                  formatter: "{c}",
                  // },
                },
              },
              {
                value: this.pie23Alldata - this.pie3Data,
                name: "",
                label: {
                  // normal: {
                  show: false,
                  // },
                },
              },
            ],
          },
        ],
      };
      //给柱子添加点击事件——————————————————————
      let _this = this;
      // console.log('>>>pieChart1',pieChart1);
      pieChart3.on("click", function (params) {
        if (!params.name) return;
        _this.getDetail(null, params.name);
      });
      //-----------------------------
      pieChart3.setOption(option);
      window.addEventListener("resize", () => {
        pieChart3.resize();
      });
    },

    barFn1() {
      this.destroyEcharts(barChart1);
      barChart1 = this.$echarts.init(document.getElementById("bar1"));
      let option = {
        grid: {
          top: "8%",
          left: "3%",
          right: "1%",
          bottom: "0%",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          //坐标轴刻度相关设置
          axisTick: { show: false },
          //坐标轴轴线相关设置
          axisLine: { show: false },
          axisLabel: {
            interval: 0, //表示『隔x个标签显示x个标签』不设置文字太长会自动影藏
            margin: 20,
            color: "#333333",
            fontSize: 12,
            width: 76,
            overflow: "break", //truncate=... break=换行
            rotate: 45,
          },
          data: this.bar1Data.xData,
          // data: [
          //   "集团管控 ",
          //   "购销管理",
          //   "工程承包建设",
          //   "转让产权、上市公司股权和资产",
          //   "固定资产投资",
          //   "投资并购",
          //   "改组改制",
          // ],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: this.bar1Data.sData,
            // data: [120, 200, 150, 80, 70, 110, 130],
            type: "bar",
            barWidth: 24,
            label: {
              show: true,
              color: "#37A0FD",
              // color: "#fff",
              position: "top",
              // padding: [10, 0, 0, 0],
            },
            //图形样式。
            itemStyle: {
              color: "#37A0FD",
              borderRadius: [16, 16, 0, 0], //（顺时针左上，右上，右下，左下）
            },
          },
        ],
      };
      option && barChart1.setOption(option);
      window.addEventListener("resize", () => {
        barChart1.resize();
      });
    },
    barFn2() {
      this.destroyEcharts(barChart2);
      let dataAll = this.barData2.noEnd.map((item, index) => {
        return {
          orgId: item.orgId,
          value: item.value + this.barData2.end[index].value,
        };
      });
      barChart2 = this.$echarts.init(document.getElementById("bar2"));
      let option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow", // 'shadow' as default; can also be 'line' or 'shadow'
          },
        },
        legend: {
          right: 16,
          top: 16,
          itemWidth: 8,
          itemHeight: 8,
          textStyle: {
            color: "#676767",
          },
        },
        grid: {
          top: "20%",
          left: "3%",
          right: "1%",
          bottom: "5%",
          containLabel: true,
        },
        yAxis: {
          type: "value",
        },
        xAxis: {
          type: "category",
          axisTick: { show: false },
          //坐标轴轴线相关设置
          axisLine: { show: false },
          axisLabel: {
            interval: 0, //表示『隔x个标签显示x个标签』不设置文字太长会自动影藏
            margin: 20,
            color: "#333333",
            fontSize: 12,
            width: 76,
            // width: this.barData2.xData.length > 15 ? 50 : 60,
            overflow: "break", //truncate=... break=换行
            rotate: 45,
          },
          data: this.barData2.xData,
        },
        series: [
          {
            //总数柱子  用来展示堆叠总数
            type: "bar",
            barWidth: 30,

            name: "总数",
            //在高亮图形时 其他轴的效果
            emphasis: {
              focus: "series",
            },
            //图形中的文字
            label: {
              show: true,
              position: "top",
              color: "#333333",
            },
            //图形样式。
            // itemStyle: {
            //   color: "red",
            // },
            barGap: "-100%",
            data: dataAll,
          },
          {
            name: "问题查处已结束",
            type: "bar",
            stack: "total",
            barWidth: 30,

            emphasis: {
              focus: "series",
            },
            //图形中的文字
            label: {
              show: true,
              color: "#fff",
            },
            //图形样式。
            itemStyle: {
              color: "#37A0FD",
            },
            data: this.barData2.end,
          },
          {
            name: "问题查处尚未结束",
            type: "bar",
            barWidth: 30,
            stack: "total", //数据堆叠  同名的堆叠
            label: {
              show: true,
            },
            emphasis: {
              focus: "series",
            },
            label: {
              show: true,
              color: "#666",
            },
            itemStyle: {
              color: "#FF911C",
            },
            data: this.barData2.noEnd,
          },
        ],
        //横向滚动条
        dataZoom: [
          {
            type: "slider",
            show: false,
            show: this.barData2.xData.length > 15 ? true : false, //超过15个展示
            moveHandleSize: 14, //移动手柄的尺寸高度。
            height: 10, //移动手柄下的可视化框高度
            // show: true,
            handleSize: 30, // 滑动条的 左右2个滑动条的大小
            left: "4%", //滚动条靠左侧的百分比
            right: "4%", //滚动条靠左侧的百分比
            bottom: 14,
            handleColor: "#ddd", // h滑动图标的颜色
            art: 0, //滚动条的起始位置
            end: 40,
            end: this.barData2.xData.length > 15 ? 40 : 100,
            moveHandleStyle: { color: "#295CB7" },
          },
        ],
      };
      //给柱子添加点击事件——————————————————————
      let _this = this;
      barChart2.on("click", function (params) {
        let type = params.seriesName;
        // console.log(">>>", params.seriesName, params.data.orgId, type);
        // return;
        _this.getDetail(null, type, null, params.data.orgId);
      });
      //-----------------------------
      option && barChart2.setOption(option);
      window.addEventListener("resize", () => {
        barChart2.resize();
      });
    },
    barFn3() {
      this.destroyEcharts(barChart3);

      // let data1 = [80, 90, 70, 60, 80, 30, 60, 90, 70, 60, 80, 30, 60, 90, 30],
      //   data2 = [30, 30, 30, 40, 40, 40, 20, 20, 20, 20, 50, 50, 50, 30, 30];
      let dataAll = this.barData3.seriesData1.map((item, index) => {
        return {
          orgId: item.orgId,
          value:
            item.value +
            this.barData3.seriesData2[index].value +
            this.barData3.seriesData3[index].value,
        };
      });
      barChart3 = this.$echarts.init(document.getElementById("bar3"));
      let option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // Use axis to trigger tooltip
            type: "shadow", // 'shadow' as default; can also be 'line' or 'shadow'
          },
        },
        legend: {
          right: 16,
          top: 16,
          itemWidth: 8,
          itemHeight: 8,
          textStyle: {
            color: "#676767",
          },
        },
        grid: {
          top: "20%",
          left: "3%",
          right: "1%",
          bottom: "5%",
          containLabel: true,
        },
        yAxis: {
          type: "value",
        },
        xAxis: {
          type: "category",
          axisTick: { show: false },
          //坐标轴轴线相关设置
          axisLine: { show: false },
          axisLabel: {
            interval: 0, //表示『隔x个标签显示x个标签』不设置文字太长会自动影藏
            margin: 20,
            color: "#333333",
            fontSize: 12,
            width: 76,
            // width: this.barData2.xData.length > 15 ? 50 : 60,
            overflow: "break", //truncate=... break=换行
            rotate: 45,
          },
          data: this.barData3.xData,
        },
        series: [
          {
            //总数柱子  用来展示堆叠总数
            type: "bar",
            barWidth: 30,
            name: "总数",
            label: {
              show: true,
            },
            //在高亮图形时 其他轴的效果
            emphasis: {
              focus: "series",
            },
            //图形中的文字
            label: {
              show: true,
              position: "top",
              color: "#333333",
            },
            //图形样式。
            // itemStyle: {
            //   color: "red",
            // },
            barGap: "-100%",
            data: dataAll,
          },
          {
            name: "提示函",
            type: "bar",
            stack: "total",
            barWidth: 30,

            emphasis: {
              focus: "series",
            },
            //图形中的文字
            label: {
              show: true,
              color: "#fff",
            },
            //图形样式。
            itemStyle: {
              color: "#478CE8",
            },
            data: this.barData3.seriesData1,
          },
          {
            name: "通报",
            type: "bar",
            barWidth: 30,
            stack: "total", //数据堆叠  同名的堆叠
            label: {
              show: true,
            },
            emphasis: {
              focus: "series",
            },
            label: {
              show: true,
              color: "#666",
            },
            itemStyle: {
              color: "#FE808E",
            },
            data: this.barData3.seriesData2,
          },
          {
            name: "责任约谈",
            type: "bar",
            barWidth: 30,
            stack: "total", //数据堆叠  同名的堆叠
            label: {
              show: true,
            },
            emphasis: {
              focus: "series",
            },
            label: {
              show: true,
              color: "#666",
            },
            itemStyle: {
              color: "#4DFAE0",
            },
            data: this.barData3.seriesData3,
          },
        ],
        //横向滚动条
        dataZoom: [
          {
            type: "slider",
            show: false,
            show: this.barData3.xData.length > 15 ? true : false, //超过15个展示
            moveHandleSize: 14, //移动手柄的尺寸高度。
            height: 10, //移动手柄下的可视化框高度
            // show: true,
            handleSize: 30, // 滑动条的 左右2个滑动条的大小
            left: "4%", //滚动条靠左侧的百分比
            right: "4%", //滚动条靠左侧的百分比
            bottom: 14,
            handleColor: "#ddd", // h滑动图标的颜色
            art: 0, //滚动条的起始位置
            end: 40,
            end: this.barData3.xData.length > 15 ? 40 : 100,
            moveHandleStyle: { color: "#295CB7" },
          },
        ],
      };
      //给柱子添加点击事件——————————————————————
      let _this = this;
      barChart3.on("click", function (params) {
        // console.log(">>>", params.seriesName, params.data.orgId);
        // return;
        _this.getRiskDetail(params.seriesName, params.data.orgId);
      });
      //-----------------------------

      option && barChart3.setOption(option);
      window.addEventListener("resize", () => {
        barChart3.resize();
      });
    },
    look(id, index) {
      // console.log(">>>row.id", id);
      // return;
      const urlArr = [
        "/cdgzw/jdzzWtxsglMain/view.dhtml",
        "/cdgzw/jdzzFxtstb/reportView.dhtml",
      ];
      // console.log(">>>", row);
      let url = `${urlArr[index]}?id=${id}`;
      // let url = `/cdgzw/jdzzWtxsglMain/view.dhtm?id=${row.id}`;
      this.iframeUrl = url;
      // this.iframeUrl = 'https://test.cdgzjg.cn/cdgzw/jdzzWtxsglMain/standingList.dhtml';
      this.showList = false;
    },
  },
};
</script>

<style lang="less">
@import "./css/app.less";
</style>
