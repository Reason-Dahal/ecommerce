import Product from "../model/productModel.js";

export const addProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const product = await Product.find({});
    res.status(200).send({ message: "Product fetched successfully", product });
  } catch (error) {
    console.error(error);
  }
};

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    res
      .status(200)
      .send({ message: `Product fetched successfully $id` }, product);
  } catch (error) {
    console.error(error);
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!product) throw new Error("Product not found");
    res
      .status(200)
      .send({ message: `Product updated successfully $id` }, product);
  } catch (error) {
    console.error(error);
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    res.json({ message: "Delete successfully" });
  } catch (error) {
    console.error(error);
  }
};
