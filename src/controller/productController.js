
import Product from "../model/productModel.js";

export const addProduct = async (req, res) => {
    const { name, price, stock, category } = req.body;
  
    if (!name || !price || !stock || !category) {
      return res.status(400).send({ message: "please enter all the field" });
    }
  
    const product = new Product({
      name,
      price,
      stock,
      category,
      url: req.file ? req.file.path : null, // Cloudinary's secure URL
    });
  
    await product.save();
    res.status(201).send({ message: "Product added successfully", product });
  };

export const viewAllProduct = async(req,res)=>{
    const product = await Product.find();
     res.status(200).send({message:"product fetched", product});
}

export const viewProductById = async(req,res)=>{
    const {id} = req.params;
    const product = await Product.findById(id);
    res.status(200).send({message:"product fetched by id",product});
}

export const updateProduct = async(req,res)=>{
    const {id} = req.params;
    const product = await Product.findByIdAndUpdate(id,req.body,{new:true});
    res.status(200).send({message:"product upadeted",product});
}
export const deleteProduct = async(req,res)=>{
    const {id} = req.params;
    const product = await Product.findByIdAndDelete(id);
    res.status(200).send({message:"product deleted",product});
}