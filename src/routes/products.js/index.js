const express = require("express");
const productController = require("../../controllers/product.controller");
const { asyncHandler } = require("../../utils");

const router = express.Router();

router.post("/", asyncHandler(productController.addProduct));
router.patch("/:id", asyncHandler(productController.updateProduct));
router.get("/", asyncHandler(productController.getAll));
router.get("/:id", asyncHandler(productController.getOne));
router.delete("/:id", asyncHandler(productController.deletePro));

module.exports = router;

