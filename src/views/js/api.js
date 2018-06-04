/* bailu 接口API */
const root = process.env.API_ROOT;// 接口前缀地址

const api = {
  login: `${root}login`,
  log:`${root}rest/request-log/index`,
  checkAuth: `https://singer.tdf.ministudy.com/rest/user/weixin-is-auth`,
  getDeviceId: `${root}rest/user/get-device-id`,
  getSign:`${root}rest/weixin/sign?url=yourUrl`,
  getAttention:`${root}rest/weixin/tdf-services`,
  getUserme:`${root}rest/user/me`,
  getCourse:`${root}rest/mom/courses`,
  getPhone:`${root}rest/application/save-user-form`,
  getProductRoutes:`${root}rest/application/product-routes`,
	getProductConst:`${root}rest/application/base?productRouteConst=`
};
exports.api = api;
