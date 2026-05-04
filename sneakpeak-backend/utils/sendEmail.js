const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

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

        await resend.emails.send({
            from:    'SneakPeak Nepal <onboarding@resend.dev>',
            to:      [order.customer.email || process.env.ADMIN_EMAIL],
            subject: `Order Confirmed! #${order.orderNumber} — SneakPeak`,
            html: `
<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#f8fafc;font-family:'Segoe UI',sans-serif;">
    <div style="max-width:600px;margin:0 auto;padding:2rem 1rem;">
        <div style="background:linear-gradient(135deg,#7c3aed,#3b82f6);border-radius:16px 16px 0 0;padding:2.5rem;text-align:center;">
            <h1 style="color:white;margin:0;font-size:2rem;font-weight:800;">SneakPeak</h1>
            <p style="color:rgba(255,255,255,0.85);margin:0.5rem 0 0">Premium Footwear Nepal</p>
        </div>
        <div style="background:white;padding:2.5rem;border-radius:0 0 16px 16px;">
            <div style="text-align:center;margin-bottom:2rem;">
                <span style="font-size:3rem;">✅</span>
                <h2 style="color:#0f172a;margin:1rem 0 0;">Order Confirmed!</h2>
                <p style="color:#6b7280;">Thank you for shopping with SneakPeak</p>
            </div>
            <div style="background:#f8fafc;border-radius:12px;padding:1.5rem;margin-bottom:1.5rem;">
                <div style="display:flex;justify-content:space-between;margin-bottom:0.5rem;">
                    <span style="color:#6b7280;">Order Number</span>
                    <strong style="color:#7c3aed;">#${order.orderNumber}</strong>
                </div>
                <div style="display:flex;justify-content:space-between;margin-bottom:0.5rem;">
                    <span style="color:#6b7280;">Payment</span>
                    <strong>${order.paymentMethod.toUpperCase()}</strong>
                </div>
                <div style="display:flex;justify-content:space-between;">
                    <span style="color:#6b7280;">Status</span>
                    <strong style="color:#10b981;">✅ Confirmed</strong>
                </div>
            </div>
            <table style="width:100%;border-collapse:collapse;margin-bottom:1.5rem;">
                <thead>
                    <tr style="background:#f8fafc;">
                        <th style="padding:12px;text-align:left;color:#6b7280;">Product</th>
                        <th style="padding:12px;text-align:center;color:#6b7280;">Qty</th>
                        <th style="padding:12px;text-align:right;color:#6b7280;">Price</th>
                    </tr>
                </thead>
                <tbody>${itemsHTML}</tbody>
                <tfoot>
                    <tr>
                        <td colspan="2" style="padding:12px;text-align:right;font-weight:700;">Total</td>
                        <td style="padding:12px;text-align:right;font-weight:700;color:#7c3aed;">
                            NPR ${order.totalAmount.toLocaleString()}
                        </td>
                    </tr>
                </tfoot>
            </table>
            <div style="background:#f0f9ff;border-radius:12px;padding:1.5rem;border-left:4px solid #3b82f6;">
                <h3 style="margin:0 0 1rem;">📦 Delivery Details</h3>
                <p style="margin:0.4rem 0;"><strong>Name:</strong> ${order.customer.name}</p>
                <p style="margin:0.4rem 0;"><strong>Phone:</strong> ${order.customer.phone}</p>
                <p style="margin:0.4rem 0;"><strong>Address:</strong> ${order.customer.address}, ${order.customer.city}</p>
                <p style="margin:0.4rem 0;color:#10b981;">🚚 ${deliveryMsg}</p>
            </div>
        </div>
    </div>
</body>
</html>`
        });

        console.log(`✅ Email sent for order ${order.orderNumber}`);
        return true;
    } catch (error) {
        console.error('❌ Email error:', error.message);
        return false;
    }
};

const sendAdminNotification = async (order) => {
    try {
        await resend.emails.send({
            from:    'SneakPeak Orders <onboarding@resend.dev>',
            to:      [process.env.ADMIN_EMAIL],
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
                ${order.items.map(i => `
                    <p>${i.name} — Size ${i.size} × ${i.quantity} = NPR ${(i.price * i.quantity).toLocaleString()}</p>
                `).join('')}
            `
        });
        console.log(`✅ Admin notified for order ${order.orderNumber}`);
    } catch (error) {
        console.error('❌ Admin email error:', error.message);
    }
};

module.exports = { sendOrderConfirmation, sendAdminNotification };