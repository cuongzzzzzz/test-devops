const SuccessResponse = require("../cores/successResponse");
const {
  addProduct,
  updateProduct,
  getOneProduct,
  getAllProduct,
  deletePro
} = require("../services/product.service");

class ProductaController {
  addProduct = async (req, res) => {
    return new SuccessResponse({
      message: "tao san pham thanh cong",
      metadata: await addProduct(req.body),
    }).send(res);
  };
  updateProduct = async (req, res) => {
    const id = req.params.id;
    return new SuccessResponse({
      message: "update san pham thanh cong",
      metadata: await updateProduct(req.body, id),
    }).send(res);
  };
  getAll = async (req, res) => {
    return new SuccessResponse({
      message: "get tat ca san pham thanh cong",
      metadata: await getAllProduct(),
    }).send(res);
  };
  getOne = async (req, res) => {
    const id = req.params.id;

    return new SuccessResponse({
      message: "get san pham thanh cong",
      metadata: await getOneProduct(id),
    }).send(res);
  };
  deletePro = async (req, res) => {
    const id = req.params.id;

    return new SuccessResponse({
      message: "xoa san pham thanh cong",
      metadata: await deletePro(id),
    }).send(res);
  };
}
module.exports = new ProductaController();
