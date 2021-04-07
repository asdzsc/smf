"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.templateInfo = templateInfo;
exports.getMemoryColumnList = getMemoryColumnList;
exports.memoryList = memoryList;
exports.getMemoryInfo = getMemoryInfo;
exports.memoryMediaList = memoryMediaList;

var _request = _interopRequireDefault(require("@/pages/mobile/libs/request"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// 获取模版详情
function templateInfo(param) {
  return (0, _request["default"])({
    url: "/web-api/memory/template/templateInfo",
    method: "post",
    data: param
  });
} // 获取查看纪念馆栏目列表


function getMemoryColumnList(param) {
  return (0, _request["default"])({
    url: "/web-api/website/memory/column/getMemoryColumnList",
    method: "post",
    data: param
  });
} // 前端展示纪念馆列表


function memoryList(param) {
  return (0, _request["default"])({
    url: "/web-api/website/memory/info/memoryList",
    method: "post",
    data: param
  });
} // 个人纪念馆详情


function getMemoryInfo(param) {
  return (0, _request["default"])({
    url: "/web-api/website/memory/info/getMemoryInfo",
    method: "post",
    data: param
  });
} //  个人纪念馆附件列表  


function memoryMediaList(param) {
  return (0, _request["default"])({
    url: "/web-api/website/memory/info/memoryMediaList",
    method: "post",
    data: param
  });
}