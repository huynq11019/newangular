const rootUrl = 'http://localhost:8099';
export const authAPi = {
  loigin: rootUrl + '/api/authenticate',
  getUserInfor: rootUrl + '/api/account/getinfor',
  getAll: rootUrl + '/api/admin/account/getlist',
  updateAccount: rootUrl + '/api/admin/account/update',
  regiter: rootUrl + '/api/register'
};
export const productApi = {
  getPage: rootUrl + '/api/products',
  getProduct: rootUrl + '/api/product/',  //+id sản phẩm
  createProduct: rootUrl + '/api/product',
  deleteProduct: rootUrl  + '/api/product/', //+id sản phẩm',
  getListDeleted: rootUrl + '/api/deleted/product' ///lấy danh sách sản phẩm đã xóa
};

