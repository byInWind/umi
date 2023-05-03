import { defineConfig } from "umi";

export default defineConfig({
  routes: [
    { path: "/", component: "index/index" },
    { path: "vip/android", component: "2021/vip-buy-android/index" },
  ],
  npmClient: 'yarn',
});
