// 埋点事件

// 打开会员页
export const predefinePageview = () => {
  window.collectEvent('predefine_pageview')
}

// 点击会员购买价格按钮-前端
export const VIPPurchaseForWebPriceButtonClick = () => {
  window.collectEvent('VIPPurchaseForWebPriceButtonClick')
}

// // 点击会员购买价格按钮-前端
// export const VIPPurchaseForWebPriceButtonClick = () => {
//   window.collectEvent('VIPPurchaseForWebPriceButtonClick')
// }
