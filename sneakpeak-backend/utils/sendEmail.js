const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const sendOrderConfirmation = async (order) => {
    try {
        const itemsHTML = order.items.map(item => `
            <tr>
                <td style="padding:12px;border-bottom:1px solid #f1f5f9;">
                    <strong>${item.name}</strong><br>
                    <small style="color:#6b7280">Size: UK ${item.size}</small>
                </td>
                <td style="padding:12px;border-bottom:1px solid #f1f5f9;text-align:center">
                    ${item.quantity}
                </td>
                <td style="padding:12px;border-bottom:1px solid #f1f5f9;text-align:right">
                    NPR ${(item.price * item.quantity).toLocaleString()}
                </td>
            </tr>
        `).join('');

        const deliveryMsg = ['Kathmandu','Lalitpur','Bhaktapur'].includes(order.customer.city)
            ? 'Free delivery inside Kathmandu Valley'
            : `Delivery fee: NPR ${order.deliveryFee}`;

        const mailOptions = {
            from:    `"SneakPeak Nepal 👟" <${process.env.EMAIL_USER}>`,
            to:      order.customer.email || process.env.EMAIL_USER,
            subject: `Order Confirmed! #${order.orderNumber} — SneakPeak`,
            html: `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background:#f8fafc;font-family:'Segoe UI',sans-serif;">
    <div style="max-width:600px;margin:0 auto;padding:2rem 1rem;">

        <!-- Header -->
        <div style="background:linear-gradient(135deg,#7c3aed,#3b82f6);border-radius:16px 16px 0 0;padding:2.5rem;text-align:center;">
            <h1 style="color:white;margin:0;font-size:2rem;font-weight:800;letter-spacing:-1px">SneakPeak</h1>
            <p style="color:rgba(255,255,255,0.85);margin:0.5rem 0 0">Premium Footwear Nepal</p>
        </div>

        <!-- Body -->
        <div style="background:white;padding:2.5rem;border-radius:0 0 16px 16px;box-shadow:0 4px 20px rgba(0,0,0,0.08);">

            <!-- Success icon -->
            <div style="text-align:center;margin-bottom:2rem;">
                <div style="width:72px;height:72px;background:#f0fdf4;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;margin-bottom:1rem;">
                    <span style="font-size:2.5rem;">✅</span>
                </div>
                <h2 style="color:#0f172a;margin:0;font-size:1.5rem;">Order Confirmed!</h2>
                <p style="color:#6b7280;margin:0.5rem 0 0;">Thank you for shopping with SneakPeak</p>
            </div>

            <!-- Order Info -->
            <div style="background:#f8fafc;border-radius:12px;padding:1.5rem;margin-bottom:1.5rem;">
                <div style="display:flex;justify-content:space-between;margin-bottom:0.75rem;">
                    <span style="color:#6b7280;font-size:0.9rem;">Order Number</span>
                    <strong style="color:#7c3aed;">#${order.orderNumber}</strong>
                </div>
                <div style="display:flex;justify-content:space-between;margin-bottom:0.75rem;">
                    <span style="color:#6b7280;font-size:0.9rem;">Payment Method</span>
                    <strong>${order.paymentMethod.toUpperCase()}</strong>
                </div>
                <div style="display:flex;justify-content:space-between;">
                    <span style="color:#6b7280;font-size:0.9rem;">Order Status</span>
                    <strong style="color:#10b981;">✅ Confirmed</strong>
                </div>
            </div>

            <!-- Items -->
            <h3 style="color:#0f172a;margin:0 0 1rem;font-size:1rem;">Order Items</h3>
            <table style="width:100%;border-collapse:collapse;margin-bottom:1.5rem;">
                <thead>
                    <tr style="background:#f8fafc;">
                        <th style="padding:12px;text-align:left;font-size:0.85rem;color:#6b7280;">Product</th>
                        <th style="padding:12px;text-align:center;font-size:0.85rem;color:#6b7280;">Qty</th>
                        <th style="padding:12px;text-align:right;font-size:0.85rem;color:#6b7280;">Price</th>
                    </tr>
                </thead>
                <tbody>${itemsHTML}</tbody>
                <tfoot>
                    <tr>
                        <td colspan="2" style="padding:12px;text-align:right;font-weight:700;">Total</td>
                        <td style="padding:12px;text-align:right;font-weight:700;color:#7c3aed;font-size:1.1rem;">
                            NPR ${order.totalAmount.toLocaleString()}
                        </td>
                    </tr>
                </tfoot>
            </table>

            <!-- Delivery Info -->
            <div style="background:#f0f9ff;border-radius:12px;padding:1.5rem;margin-bottom:1.5rem;border-left:4px solid #3b82f6;">
                <h3 style="color:#0f172a;margin:0 0 1rem;font-size:1rem;">📦 Delivery Details</h3>
                <p style="margin:0.4rem 0;color:#374151;font-size:0.9rem;"><strong>Name:</strong> ${order.customer.name}</p>
                <p style="margin:0.4rem 0;color:#374151;font-size:0.9rem;"><strong>Phone:</strong> ${order.customer.phone}</p>
                <p style="margin:0.4rem 0;color:#374151;font-size:0.9rem;"><strong>Address:</strong> ${order.customer.address}, ${order.customer.city}</p>
                <p style="margin:0.4rem 0;color:#10b981;font-size:0.85rem;">🚚 ${deliveryMsg}</p>
            </div>

            <!-- Contact -->
            <div style="text-align:center;padding:1.5rem;background:#faf5ff;border-radius:12px;">
                <p style="color:#6b7280;margin:0 0 0.75rem;font-size:0.9rem;">Questions? Contact us:</p>
                <a href="https://wa.me/9779824748808" style="display:inline-block;background:#25D366;color:white;padding:0.6rem 1.5rem;border-radius:50px;text-decoration:none;font-weight:600;font-size:0.9rem;">
                    💬 WhatsApp Us
                </a>
            </div>
        </div>

        <!-- Footer -->
        <div style="text-align:center;padding:1.5rem;color:#9ca3af;font-size:0.8rem;">
            <p style="margin:0;">© 2025 SneakPeak Nepal. Lalitpur, Kathmandu 🇳🇵</p>
        </div>
    </div>
</body>
</html>`
        };

        await transporter.sendMail(mailOptions);
        console.log(`✅ Email sent for order ${order.orderNumber}`);
        return true;
    } catch (error) {
        console.error('❌ Email error:', error.message);
        return false;
    }
};

// Send admin notification
const sendAdminNotification = async (order) => {
    try {
        await transporter.sendMail({
            from:    `"SneakPeak Orders" <${process.env.EMAIL_USER}>`,
            to:      process.env.EMAIL_USER,
            subject: `🛍️ New Order #${order.orderNumber} — NPR ${order.totalAmount.toLocaleString()}`,
            html: `
                <h2>New Order Received!</h2>
                <p><strong>Order:</strong> #${order.orderNumber}</p>
                <p><strong>Customer:</strong> ${order.customer.name}</p>
                <p><strong>Phone:</strong> ${order.customer.phone}</p>
                <p><strong>Address:</strong> ${order.customer.address}, ${order.customer.city}</p>
                <p><strong>Payment:</strong> ${order.paymentMethod.toUpperCase()}</p>
                <p><strong>Total:</strong> NPR ${order.totalAmount.toLocaleString()}</p>
                <hr>
                <h3>Items:</h3>
                ${order.items.map(i => `<p>${i.name} — Size ${i.size} × ${i.quantity} = NPR ${i.price * i.quantity}</p>`).join('')}
            `
        });
        console.log(`✅ Admin notified for order ${order.orderNumber}`);
    } catch (error) {
        console.error('❌ Admin email error:', error.message);
    }
};

module.exports = { sendOrderConfirmation, sendAdminNotification };