const { mongo, default: mongoose } = require("mongoose");
const productModel = require("../models/product.model");

const { removeNullValueUpdate, updateNestedObject } = require("../utils");

const addProduct = async ({
  product_name,
  product_thumb,
  product_desciption,
  product_price,
  product_quantity,
  product_type,

  product_attributes,
}) => {
  const newProduct = await productModel.create({
    product_name,
    product_thumb,
    product_desciption,
    product_price,
    product_quantity,
    product_type,

    product_attributes,
  });
  if (!newProduct) throw new Error("tao san pham khong thanh cong");
  return newProduct;
};
const updateProduct = async (data, id) => {
  const objectParams = removeNullValueUpdate(data);
  //kie mtra san pham co ton tai ?
  const product = await productModel.findOne({
    _id: id,
  });
  if (!product) throw new Error(" san pham khong ton tai");
  const updateBody = updateNestedObject(objectParams);
  const updateProduct = await productModel.findOneAndUpdate(
    { _id: id },
    updateBody,
    { new: true }
  );
  if (!updateProduct) throw new Error("update khong thanh cong");
  return updateProduct;
};
const getAllProduct = async () => {
  const products = await productModel.find({}).lean();
  if (!products) throw new Error("khong co san pham phu hop");
  return products;
};
const getOneProduct = async (id) => {
  const product = await productModel.findOne({
    _id: id,
  });
  if (!product) throw new Error("san pham khong ton tai");
  return product;
};
const deletePro = async (id) => {
  const deleteProduct = productModel.findOneAndDelete({
    _id: id,
  });

  return deleteProduct;
};
module.exports = {
  addProduct,
  updateProduct,
  getAllProduct,
  getOneProduct,
  deletePro,
};
