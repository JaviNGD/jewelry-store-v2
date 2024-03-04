import { model, Schema} from "mongoose";

export const ProductSchema = new Schema(
    {
        name: {type: String, required: true},
        brand: {type: String, required: true},
        description: {type: String, required: true},
        price: {type: Number, required: true},
        favorite: {type: Boolean, required: true, default: false},
        imageUrl: {type: String, required: true},
        category: {type: String, required: true},
        stock: {type: Number, required: true}
    },
    {
        timestamps: true,
        toJSON: {
            virtuals: true
        },
        toObject: {
            virtuals: true
        }
    }
);

export const ProductModel = model('product', ProductSchema);