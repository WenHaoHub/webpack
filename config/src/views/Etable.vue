<template>
  <div>
    <!-- <el-table
      :data="tableData"
      :span-method="arraySpanMethod"
      border
      style="width: 100%"
    >
      <el-table-column prop="id" label="ID" width="180"> </el-table-column>
      <el-table-column prop="name" label="姓名"> </el-table-column>
      <el-table-column prop="amount1" sortable label="数值 1">
      </el-table-column>
      <el-table-column prop="amount2" sortable label="数值 2">
      </el-table-column>
      <el-table-column prop="amount3" sortable label="数值 3">
      </el-table-column>
    </el-table> -->

    <el-table
      :data="tableData"
      border
      :height="tableHeight"
      style="width: 100%"
      :span-method="needMerge ? objectSpanMethod : function(){}"
    >
      <el-table-column label="预警" align="center" v-if="showEarly">
        <template slot-scope="scope">
          <el-tooltip
            effect="dark"
            :content="scope.row.warnContent"
            placement="top"
          >
          <!-- <el-tooltip
            effect="dark"
            :content="tooltip[scope.row.early]"
            placement="top"
          > -->
            <img
              class="light"
              v-if="scope.row.early == 0"
              :src="require('../img/light.png')"
              alt=""
            />
            <img
              class="light"
              v-else
              :src="require('../img/lightErr.png')"
              alt=""
            />
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column
        v-for="(item, index) in column"
        :fixed="item.fixed"
        :prop="item.prop"
        :label="item.label"
        :width="item.width"
        :formatter="item.formatter"
        :key="index"
        align="center"
        show-overflow-tooltip
      >
      </el-table-column>
      <!-- <el-table-column prop="id" label="ID" width="180"> </el-table-column>
      <el-table-column prop="name" label="预警"> </el-table-column>
      <el-table-column prop="amount1" label="线索编号"> </el-table-column>
      <el-table-column prop="amount2" label="受理时间"> </el-table-column>
      <el-table-column prop="amount3" label="线索来源"> </el-table-column>
      <el-table-column prop="amount3" label="当前线索所在来源">
      </el-table-column>
      <el-table-column prop="amount3" label="当事企业名称"> </el-table-column>
      <el-table-column prop="amount3" label="当事企业级次"> </el-table-column>
      <el-table-column prop="amount3" label="线索管辖级次"> </el-table-column>
      <el-table-column prop="amount3" label="问题线索描述"> </el-table-column>
      <el-table-column prop="amount3" label="追责进度"> </el-table-column>
      <el-table-column prop="amount3" label="违规认定"> </el-table-column>
      <el-table-column prop="amount3" label="损失及不良后果"> </el-table-column>
      <el-table-column label="责任认定及处理情况">
        <el-table-column prop="amount3" label="姓名"> </el-table-column>
        <el-table-column prop="amount3" label="职务"> </el-table-column>
        <el-table-column prop="amount3" label="责任类型"> </el-table-column>
        <el-table-column prop="amount3" label="处理方式"> </el-table-column>
      </el-table-column>
      <el-table-column prop="amount3" label="审核状态"> </el-table-column>
      <el-table-column label="操作">查看 </el-table-column> -->
    </el-table>
  </div>
</template>

<script>
export default {
  props: {
    showEarly: {
      type: Boolean,
      default: true,
    },
    column: {
      type: Array,
      required: true,
    },
    tableData: {
      type: Array,
      required: true,
    },
    needMerge: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      tooltip: [
        "无预警",
        "提示函下发后，10个工作日内未报送相关整改信息",
        "通报下发后，20个工作日内未报送相关整改信息",
      ],
      //   tableData: [
      //     {
      //       id: "12987122",
      //       name: "王小虎",
      //       amount1: "234",
      //       amount2: "3.2",
      //       amount3: 10,
      //     },
      //     {
      //       id: "12987123",
      //       name: "王小虎",
      //       amount1: "165",
      //       amount2: "4.43",
      //       amount3: 12,
      //     },
      //     {
      //       id: "12987124",
      //       name: "王小虎",
      //       amount1: "324",
      //       amount2: "1.9",
      //       amount3: 9,
      //     },
      //     {
      //       id: "12987125",
      //       name: "王小虎",
      //       amount1: "621",
      //       amount2: "2.2",
      //       amount3: 17,
      //     },
      //     {
      //       id: "12987126",
      //       name: "王小虎",
      //       amount1: "539",
      //       amount2: "4.1",
      //       amount3: 15,
      //     },
      //   ],
    };
  },
  computed: {
    tableHeight() {
      // 获取网页内body的高度:document.body.offsetHeight
      return window.document.body.offsetHeight - 350;
    },
  },
  methods: {
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      let arr = ["name", "post_name", "duty_type", "handle_decide"];
      if (!arr.includes(column.property)) {
        if (row?.mergeNum) {
          return {
            rowspan: row?.mergeNum,
            colspan: 1,
          };
        } else {
          return {
            rowspan: 0,
            colspan: 0,
          };
        }
      }
    },
  },
};
</script>
<style scoped lang='less'>
.light {
  width: 26px;
  height: 20px;
}
</style>