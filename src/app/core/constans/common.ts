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
  deleteProduct: rootUrl + '/api/product/', //+id sản phẩm',
  getListDeleted: rootUrl + '/api/deleted/product', ///lấy danh sách sản phẩm đã xóa
  //TODO tạo get sản phẩm theo category
  getProductByCategory: rootUrl + '/api/{id}/prodcut'
};

export const categoryAPI = {
  getAll: rootUrl + '/api/categories',
  createCate: rootUrl + '/api/category',


};
export const fileAPI = {
  uploadFile: rootUrl + '/api/uploadfile',
  dowloadFile: rootUrl + '/api/dowloadfile/' // +đường dẫn file
};
