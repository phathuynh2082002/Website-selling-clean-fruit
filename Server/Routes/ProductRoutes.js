import express from "express";
import asyncHandler from "express-async-handler";
import Product from "./../Models/ProductModel.js";
import Categorize from "../Models/CategorizeModel.js";
import { admin, protect } from "../Middleware/AuthMiddleware.js";

const productRoute = express.Router();

// GET ALL PRODUCT
productRoute.get(
  "/",
  asyncHandler(async (req, res) => {
    const pageSize = 20;
    const page = Number(req.query.pageNumber) || 1;
    const keyword = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: "i",
          },
        }
      : {};
    const name = req.query.categorize;
    if (name) {
      const categorize = await Categorize.findOne({ name });
      const count = await Product.countDocuments({
        ...keyword,
        categorize: categorize._id,
      });
      const products = await Product.find({
        ...keyword,
        categorize: categorize._id,
      })
        .limit(pageSize)
        .skip(pageSize * (page - 1))
        .sort({ _id: -1 });
      res.json({ products, page, pages: Math.ceil(count / pageSize) });
    } else {
      const count = await Product.countDocuments({ ...keyword });
      const products = await Product.find({ ...keyword })
        .limit(pageSize)
        .skip(pageSize * (page - 1))
        .sort({ _id: -1 });
      res.json({ products, page, pages: Math.ceil(count / pageSize) });
    }
  })
);

// GET ALL PRODUCT ADMIN
productRoute.get(
  "/all",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const products = await Product.find({}).sort({ _id: -1 });
    res.json(products);
  })
);

// GET SINGLE PRODUCT
productRoute.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      const categorize = await Categorize.findById(product.categorize);
      if (categorize) {
        const nameCategorize = categorize.name;
        const unit = categorize.unit;
        res.json({ product, nameCategorize, unit });
      } else {
        res.status(404);
        throw new Error("Loại sản phẩm đã được xóa hoặc thay đổi");
      }
    } else {
      res.status(404);
      throw new Error("Sản phẩm không tồn tại");
    }
  })
);

// PRODUCT REVIEW CREATE
productRoute.post(
  "/:id/review",
  protect,
  asyncHandler(async (req, res) => {
    const { rating, comment } = req.body;
    const product = await Product.findById(req.params.id);

    if (product) {
      const areadlyReviewed = product.reviews.find(
        (r) => r.user.toString() === req.user._id.toString()
      );
      if (areadlyReviewed) {
        res.status(400);
        throw new Error("Sản phẩm đã được đánh giá");
      }
      const review = {
        name: req.user.name,
        rating: Number(rating),
        comment,
        user: req.user._id,
      };

      product.reviews.push(review);
      product.numReviews = product.reviews.length;
      product.rating =
        product.reviews.reduce((acc, item) => item.rating + acc, 0) /
        product.reviews.length;

      await product.save();
      res.status(201).json({ message: "Đánh giá đã được thêm vào" });
    } else {
      res.status(404);
      throw new Error("Sản phẩm không tồn tại");
    }
  })
);

// DELETE PRODUCT
productRoute.delete(
  "/:id",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      await Product.deleteOne(product);
      res.json({ message: "Sản phẩm đã dược xóa" });
    } else {
      res.status(404);
      throw new Error("Sản phẩm không tồn tại");
    }
  })
);

// CREATE PRODUCT
productRoute.post(
  "/",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const { name, categorize, standard, price, description, image, countInStock } =
      req.body;
    const productExist = await Product.findOne({ name });
    const categorizeExist = await Categorize.findOne({ name: categorize });
    if (productExist) {
      res.status(400);
      throw new Error("Tên sản phẩm đã tồnt tại");
    } else if (!categorizeExist) {
      res.status(404);
      throw new Error("Loại sản phẩm không hợp lệ");
    } else {
      const product = new Product({
        name,
        categorize: categorizeExist._id,
        standard,
        price,
        description,
        image,
        countInStock,
        user: req.user_id,
      });
      if (product) {
        const createdProduct = await product.save();
        res.status(201).json(createdProduct);
      } else {
        res.status(400);
        throw new Error("Dữ liệu sản phẩm không hợp lệ");
      }
    }
  })
);

// UPDATE PRODUCT
productRoute.put(
  "/:id",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const { name, categorize, standard, price, description, image, countInStock } =
      req.body;
    const product = await Product.findById(req.params.id);
    const categorizeExist = await Categorize.findOne({ name: categorize });
    if (!categorizeExist) {
      res.status(404);
      throw new Error("Tên sản phẩm không hợp lệ");
    }
    if (product) {
      product.name = name || product.name;
      product.categorize = categorizeExist._id || product.categorize;
      product.standard = standard || product.standard;
      product.price = price || product.price;
      product.description = description || product.description;
      product.image = image || product.image;
      product.countInStock = countInStock || product.countInStock;
      const updatedProduct = await product.save();

      res.json(updatedProduct);
    } else {
      res.json(404);
      throw new Error("Sản phẩm không tồn tại");
    }
  })
);

export default productRoute;
