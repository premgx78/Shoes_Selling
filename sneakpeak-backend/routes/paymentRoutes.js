const express  = require('express');
const router   = express.Router();
const axios    = require('axios');
const Order    = require('../models/Order');

// ── KHALTI ────────────────────────────────────

// Initiate Khalti payment
router.post('/khalti/initiate', async (req, res) => {
    try {
        const { orderId, amount, customerInfo } = req.body;

        const payload = {
            return_url:          `${process.env.FRONTEND_URL}/payment-success.html`,
            website_url:          process.env.FRONTEND_URL,
            amount:               amount * 100,
            purchase_order_id:    orderId,
            purchase_order_name: `SneakPeak Order #${orderId}`,
            customer_info: {
                name:  customerInfo.name,
                email: customerInfo.email || 'customer@sneakpeak.com',
                phone: customerInfo.phone
            }
        };

        const response = await axios.post(
            'https://a.khalti.com/api/v2/epayment/initiate/',
            payload,
            {
                headers: {
                    Authorization: `Key ${process.env.KHALTI_SECRET_KEY}`
                }
            }
        );

        await Order.findByIdAndUpdate(orderId, {
            paymentRef: response.data.pidx
        });

        res.json({
            success:    true,
            paymentUrl: response.data.payment_url,
            pidx:       response.data.pidx
        });
    } catch (error) {
        console.error('Khalti error:', error.response?.data || error.message);
        res.status(500).json({
            success: false,
            message: error.response?.data?.detail || 'Khalti payment failed'
        });
    }
});

// Verify Khalti payment
router.post('/khalti/verify', async (req, res) => {
    try {
        const { pidx, orderId } = req.body;

        const response = await axios.post(
            'https://a.khalti.com/api/v2/epayment/lookup/',
            { pidx },
            {
                headers: {
                    Authorization: `Key ${process.env.KHALTI_SECRET_KEY}`
                }
            }
        );

        if (response.data.status === 'Completed') {
            const order = await Order.findByIdAndUpdate(
                orderId,
                {
                    paymentStatus: 'paid',
                    orderStatus:   'confirmed',
                    paymentRef:    pidx
                },
                { new: true }
            );
            res.json({ success: true, order });
        } else {
            res.json({
                success: false,
                message: `Payment status: ${response.data.status}`
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.response?.data?.detail || 'Verification failed'
        });
    }
});

// ── ESEWA ─────────────────────────────────────

// Initiate eSewa payment
router.post('/esewa/initiate', async (req, res) => {
    try {
        const { orderId, amount } = req.body;

        const params = {
            amt:   amount,
            psc:   0,
            pdc:   0,
            txAmt: 0,
            tAmt:  amount,
            pid:   orderId,
            scd:   process.env.ESEWA_MERCHANT_ID,
            su:    `${process.env.FRONTEND_URL}/payment-success.html?method=esewa&orderId=${orderId}`,
            fu:    `${process.env.FRONTEND_URL}/payment-failed.html?orderId=${orderId}`
        };

        res.json({
            success:    true,
            params,
            paymentUrl: process.env.NODE_ENV === 'production'
                ? 'https://esewa.com.np/epay/main'
                : 'https://uat.esewa.com.np/epay/main'
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Verify eSewa payment
router.post('/esewa/verify', async (req, res) => {
    try {
        const { oid, amt, refId } = req.body;

        const verifyUrl = process.env.NODE_ENV === 'production'
            ? 'https://esewa.com.np/epay/transrec'
            : 'https://uat.esewa.com.np/epay/transrec';

        const response = await axios.get(verifyUrl, {
            params: {
                amt,
                rid: refId,
                pid: oid,
                scd: process.env.ESEWA_MERCHANT_ID
            }
        });

        if (response.data.includes('Success')) {
            const order = await Order.findByIdAndUpdate(
                oid,
                {
                    paymentStatus: 'paid',
                    orderStatus:   'confirmed',
                    paymentRef:    refId
                },
                { new: true }
            );
            res.json({ success: true, order });
        } else {
            res.json({ success: false, message: 'Payment verification failed' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;