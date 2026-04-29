const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Product name is required'],
        trim: true
    },
    code: {
        type: String,
        required: [true, 'Product code is required'],
        unique: true,
        uppercase: true
    },
    description: {
        type: String,
        required: [true, 'Description is required']
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        min: 0
    },
    originalPrice: {
        type: Number,
        default: null
    },
    category: {
        type: String,
        required: true,
        enum: ['sneakers', 'running', 'casual', 'boots']
    },
    badge: {
        type: String,
        enum: ['New', 'Sale', 'Hot', 'Best Seller', null],
        default: null
    },
    images: [{
        url:      { type: String, required: true },
        publicId: { type: String }
    }],
    sizes: [{
        size:  { type: Number, required: true },
        stock: { type: Number, required: true, default: 0 }
    }],
    rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5
    },
    numReviews: {
        type: Number,
        default: 0
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);