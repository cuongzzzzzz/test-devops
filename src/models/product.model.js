const mongoose = require("mongoose");
const { default: slugify } = require("slugify");

const COLLECTION_NAME = "Product";
const DOCUMENT_NAME = "Products";

const productSchema = new mongoose.Schema(
  {
    product_name: {
      type: String,
      required: true,
    },
    product_thumb: {
      type: String,
      required: true,
    },
    product_slug: {
      type: String,
    },
    product_description: {
      type: String,
    },
    product_quantity: {
      type: Number,
      required: true,
    },
    product_price: {
      type: Number,
      required: true,
    },
    product_rating_average: {
      type: Number,
      default: 4.5,
      min: 1,
      max: 5,
      set: (val) => {
        Math.round(val * 10) / 10;
      },
    },
    product_type: {
      type: String,
      enum: ["furniture"],
      required: true,
    },
    product_attributes: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
    isDraft: {
      type: Boolean,
      default: true,
      select: false,
    },
    isPublish: {
      type: Boolean,
      default: false,
      select: false,
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

productSchema.index({ product_name: "text", prodcut_descriptio: "text" });
productSchema.pre("save", function (next) {
  this.product_slug = slugify(this.product_name, { lower: true });
  next();
});

module.exports = new mongoose.model(DOCUMENT_NAME, productSchema);
