import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    orderItem:[
        {
            name:{
                type:String,
                required:true
            },
            quantity:{
                type:Number,
                required:true

            },
            price:{
                type:Number,
                required:true

            },
            productRef:{
                type: mongoose.Schema.Types.ObjectId,
                ref:"Product",
                required:true
            }
        }
    ],

    shippingAddress:{

        city:{
            type:String,
            required:true
        },
        postalCode:{
            type:Number,
            required:true
        },
        phone:{
            type:Number,
            required:true
        },

    },

    totalPrice:{
        type: Number,
        required:true

    },

    status:{
        type:String,
        enum:["Pending","Processing","shipped","Delivered"],
        default:"Pending"
    }



})
const Order = mongoose.model("Order",orderSchema)

export default Order;