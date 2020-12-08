import store from "@/store";

// 获取module item
export function getModuleItem(id) {
  var moduleList = store.state.adminSetting.moduleList;
  var query = moduleList.filter(x => x.id === id);
  if (query.length > 0) {
    return query[0];
  } else {
    return null;
  }
}
