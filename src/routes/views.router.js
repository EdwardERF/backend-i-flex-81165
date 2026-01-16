import express from "express";
import Product from "../models/product.model.js";

const viewsRouter = express.Router();

viewsRouter.get("/", async (req, res, next)=> {
  try {
    const { limit = 3, page = 1, order = "asc", orderBy = "title" } = req.query;

    // Agrego codigo para ordenamiento
    const validOrderBy = ["title", "price"];
    const validOrder = ["asc", "desc"];
    
    const sortField = validOrderBy.includes(orderBy) ? orderBy : "title";
    const sortOrder = validOrder.includes(order.toLowerCase()) ? order.toLowerCase() : "asc";
    
    const sortOptions = {};
    sortOptions[sortField] = sortOrder === "desc" ? -1 : 1;
    
    const productsData = await Product.paginate({}, { limit, page, lean: true, sort: sortOptions });
    const products = productsData.docs;
    delete productsData.docs;

    const links = [];
    
    for (let index = 1; index <= productsData.totalPages; index++) {
      links.push({ text: index, link: `?limit=${limit}&page=${index}&order=${sortOrder}&orderBy=${sortField}` });
    };

    res.render("home", { products, links });
  } catch (error) {
    next(error);
  }
});

export default viewsRouter;