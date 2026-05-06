const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    orderNumber: {
        type: String,
        unique: true
    },
    customer: {
        name:    { type: String, required: true },
        phone:   { type: String, required: true },
        email:   { type: String },
        address: { type: String, required: true },
        city:    { type: String, required: true },
        note:    { type: String }
    },
    items: [{
        product:  { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        name:     { type: String, required: true },
        price:    { type: Number, required: true },
        size:     { type: Number, required: true },
        quantity: { type: Number, required: true, default: 1 },
        image:    { type: String }
    }],
    totalAmount: {
        type: Number,
        required: true
    },
    deliveryFee: {
        type: Number,
        default: 0
    },
    paymentMethod: {
        type: String,
        enum: ['esewa', 'khalti', 'cod'],
        required: true
    },
    paymentStatus: {
        type: String,
        enum: ['pending', 'paid', 'failed', 'refunded'],
        default: 'pending'
    },
    paymentRef: {
        type: String,
        default: null
    },
    orderStatus: {
        type: String,
        enum: ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'],
        default: 'pending'
    }
}, { timestamps: true });

// Auto-generate order number
orderSchema.pre('save', async function() {
    if (!this.orderNumber) {
        // Use timestamp to guarantee uniqueness
        const timestamp = Date.now().toString().slice(-6);
        this.orderNumber = `SP-${timestamp}`;
    }
});

module.exports = mongoose.model('Order', orderSchema);