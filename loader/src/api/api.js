import request from "./index.js";
// import {BASE_URL} from '../../config/url'

export default {
  //问题线索查处状态
  questionQueryState(params) {
    return request({
      url: `/cdgzw/jdzzWtxsglMainServiceApi/findWtxscczt.dhtml`,
      method: "get",
      params,
    });
  },
  //问题线索查处状态卡片版本
  questionQueryStateCard(params) {
    return request({
      url: `/cdgzw/jdzzWtxsglMainServiceApi/findProblemCount.dhtml`,
      method: "get",
      params,
    });
  },
    //问题线索来源
    questionSource(params) {
      return request({
        url: `/cdgzw/jdzzWtxsglMainServiceApi/findWtxsly.dhtml`,
        method: "get",
        params,
      });
    },
  //问题线索查处完结状况
  questionEndState(params) {
    return request({
      url: `/cdgzw/jdzzWtxsglMainServiceApi/findWtxsccwjzk.dhtml`,
      method: "get",
      params,
    });
  },
  
  //问题线索类型分布
  questionBranch(params) {
    return request({
      url: `/cdgzw/jdzzWtxsglMainServiceApi/findWtxslxfb.dhtml`,
      method: "get",
      params,
    });
  },

  //下属企业问题线索受理和查处情况
  subordinateState(params) {
    return request({
      url: `/cdgzw/jdzzWtxsglMainServiceApi/findXsqywtxsslhccqk.dhtml`,
      method: "get",
      params,
    });
  },
  //下属企业风险提示通报情况
  subordinateRisk(params) {
    return request({
      url: `/cdgzw/jdzzWtxsglMainServiceApi/findXsqyfxtstbqk.dhtml`,
      method: "get",
      params,
    });
  },
  //问题线索查处状态”
  getStateDetail(params) {
    return request({
      url: `/cdgzw/jdzzWtxsglMainServiceApi/getProblemCountDetailList.dhtml`,
      method: "get",
      params,
    });
  },
  //“问题线索来源”、“问题线索查处完结状态”、“下属企业问题线索受理和查处情况
  getDetail(params) {
    return request({
      url: `/cdgzw/jdzzWtxsglMainServiceApi/getProblemClueDetailList.dhtml`,
      method: "get",
      params,
    });
  },
  //下属企业风险提示通报情况详情
  getRiskDetail(params) {
    return request({
      url: `/cdgzw/jdzzWtxsglMainServiceApi/getRiskTipsDetailList.dhtml`,
      method: "get",
      params,
    });
  },
  //通知公告
  getNotice(params) {
    return request({
      url: `/cms/information/cdgzwlistjson.dhtml`,
      method: "get",
      params,
    });
  },


  getTreeParams() {
    return request({
      url: `/cdgzw/jdzzWtxsglMainServiceApi/getCompanyId.dhtml`,
      method: "get",
    });
  },
  getTree(params) {
    return request({
      // url: `/sys/v1/mecpSys/getOrgMainTree.dhtml`,
      url: `/sys/v1/mecpSys/getSelectorOrgTree.dhtml`,
      method: "get",
      params,
    });
  },
  getjson(params) {
    return request({
      // url: `/sys/v1/mecpSys/getOrgMainTree.dhtml`,
      url: `../list.json`,
      method: "get",
      params,
    });
  },
  //字典查询
  getDict(params) {
    return request({
      url: `/sys/v1/mecpSys/findSysCode.dhtml`,
      method: "get",
      params,
    });
  },
  // getTree(id) {
  //   return request({
  //     url: `/cdgzw/syspublic/getOrgMainTree.dhtml?showarea=0&nocheck=true&requestbusinessSubCentercode=business_jdzz_wtxsgl_business_center_code&synchro=true&levels=2&showlevelsub=true&id=${id}&pvd=true&isroot=true`,
  //     method: "get",
  //   //   params,
  //   });
  // },
  //    //问题线索查处状态
  //    auditId(data) {
  //      return request({
  //        url: `/admin/annualReviewLog`,
  //        method: "POST",
  //        data
  //      });
  //    },
};
