import express from "express";
import asyncHandler from "express-async-handler";
import Categorize from "../Models/CategorizeModel.js";
import {admin, protect} from "../Middleware/AuthMiddleware.js";

const categorizeRouter = express.Router();

// CREATE CATEGORIZE
categorizeRouter.post(
    '/',
    protect,
    admin,
    asyncHandler(async (req, res) => {
        const {name} = req.body;
        const categorizeExist = await Categorize.findOne({name});
        if (categorizeExist) {
            res.status(400);
            throw new Error('Tên loại sản phẩm đã tồn tại');
        } else {
            const categorize = new Categorize({name});
            if (categorize) {
                const createCategorize = await categorize.save();
                res.status(201).json(createCategorize);
            } else {
                res.status(400);
                throw new Error('Dữ liệu loại sản phẩm không hợp lệ');
            };
        };
    })
);

// UPDATE CATEGORIZE
categorizeRouter.put(
    '/:id',
    protect,
    admin,
    asyncHandler(async (req, res) => {
        const {name} = req.body;
        const categorize = await Categorize.findById(req.params.id);
        if (categorize) {
            categorize.name = name || categorize.name;
            const updateCategorize = await categorize.save();
            res.json(updateCategorize);
        } else {
            res.json(404);
            throw new Error('Loại sản phẩm không tồn tại');
        };
    })
);

// DELETE CATEGORIZE
categorizeRouter.delete(
    '/:id',
    protect,
    admin,
    asyncHandler(async (req, res) => {
        const categorize = await Categorize.findById(req.params.id);
        if (categorize) {
            await Categorize.deleteOne(categorize);
            res.json({ message: 'Loại sản phẩm đã được xóa'});
        } else {
            res.json(404);
            throw new Error('Loại sản phẩm không tồn tại');
        };
    })
);

// GET ALL CATEGORIZE
categorizeRouter.get(
    '/all',
    asyncHandler(async (req, res) => {
        const categorizes = await Categorize.find({}).sort({_id: -1});
        res.json(categorizes)
    })
);

// GET SINGLE CATEGORIZE
categorizeRouter.get(
    '/',
    asyncHandler(async (req, res) => {
      const {id} = req.body;
      const categorize = await Categorize.findById(id);
      if (categorize) {
        res.json(categorize.name);
      } else {
        res.status(404);
        throw new Error('Loại sản phẩm không tồn tại');
      }
    })  
);

export default categorizeRouter;