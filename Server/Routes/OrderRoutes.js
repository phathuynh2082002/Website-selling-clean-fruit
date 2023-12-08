import express from "express";
import asyncHandler from "express-async-handler";
import Order from "../Models/OrderModel.js";
import { admin, protect } from "../Middleware/AuthMiddleware.js";
import Product from "../Models/ProductModel.js";

const orderRouter = express.Router();

orderRouter.post(
  "/",
  protect,
  asyncHandler(async (req, res) => {
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    } = req.body;

    if (orderItems && orderItems.length === 0) {
      res.status(400);
      throw new Error("Hóa đơn không có bất kì sản phẩm nào!");
    } else {
      const order = new Order({
        orderItems,
        user: req.user._id,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
      });

      const insufficientQuantityProduct = await checkQty(order);
      if (insufficientQuantityProduct) {
        res.status(400);
        throw new Error(
          `Số lượng sản phẩm ${insufficientQuantityProduct.productName} tồn kho còn lại ${insufficientQuantityProduct.availableQuantity}.`
        );
      }

      const createOrder = await order.save();
      res.status(201).json(createOrder);
    }
  })
);


// ADMIN GET ALL ORDERS
orderRouter.get(
  "/all",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const orders = await Order.find({})
      .sort({ _id: -1 })
      .populate("user", "id name email");
    res.json(orders);
  })
);

// USER LOGIN ORDERS
orderRouter.get(
  "/",
  protect,
  asyncHandler(async (req, res) => {
    const order = await Order.find({ user: req.user._id }).sort({ _id: -1 });
    res.json(order);
  })
);

// GET ORDER BY ID
orderRouter.get(
  "/:id",
  protect,
  asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate(
      "user",
      "name email"
    );

    if (order) {
      res.json(order);
    } else {
      res.status(404);
      throw new Error("Hóa đơn không tồn tại");
    }
  })
);

const exceptQty = async (item) => {
  const product = await Product.findById(item.product);
  product.countInStock = product.countInStock - item.qty;
  await product.save();
};

const checkQty = async (order) => {
  for (let item of order.orderItems) {
    const product = await Product.findById(item.product);
    if (product.countInStock < item.qty) {
      return {
        productName: product.name,
        availableQuantity: product.countInStock,
      };
    }
  }
  return null; // Trả về null nếu không có lỗi
};

// ORDER IS DELIVERED
orderRouter.put(
  "/:id/delivered",
  protect,
  asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      await checkQty(order).then(async (check) => {
        if (check) {
          res.status(400);
          throw new Error(
            "Hóa đơn có sản phẩm không còn đủ số lượng tồn kho"
          );
        } else {
          await order.orderItems.map((item) => exceptQty(item));
          order.isDelivered = true;
          order.deliveredAt = Date.now();
          const updateOrder = await order.save();
          res.json(updateOrder);
        }
      });
    } else {
      res.status(404);
      throw new Error("Hóa đơn không tồn tại");
    }
  })
);

// ORDER IS PAID
orderRouter.put(
  "/:id/pay",
  protect,
  asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.email_address,
      };
      const updateOrder = await order.save();
      res.json(updateOrder);
    } else {
      res.status(404);
      throw new Error("Hóa đơn không tồn tại");
    }
  })
);

// DELETE ORDER BY ID
orderRouter.delete(
  "/:id",
  protect,
  asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      await Order.deleteOne(order);
      res.json({ message: "Hóa đơn đã được xóa" });
    } else {
      res.status(404);
      throw new Error("Hóa đơn không tồn tại");
    }
  })
);

// CANCLE ORDER BY ID
orderRouter.put(
  "/:id",
  protect,
  asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      order.isPaid = false;
      const updateOrder = await order.save();
      res.json(updateOrder);
    } else {
      res.status(404);
      throw new Error("Hóa đơn không tồn tại");
    }
  })
);

export default orderRouter;
