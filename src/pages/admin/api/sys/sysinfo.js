import request from "@/pages/admin/libs/request";

// 获取系统信息
export function env() {
  return request({
    url: "/api/sysinfo/env",
    method: "post"
  });
}
