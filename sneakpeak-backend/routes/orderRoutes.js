const express = require('express');
const router  = express.Router();
const Order   = require('../models/Order');

// POST create order
router.post('/', async (req, res) => {
    try {
        const order = await Order.create(req.body);
        res.status(201).json({ success: true, data: order });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

// GET all orders
router.get('/', async (req, res) => {
    try {
        const { status, paymentStatus } = req.query;
        let filter = {};

        if (status)        filter.orderStatus   = status;
        if (paymentStatus) filter.paymentStatus = paymentStatus;

        const orders = await Order.find(filter).sort({ createdAt: -1 });
        res.json({ success: true, count: orders.length, data: orders });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// GET single order
router.get('/:id', async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).json({ success: false, message: 'Order not found' });
        }
        res.json({ success: true, data: order });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// PATCH update order status
router.patch('/:id/status', async (req, res) => {
    try {
        const { orderStatus, paymentStatus } = req.body;
        const update = {};

        if (orderStatus)   update.orderStatus   = orderStatus;
        if (paymentStatus) update.paymentStatus = paymentStatus;

        const order = await Order.findByIdAndUpdate(
            req.params.id,
            update,
            { new: true }
        );

        if (!order) {
            return res.status(404).json({ success: false, message: 'Order not found' });
        }
        res.json({ success: true, data: order });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

module.exports = router;