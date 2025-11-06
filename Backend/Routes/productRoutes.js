import express from "express";
import { addProduct, listProduct, removeProduct } from "../controller/productController.js";
import adminAuth from "../middleware/adminAuth.js";

// Agar upload ka use kar rahe ho to import karo (ye missing hai)
import upload from "../middleware/multer.js"; // check karo file ka naam sahi ho

const productRoutes = express.Router();

productRoutes.post(
  "/addproduct",
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  addProduct
);

productRoutes.get("/list", listProduct);
productRoutes.post("/remove/:id", adminAuth, removeProduct);

export default productRoutes;
