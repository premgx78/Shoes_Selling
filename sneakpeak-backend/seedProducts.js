const dotenv  = require('dotenv');
dotenv.config();

const mongoose = require('mongoose');
const Product  = require('./models/Product');

const products = [
    {
        name: "Air Max Ultra", code: "AMU-756",
        price: 4250, originalPrice: null,
        description: "Lightweight sports sneaker with responsive cushioning for all-day comfort.",
        category: "sneakers", badge: "New",
        images: [{ url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop" }],
        sizes: [{size:6,stock:10},{size:7,stock:15},{size:8,stock:20},{size:9,stock:12},{size:10,stock:8},{size:11,stock:5}],
        rating: 4.8, numReviews: 124
    },
    {
        name: "Vapor Edge Pro", code: "VEP-569",
        price: 3950, originalPrice: 5650,
        description: "High-performance running shoe built for speed and long-distance endurance.",
        category: "running", badge: "Sale",
        images: [{ url: "https://images.unsplash.com/photo-1605348532760-6753d2c43329?w=500&h=500&fit=crop" }],
        sizes: [{size:7,stock:10},{size:8,stock:20},{size:9,stock:15},{size:10,stock:8},{size:11,stock:5}],
        rating: 4.9, numReviews: 89
    },
    {
        name: "React Infinity", code: "RIN-758",
        price: 4450, originalPrice: null,
        description: "React foam midsole delivers ultra-comfortable cushioning on every run.",
        category: "running", badge: "Hot",
        images: [{ url: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&h=500&fit=crop" }],
        sizes: [{size:6,stock:8},{size:7,stock:12},{size:8,stock:15},{size:9,stock:10},{size:10,stock:6}],
        rating: 4.7, numReviews: 67
    },
    {
        name: "Phantom GT", code: "PGT-684",
        price: 3450, originalPrice: 4950,
        description: "Versatile everyday casual sneaker with memory foam cushioned insole.",
        category: "casual", badge: "Sale",
        images: [{ url: "https://images.unsplash.com/photo-1539185441755-769473a23570?w=500&h=500&fit=crop" }],
        sizes: [{size:6,stock:5},{size:7,stock:10},{size:8,stock:15},{size:9,stock:12},{size:10,stock:8},{size:11,stock:4}],
        rating: 4.6, numReviews: 93
    },
    {
        name: "Mercurial Vapor", code: "MVC-577",
        price: 4150, originalPrice: null,
        description: "Top-tier street sneaker combining bold style with all-day comfort.",
        category: "sneakers", badge: "New",
        images: [{ url: "https://images.unsplash.com/photo-1556906781-9a412961d759?w=500&h=500&fit=crop" }],
        sizes: [{size:7,stock:8},{size:8,stock:12},{size:9,stock:15},{size:10,stock:10},{size:11,stock:5}],
        rating: 4.9, numReviews: 156
    },
    {
        name: "Pegasus Trail", code: "PTR-468",
        price: 4950, originalPrice: null,
        description: "Durable trail boot with waterproof upper and rugged rubber outsole.",
        category: "boots", badge: "Best Seller",
        images: [{ url: "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=500&h=500&fit=crop" }],
        sizes: [{size:6,stock:6},{size:7,stock:10},{size:8,stock:14},{size:9,stock:12},{size:10,stock:8},{size:11,stock:4}],
        rating: 4.8, numReviews: 201
    },
    {
        name: "Zoom Fly 5", code: "ZF5-221",
        price: 5250, originalPrice: 6500,
        description: "Carbon-fibre plate running shoe engineered for race-day performance.",
        category: "running", badge: "Sale",
        images: [{ url: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500&h=500&fit=crop" }],
        sizes: [{size:7,stock:5},{size:8,stock:10},{size:9,stock:12},{size:10,stock:8},{size:11,stock:3}],
        rating: 4.9, numReviews: 78
    },
    {
        name: "Classic Cortez", code: "CCZ-101",
        price: 3250, originalPrice: null,
        description: "Timeless leather sneaker — clean, minimal and always in style.",
        category: "casual", badge: null,
        images: [{ url: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500&h=500&fit=crop" }],
        sizes: [{size:6,stock:8},{size:7,stock:12},{size:8,stock:15},{size:9,stock:10},{size:10,stock:6},{size:11,stock:4},{size:12,stock:2}],
        rating: 4.5, numReviews: 112
    },
    {
        name: "Chuck Taylor Hi", code: "CTH-444",
        price: 2950, originalPrice: null,
        description: "Iconic high-top canvas sneaker — a wardrobe essential since 1917.",
        category: "sneakers", badge: "New",
        images: [{ url: "https://images.unsplash.com/photo-1494496195158-c3bc6c3b40b9?w=500&h=500&fit=crop" }],
        sizes: [{size:5,stock:5},{size:6,stock:10},{size:7,stock:15},{size:8,stock:20},{size:9,stock:12},{size:10,stock:8},{size:11,stock:4}],
        rating: 4.6, numReviews: 234
    },
    {
        name: "Ultraboost 22", code: "UB22-333",
        price: 6500, originalPrice: 8500,
        description: "Boost cushioning returns energy with every stride for supreme comfort.",
        category: "running", badge: "Sale",
        images: [{ url: "https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?w=500&h=500&fit=crop" }],
        sizes: [{size:7,stock:6},{size:8,stock:10},{size:9,stock:12},{size:10,stock:8},{size:11,stock:4}],
        rating: 4.9, numReviews: 189
    },
    {
        name: "Chelsea Classic", code: "CBC-881",
        price: 5500, originalPrice: null,
        description: "Sleek elastic-sided Chelsea boot crafted in premium full-grain leather.",
        category: "boots", badge: "New",
        images: [{ url: "https://images.unsplash.com/photo-1638247025967-b4e38f787b76?w=500&h=500&fit=crop" }],
        sizes: [{size:6,stock:5},{size:7,stock:8},{size:8,stock:10},{size:9,stock:8},{size:10,stock:5},{size:11,stock:3}],
        rating: 4.7, numReviews: 56
    },
    {
        name: "Slip-On Pro", code: "SOP-202",
        price: 2750, originalPrice: 3500,
        description: "Effortless slip-on with padded collar and flexible waffle outsole.",
        category: "casual", badge: "Sale",
        images: [{ url: "https://images.unsplash.com/photo-1561861422-a549073e547a?w=500&h=500&fit=crop" }],
        sizes: [{size:5,stock:8},{size:6,stock:12},{size:7,stock:15},{size:8,stock:18},{size:9,stock:10},{size:10,stock:6},{size:11,stock:4}],
        rating: 4.4, numReviews: 87
    },
    {
        name: "Trail Blazer Mid", code: "TBM-550",
        price: 4750, originalPrice: null,
        description: "Retro mid-top silhouette with premium leather upper and foam midsole.",
        category: "sneakers", badge: null,
        images: [{ url: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=500&h=500&fit=crop" }],
        sizes: [{size:6,stock:6},{size:7,stock:10},{size:8,stock:12},{size:9,stock:10},{size:10,stock:6},{size:11,stock:3}],
        rating: 4.6, numReviews: 43
    },
    {
        name: "Free Run 5.0", code: "FR50-119",
        price: 3750, originalPrice: 4500,
        description: "Minimalist running shoe with a flexible sole that moves naturally with your foot.",
        category: "running", badge: "Sale",
        images: [{ url: "https://images.unsplash.com/photo-1511556820780-d912e42b4980?w=500&h=500&fit=crop" }],
        sizes: [{size:6,stock:8},{size:7,stock:12},{size:8,stock:15},{size:9,stock:10},{size:10,stock:5}],
        rating: 4.5, numReviews: 98
    },
    {
        name: "Desert Boot", code: "DBT-770",
        price: 4850, originalPrice: null,
        description: "Hand-sewn suede desert boot with natural crepe rubber sole. A true classic.",
        category: "boots", badge: "New",
        images: [{ url: "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=500&h=500&fit=crop" }],
        sizes: [{size:6,stock:5},{size:7,stock:8},{size:8,stock:10},{size:9,stock:8},{size:10,stock:5},{size:11,stock:3}],
        rating: 4.7, numReviews: 61
    },
    {
        name: "Old Skool Low", code: "OSK-003",
        price: 3150, originalPrice: null,
        description: "Iconic side-stripe skate shoe with durable suede and canvas upper.",
        category: "sneakers", badge: "Best Seller",
        images: [{ url: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=500&h=500&fit=crop" }],
        sizes: [{size:5,stock:6},{size:6,stock:10},{size:7,stock:15},{size:8,stock:18},{size:9,stock:12},{size:10,stock:8},{size:11,stock:4}],
        rating: 4.8, numReviews: 312
    },
    {
        name: "Air Force One", code: "AF1-999",
        price: 4550, originalPrice: 5200,
        description: "The legend. Triple-white leather upper with Air cushioning unit.",
        category: "casual", badge: "Sale",
        images: [{ url: "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=500&h=500&fit=crop" }],
        sizes: [{size:6,stock:8},{size:7,stock:12},{size:8,stock:16},{size:9,stock:14},{size:10,stock:10},{size:11,stock:6},{size:12,stock:3}],
        rating: 4.9, numReviews: 445
    },
    {
        name: "Suede Classic", code: "SC-456",
        price: 3650, originalPrice: null,
        description: "Premium suede upper with rubber cupsole. Effortlessly clean styling.",
        category: "casual", badge: "New",
        images: [{ url: "https://images.unsplash.com/photo-1543508282-6319a3e2621f?w=500&h=500&fit=crop" }],
        sizes: [{size:6,stock:6},{size:7,stock:10},{size:8,stock:12},{size:9,stock:10},{size:10,stock:6},{size:11,stock:3}],
        rating: 4.6, numReviews: 74
    },
    {
        name: "Combat Boot Pro", code: "CBP-992",
        price: 5950, originalPrice: 7200,
        description: "Heavy-duty combat boot with padded ankle collar and Goodyear welt construction.",
        category: "boots", badge: "Sale",
        images: [{ url: "https://images.unsplash.com/photo-1542840410-2b2b0814c4c3?w=500&h=500&fit=crop" }],
        sizes: [{size:6,stock:4},{size:7,stock:8},{size:8,stock:10},{size:9,stock:8},{size:10,stock:5},{size:11,stock:3}],
        rating: 4.8, numReviews: 38
    }
];

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ MongoDB Connected');

        // Clear existing products
        await Product.deleteMany({});
        console.log('🗑️  Cleared existing products');

        // Insert all products
        await Product.insertMany(products);
        console.log(`✅ ${products.length} products inserted successfully!`);

        mongoose.connection.close();
        console.log('✅ Done! Database seeded.');
    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
};

seedDB();