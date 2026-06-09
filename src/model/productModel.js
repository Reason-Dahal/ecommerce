import mongoose from  "mongoose";
const ProductSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    price:{
        type:Number,
        require:true
    },
    stock:{
        type:Number,
        require:true
    },
    category:{
        type:String,
        require:true
    },
    url:{
        type:String,
        require:true,
    },

})

const Product = mongoose.model("Product", ProductSchema);
export default Product;