'use strict';

// ── Load products from real backend ───────────
async function loadProductsFromAPI() {
    try {
        productsGrid.innerHTML = `
            <div style="grid-column:1/-1;text-align:center;padding:4rem;color:var(--text-light)">
                <i class="fas fa-spinner fa-spin" style="font-size:2rem;margin-bottom:1rem;display:block"></i>
                <p>Loading products...</p>
            </div>`;

        const res = await apiRequest('/products');

        if (res.success && res.data.length > 0) {
            const apiProducts = res.data.map(p => ({
                id:            p._id,
                name:          p.name,
                code:          p.code,
                price:         p.price,
                originalPrice: p.originalPrice,
                image:         p.images[0]?.url || '',
                alt:           `${p.name} shoe`,
                rating:        p.rating,
                badge:         p.badge,
                category:      p.category,
                sizes:         p.sizes.map(s => s.size),
                description:   p.description
            }));

            products.length = 0;
            apiProducts.forEach(p => products.push(p));
            renderProducts(products);
            injectProductSchemas(products);
        } else {
            renderProducts(products);
        }
    } catch (error) {
        console.error('Failed to load from API, using local data:', error);
        renderProducts(products);
        injectProductSchemas(products);
    }
}

// ── Products (NPR prices, Nepal-ready) ──────────────
const products = [
    // ── Sneakers ───────────────────────────────────────
    {
        id:1, name:"Air Max Ultra", code:"AMU-756",
        price:4250, originalPrice:null,
        image:"https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop",
        alt:"Air Max Ultra white sports sneaker side view",
        rating:4.8, badge:"New", category:"sneakers",
        sizes:[6,7,8,9,10,11],
        description:"Lightweight sports sneaker with responsive cushioning for all-day comfort."
    },
    {
        id:5, name:"Mercurial Vapor", code:"MVC-577",
        price:4150, originalPrice:null,
        image:"https://images.unsplash.com/photo-1556906781-9a412961d759?w=500&h=500&fit=crop",
        alt:"Mercurial Vapor orange black premium sneaker",
        rating:4.9, badge:"New", category:"sneakers",
        sizes:[7,8,9,10,11],
        description:"Top-tier street sneaker combining bold style with all-day comfort."
    },
    {
        id:9, name:"Chuck Taylor Hi", code:"CTH-444",
        price:2950, originalPrice:null,
        image:"https://images.unsplash.com/photo-1494496195158-c3bc6c3b40b9?w=500&h=500&fit=crop",
        alt:"Chuck Taylor High Top black canvas sneaker",
        rating:4.6, badge:"New", category:"sneakers",
        sizes:[5,6,7,8,9,10,11],
        description:"Iconic high-top canvas sneaker — a wardrobe essential since 1917."
    },
    {
        id:13, name:"Trail Blazer Mid", code:"TBM-550",
        price:4750, originalPrice:null,
        image:"https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=500&h=500&fit=crop",
        alt:"Trail Blazer Mid white red retro sneaker",
        rating:4.6, badge:null, category:"sneakers",
        sizes:[6,7,8,9,10,11],
        description:"Retro mid-top silhouette with premium leather upper and foam midsole."
    },
    {
        id:16, name:"Old Skool Low", code:"OSK-003",
        price:3150, originalPrice:null,
        image:"https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=500&h=500&fit=crop",
        alt:"Old Skool black white low-top skate sneaker",
        rating:4.8, badge:"Best Seller", category:"sneakers",
        sizes:[5,6,7,8,9,10,11],
        description:"Iconic side-stripe skate shoe with durable suede and canvas upper."
    },
    // ── Running ────────────────────────────────────────
    {
        id:2, name:"Vapor Edge Pro", code:"VEP-569",
        price:3950, originalPrice:5650,
        image:"https://images.unsplash.com/photo-1605348532760-6753d2c43329?w=500&h=500&fit=crop",
        alt:"Vapor Edge Pro navy blue running shoe",
        rating:4.9, badge:"Sale", category:"running",
        sizes:[7,8,9,10,11],
        description:"High-performance running shoe built for speed and long-distance endurance."
    },
    {
        id:3, name:"React Infinity", code:"RIN-758",
        price:4450, originalPrice:null,
        image:"https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&h=500&fit=crop",
        alt:"React Infinity black white casual sneaker",
        rating:4.7, badge:"Hot", category:"running",
        sizes:[6,7,8,9,10],
        description:"React foam midsole delivers ultra-comfortable cushioning on every run."
    },
    {
        id:7, name:"Zoom Fly 5", code:"ZF5-221",
        price:5250, originalPrice:6500,
        image:"https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500&h=500&fit=crop",
        alt:"Zoom Fly 5 white premium running shoe",
        rating:4.9, badge:"Sale", category:"running",
        sizes:[7,8,9,10,11],
        description:"Carbon-fibre plate running shoe engineered for race-day performance."
    },
    {
        id:10, name:"Ultraboost 22", code:"UB22-333",
        price:6500, originalPrice:8500,
        image:"https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?w=500&h=500&fit=crop",
        alt:"Ultraboost 22 white Boost sole running shoe",
        rating:4.9, badge:"Sale", category:"running",
        sizes:[7,8,9,10,11],
        description:"Boost cushioning returns energy with every stride for supreme comfort."
    },
    {
        id:14, name:"Free Run 5.0", code:"FR50-119",
        price:3750, originalPrice:4500,
        image:"https://images.unsplash.com/photo-1511556820780-d912e42b4980?w=500&h=500&fit=crop",
        alt:"Free Run 5.0 lightweight mesh running shoe",
        rating:4.5, badge:"Sale", category:"running",
        sizes:[6,7,8,9,10],
        description:"Minimalist running shoe with a flexible sole that moves with your foot naturally."
    },
    // ── Casual ─────────────────────────────────────────
    {
        id:4, name:"Phantom GT", code:"PGT-684",
        price:3450, originalPrice:4950,
        image:"https://images.unsplash.com/photo-1539185441755-769473a23570?w=500&h=500&fit=crop",
        alt:"Phantom GT grey casual sneaker flat lay",
        rating:4.6, badge:"Sale", category:"casual",
        sizes:[6,7,8,9,10,11],
        description:"Versatile everyday casual sneaker with memory foam cushioned insole."
    },
    {
        id:8, name:"Classic Cortez", code:"CCZ-101",
        price:3250, originalPrice:null,
        image:"https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500&h=500&fit=crop",
        alt:"Classic Cortez white leather casual sneaker",
        rating:4.5, badge:null, category:"casual",
        sizes:[6,7,8,9,10,11,12],
        description:"Timeless leather sneaker — clean, minimal and always in style."
    },
    {
        id:12, name:"Slip-On Pro", code:"SOP-202",
        price:2750, originalPrice:3500,
        image:"https://images.unsplash.com/photo-1561861422-a549073e547a?w=500&h=500&fit=crop",
        alt:"Slip-On Pro black canvas casual shoe",
        rating:4.4, badge:"Sale", category:"casual",
        sizes:[5,6,7,8,9,10,11],
        description:"Effortless slip-on with padded collar and flexible waffle outsole."
    },
    {
        id:17, name:"Air Force One", code:"AF1-999",
        price:4550, originalPrice:5200,
        image:"https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=500&h=500&fit=crop",
        alt:"Air Force One all white low-top leather sneaker",
        rating:4.9, badge:"Sale", category:"casual",
        sizes:[6,7,8,9,10,11,12],
        description:"The legend. Triple-white leather upper with Nike Air cushioning unit."
    },
    {
        id:18, name:"Suede Classic", code:"SC-456",
        price:3650, originalPrice:null,
        image:"https://images.unsplash.com/photo-1543508282-6319a3e2621f?w=500&h=500&fit=crop",
        alt:"Suede Classic navy blue low-top sneaker",
        rating:4.6, badge:"New", category:"casual",
        sizes:[6,7,8,9,10,11],
        description:"Premium suede upper with rubber cupsole. Effortlessly clean styling."
    },
    // ── Boots ──────────────────────────────────────────
    {
        id:6, name:"Pegasus Trail", code:"PTR-468",
        price:4950, originalPrice:null,
        image:"https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=500&h=500&fit=crop",
        alt:"Pegasus Trail dark brown leather boot",
        rating:4.8, badge:"Best Seller", category:"boots",
        sizes:[6,7,8,9,10,11],
        description:"Durable trail boot with waterproof upper and rugged rubber outsole."
    },
    {
        id:11, name:"Chelsea Classic", code:"CBC-881",
        price:5500, originalPrice:null,
        image:"https://images.unsplash.com/photo-1638247025967-b4e38f787b76?w=500&h=500&fit=crop",
        alt:"Chelsea Classic black leather ankle boot",
        rating:4.7, badge:"New", category:"boots",
        sizes:[6,7,8,9,10,11],
        description:"Sleek elastic-sided Chelsea boot crafted in premium full-grain leather."
    },
    {
        id:15, name:"Desert Boot", code:"DBT-770",
        price:4850, originalPrice:null,
        image:"https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=500&h=500&fit=crop",
        alt:"Desert Boot sand suede lace-up ankle boot",
        rating:4.7, badge:"New", category:"boots",
        sizes:[6,7,8,9,10,11],
        description:"Hand-sewn suede desert boot with natural crepe rubber sole. A true classic."
    },
    {
        id:19, name:"Combat Boot Pro", code:"CBP-992",
        price:5950, originalPrice:7200,
        image:"https://images.unsplash.com/photo-1542840410-2b2b0814c4c3?w=500&h=500&fit=crop",
        alt:"Combat Boot Pro black leather lace-up boot",
        rating:4.8, badge:"Sale", category:"boots",
        sizes:[6,7,8,9,10,11],
        description:"Heavy-duty combat boot with padded ankle collar and Goodyear welt construction."
    }
];

// ── State ─────────────────────────────────────────────
let cart     = [];
let wishlist = new Set();
let pendingProduct = null; // product waiting for size selection

// ── DOM ───────────────────────────────────────────────
const header         = document.getElementById('header');
const menuToggle     = document.getElementById('menuToggle');
const mobileMenu     = document.getElementById('mobileMenu');
const cartIcon       = document.getElementById('cartIcon');
const cartModal      = document.getElementById('cartModal');
const cartClose      = document.getElementById('cartClose');
const cartOverlay    = document.getElementById('cartOverlay');
const cartItemsEl    = document.getElementById('cartItems');
const cartFooter     = document.getElementById('cartFooter');
const cartTotalEl    = document.getElementById('cartTotal');
const checkoutBtn    = document.getElementById('checkoutBtn');
const productsGrid   = document.getElementById('productsGrid');
const noResults      = document.getElementById('noResults');
const searchInput    = document.getElementById('siteSearch');
const filterTabs     = document.getElementById('filterTabs');
const newsletterForm = document.getElementById('newsletterForm');
const contactForm    = document.getElementById('contactForm');
const productSchemas = document.getElementById('productSchemas');
const navLinks       = document.querySelectorAll('.nav-link');
const wishlistBadge  = document.getElementById('wishlistBadge');

// Size modal
const sizeModal   = document.getElementById('sizeModal');
const sizeClose   = document.getElementById('sizeClose');
const sizeOverlay = document.getElementById('sizeOverlay');
const sizeBody    = document.getElementById('sizeBody');

// Checkout modal
const checkoutModal   = document.getElementById('checkoutModal');
const checkoutOverlay = document.getElementById('checkoutOverlay');
const checkoutClose   = document.getElementById('checkoutClose');
const goToPayment     = document.getElementById('goToPayment');
const backToDelivery  = document.getElementById('backToDelivery');
const placeOrderBtn   = document.getElementById('placeOrderBtn');
const step1           = document.getElementById('step1');
const step2           = document.getElementById('step2');
const orderSummary    = document.getElementById('orderSummary');

// Success modal
const successModal  = document.getElementById('successModal');
const successMsg    = document.getElementById('successMsg');
const successDetails= document.getElementById('successDetails');
const successClose  = document.getElementById('successClose');

// ── Init ──────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', async () => {
    await loadProductsFromAPI();
    setupEvents();
    setupHeaderScroll();
    setupScrollSpy();
});

// ── Events ────────────────────────────────────────────
function setupEvents() {
    // Mobile menu
    menuToggle.addEventListener('click', () => {
        const open = !mobileMenu.hidden;
        mobileMenu.hidden = open;
        menuToggle.setAttribute('aria-expanded', String(!open));
        menuToggle.querySelector('i').className = open ? 'fas fa-bars' : 'fas fa-times';
    });

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
            const target = document.querySelector(a.getAttribute('href'));
            if (!target) return;
            e.preventDefault();
            mobileMenu.hidden = true;
            menuToggle.setAttribute('aria-expanded','false');
            menuToggle.querySelector('i').className = 'fas fa-bars';
            window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 90, behavior:'smooth' });
        });
    });

    // Search
    searchInput?.addEventListener('input', handleSearch);

    // Filter tabs
    filterTabs?.querySelectorAll('.ftab').forEach(btn => {
        btn.addEventListener('click', () => {
            filterTabs.querySelectorAll('.ftab').forEach(b => { b.classList.remove('active'); b.setAttribute('aria-selected','false'); });
            btn.classList.add('active');
            btn.setAttribute('aria-selected','true');
            const f = btn.dataset.filter;
            renderProducts(f === 'all' ? products : products.filter(p => p.category === f));
        });
    });

    // Cart
    cartIcon.addEventListener('click', e => { e.preventDefault(); openCart(); });
    cartClose.addEventListener('click', closeCart);
    cartOverlay.addEventListener('click', closeCart);
    checkoutBtn?.addEventListener('click', openCheckout);

    // Category cards
    document.querySelectorAll('.category-card').forEach(card => {
        card.addEventListener('click', e => {
            e.preventDefault();
            const cat = card.dataset.category;
            document.getElementById('products')?.scrollIntoView({ behavior:'smooth', block:'start' });
            setTimeout(() => {
                filterTabs?.querySelectorAll('.ftab').forEach(b => {
                    const match = b.dataset.filter === cat;
                    b.classList.toggle('active', match);
                    b.setAttribute('aria-selected', String(match));
                });
                renderProducts(products.filter(p => p.category === cat));
            }, 500);
        });
    });

    // Size modal
    sizeClose.addEventListener('click', closeSizeModal);
    sizeOverlay.addEventListener('click', closeSizeModal);

    // Checkout modal
    checkoutClose.addEventListener('click', closeCheckout);
    checkoutOverlay.addEventListener('click', closeCheckout);
    goToPayment?.addEventListener('click', handleGoToPayment);
    backToDelivery?.addEventListener('click', () => { step1.style.display='block'; step2.style.display='none'; });
    placeOrderBtn?.addEventListener('click', handlePlaceOrder);

    // Success modal close
    successClose?.addEventListener('click', () => {
        successModal.classList.remove('open');
        document.body.style.overflow = '';
    });

    // Newsletter
    newsletterForm?.addEventListener('submit', handleNewsletter);

    // Contact form
    contactForm?.addEventListener('submit', handleContact);

    // Keyboard escape
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') { closeCart(); closeSizeModal(); closeCheckout(); }
    });

    window.addEventListener('resize', () => { if (window.innerWidth > 768) { mobileMenu.hidden = true; } }, { passive:true });
}

// ── Header ────────────────────────────────────────────
function setupHeaderScroll() {
    let lastY = 0;
    window.addEventListener('scroll', () => {
        const y = window.scrollY;
        header.classList.toggle('scrolled', y > 80);
        header.style.transform = (y > lastY && y > 200) ? 'translateY(-100%)' : 'translateY(0)';
        lastY = y;
    }, { passive:true });
}

function setupScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const obs = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                navLinks.forEach(l => { l.classList.remove('active'); l.removeAttribute('aria-current'); });
                const a = document.querySelector(`.nav-link[href="#${e.target.id}"]`);
                if (a) { a.classList.add('active'); a.setAttribute('aria-current','page'); }
            }
        });
    }, { rootMargin:'-40% 0px -55% 0px' });
    sections.forEach(s => obs.observe(s));
}

// ── Render Products ───────────────────────────────────
function renderProducts(list) {
    if (list.length === 0) { productsGrid.innerHTML = ''; noResults.style.display = 'block'; return; }
    noResults.style.display = 'none';
    productsGrid.innerHTML = list.map(p => {
        const badgeClass = p.badge === 'Sale' ? 'sale' : p.badge === 'Hot' ? 'hot' : '';
        const priceHTML  = p.originalPrice
            ? `<div class="product-price"><span class="original">NPR ${p.originalPrice.toLocaleString()}</span><span class="sale-pr">NPR ${p.price.toLocaleString()}</span></div>`
            : `<div class="product-price">NPR ${p.price.toLocaleString()}</div>`;
        const isWished = wishlist.has(p.id);
        return `
        <article class="product-card" role="listitem" aria-label="${p.name}">
            <div class="product-image">
                <img src="${p.image}" alt="${p.alt}" loading="lazy" width="400" height="400"
                     onerror="this.src='https://via.placeholder.com/400x400?text=No+Image'">
                ${p.badge ? `<span class="product-badge ${badgeClass}">${p.badge}</span>` : ''}
                <button class="product-wishlist ${isWished?'active':''}" data-id="${p.id}" aria-label="${isWished?'Remove from':'Add to'} wishlist: ${p.name}">
                    <i class="${isWished?'fas':'far'} fa-heart" aria-hidden="true"></i>
                </button>
            </div>
            <div class="product-info">
                <h3 class="product-name">${p.name}</h3>
                <p style="font-size:.78rem;color:var(--text-light);margin-bottom:.35rem;">${p.code}</p>
                ${priceHTML}
                <div class="product-rating" aria-label="Rating: ${p.rating} out of 5">
                    <div class="stars" aria-hidden="true">${generateStars(p.rating)}</div>
                    <span class="rating-text">${p.rating} (${Math.floor(Math.random()*150+30)})</span>
                </div>
                <button class="add-to-cart-btn" data-id="${p.id}" aria-label="Add ${p.name} to cart">
                    <i class="fas fa-shopping-bag" aria-hidden="true"></i> Add to Cart
                </button>
            </div>
        </article>`;
    }).join('');

    productsGrid.querySelectorAll('.add-to-cart-btn').forEach(btn =>
        btn.addEventListener('click', () => openSizeModal(btn.dataset.id)));
    productsGrid.querySelectorAll('.product-wishlist').forEach(btn =>
        btn.addEventListener('click', () => handleWishlist(btn.dataset.id), btn));
}

function generateStars(r) {
    return Array.from({length:5},(_,i) =>
        `<i class="${i < Math.floor(r) ? 'fas' : i - r < 1 ? 'fas fa-star-half-alt' : 'far'} fa-star" aria-hidden="true"></i>`
    ).join('').replace('fas fa-star-half-alt fa-star','fas fa-star-half-alt');
}

// ── Search ────────────────────────────────────────────
function handleSearch() {
    const q = searchInput.value.trim().toLowerCase();
    const filtered = q ? products.filter(p => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q) || p.code.toLowerCase().includes(q)) : products;
    renderProducts(filtered);
}

// ── Size Modal ────────────────────────────────────────
function openSizeModal(id) {
    const p = products.find(x => x.id === id);
    if (!p) return;
    pendingProduct = p;
    sizeBody.innerHTML = `
        <div class="size-product">
            <img src="${p.image}" alt="${p.alt}" width="72" height="72">
            <div>
                <div class="size-product-name">${p.name}</div>
                <div class="size-product-price">NPR ${p.price.toLocaleString()}</div>
            </div>
        </div>
        <p class="size-label">Select Size (UK)</p>
        <div class="size-grid">
            ${p.sizes.map(s => `<button class="size-btn" data-size="${s}">${s}</button>`).join('')}
        </div>
        <button class="size-add-btn" id="confirmAddToCart" disabled>
            <i class="fas fa-shopping-bag"></i> Select a size to continue
        </button>`;

    sizeBody.querySelectorAll('.size-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            sizeBody.querySelectorAll('.size-btn').forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');
            const confirmBtn = document.getElementById('confirmAddToCart');
            confirmBtn.disabled = false;
            confirmBtn.innerHTML = `<i class="fas fa-shopping-bag"></i> Add to Cart — Size ${btn.dataset.size}`;
        });
    });

    document.getElementById('confirmAddToCart')?.addEventListener('click', () => {
        const selectedSize = sizeBody.querySelector('.size-btn.selected')?.dataset.size;
        if (!selectedSize) return;
        addToCart(pendingProduct, selectedSize);
        closeSizeModal();
    });

    sizeModal.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeSizeModal() {
    sizeModal.classList.remove('open');
    document.body.style.overflow = '';
    pendingProduct = null;
}

// ── Cart ──────────────────────────────────────────────
function openCart() { cartModal.classList.add('open'); document.body.style.overflow = 'hidden'; }
function closeCart() { cartModal.classList.remove('open'); document.body.style.overflow = ''; }

function addToCart(product, size) {
    const key  = `${product.id}-${size}`;
    const item = cart.find(i => i.key === key);
    item ? item.qty++ : cart.push({ ...product, size, qty:1, key });
    updateCartUI();
    bumpCartBadge();
    animateToCart(product.image, product.alt);
    showNotification(`"${product.name}" (Size ${size}) added to cart!`, 'success');
    openCart();
}

function removeFromCart(key) {
    cart = cart.filter(i => i.key !== key);
    updateCartUI();
}

function updateCartUI() {
    const totalQty   = cart.reduce((s,i) => s + i.qty, 0);
    const totalPrice = cart.reduce((s,i) => s + i.price * i.qty, 0);

    document.querySelectorAll('.cart-count').forEach(el => el.textContent = totalQty);
    cartIcon.setAttribute('aria-label', `Shopping cart, ${totalQty} item${totalQty !== 1 ? 's' : ''}`);

    if (cart.length === 0) {
        cartItemsEl.innerHTML = `<div class="cart-empty"><i class="fas fa-shopping-bag" aria-hidden="true"></i><p>Your cart is empty</p></div>`;
        cartFooter.style.display = 'none';
    } else {
        cartItemsEl.innerHTML = cart.map(item => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.alt}" width="64" height="64" onerror="this.src='https://via.placeholder.com/64?text=?'">
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-size">Size UK ${item.size} &nbsp;•&nbsp; Qty: ${item.qty}</div>
                    <div class="cart-item-price">NPR ${(item.price * item.qty).toLocaleString()}</div>
                </div>
                <button class="cart-item-remove" data-key="${item.key}" aria-label="Remove ${item.name}">
                    <i class="fas fa-trash-alt" aria-hidden="true"></i>
                </button>
            </div>`).join('');
        cartFooter.style.display = 'block';
        cartTotalEl.textContent = `NPR ${totalPrice.toLocaleString()}`;
        cartItemsEl.querySelectorAll('.cart-item-remove').forEach(btn =>
            btn.addEventListener('click', () => removeFromCart(btn.dataset.key)));
    }
}

function bumpCartBadge() {
    const el = document.querySelector('.cart-count');
    el?.classList.remove('bump');
    void el?.offsetWidth;
    el?.classList.add('bump');
    setTimeout(() => el?.classList.remove('bump'), 300);
}

// ── Checkout ──────────────────────────────────────────
function openCheckout() {
    if (cart.length === 0) return;
    step1.style.display = 'block';
    step2.style.display = 'none';
    closeCart();
    checkoutModal.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeCheckout() {
    checkoutModal.classList.remove('open');
    document.body.style.overflow = '';
}

function handleGoToPayment() {
    const name    = document.getElementById('cName')?.value.trim();
    const phone   = document.getElementById('cPhone')?.value.trim();
    const address = document.getElementById('cAddress')?.value.trim();
    const city    = document.getElementById('cCity')?.value;
    if (!name || !phone || !address || !city) {
        showNotification('Please fill all required fields.', 'error');
        return;
    }
    // Build order summary
    const totalPrice = cart.reduce((s,i) => s + i.price * i.qty, 0);
    const isValley   = ['Kathmandu','Lalitpur','Bhaktapur'].includes(city);
    const deliveryFee = isValley ? 0 : 150;
    orderSummary.innerHTML = `
        <div class="order-summary-title">Order Summary</div>
        ${cart.map(i => `<div class="order-summary-item"><span>${i.name} (${i.size}) x${i.qty}</span><span>NPR ${(i.price*i.qty).toLocaleString()}</span></div>`).join('')}
        <div class="order-summary-item"><span>Delivery</span><span>${deliveryFee === 0 ? 'Free' : 'NPR ' + deliveryFee}</span></div>
        <div class="order-summary-item"><span>Total</span><span>NPR ${(totalPrice + deliveryFee).toLocaleString()}</span></div>`;
    step1.style.display = 'none';
    step2.style.display = 'block';
}

async function handlePlaceOrder() {
    const method  = document.querySelector('input[name="payMethod"]:checked')?.value;
    const name    = document.getElementById('cName')?.value.trim();
    const phone   = document.getElementById('cPhone')?.value.trim();
    const address = document.getElementById('cAddress')?.value.trim();
    const city    = document.getElementById('cCity')?.value;
    const note    = document.getElementById('cNote')?.value.trim();

    if (!name || !phone || !address || !city) {
        showNotification('Please fill all required fields.', 'error');
        return;
    }

    const isValley    = ['Kathmandu','Lalitpur','Bhaktapur'].includes(city);
    const deliveryFee = isValley ? 0 : 150;
    const totalAmount = cart.reduce((s, i) => s + i.price * i.qty, 0);

    const btn = document.getElementById('placeOrderBtn');
    btn.disabled  = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Placing Order...';

    try {
        const orderData = {
            customer: { name, phone, address, city, note },
            items: cart.map(i => ({
                product:  i.id,
                name:     i.name,
                price:    i.price,
                size:     i.size,
                quantity: i.qty,
                image:    i.image
            })),
            totalAmount,
            deliveryFee,
            paymentMethod: method,
            paymentStatus: 'pending',
            orderStatus:   method === 'cod' ? 'confirmed' : 'pending'
        };

        const res = await apiRequest('/orders', {
            method: 'POST',
            body:   JSON.stringify(orderData)
        });

        if (res.success) {
            if (method === 'esewa') {
    showNotification('Redirecting to eSewa...', 'info');

    // Get eSewa payment params from backend
    const esewaRes = await apiRequest('/payment/esewa/initiate', {
        method: 'POST',
        body:   JSON.stringify({
            orderId: res.data._id,
            amount:  totalAmount + deliveryFee
        })
    });

    if (esewaRes.success) {
        // Create and submit form to eSewa
        const form = document.createElement('form');
        form.method = 'POST';
        form.action = esewaRes.paymentUrl;

        Object.entries(esewaRes.params).forEach(([key, value]) => {
            const input   = document.createElement('input');
            input.type    = 'hidden';
            input.name    = key;
            input.value   = value;
            form.appendChild(input);
        });

        document.body.appendChild(form);
        form.submit();
    }
            } else if (method === 'khalti') {
    // Coming soon — use COD for now
    showNotification('Khalti coming soon! Please use eSewa or COD.', 'info');
    btn.disabled  = false;
    btn.innerHTML = '<i class="fas fa-lock"></i> Place Order';
} else {
                confirmOrder(
                    res.data.orderNumber, name, phone, city,
                    totalAmount + deliveryFee, 'Cash on Delivery'
                );
            }
        }
    } catch (error) {
        console.error('Order error:', error);
        showNotification('Failed to place order. Please try again.', 'error');
        btn.disabled  = false;
        btn.innerHTML = '<i class="fas fa-lock"></i> Place Order';
    }
}

function confirmOrder(orderId, name, phone, city, total, method) {
    closeCheckout();
    cart = [];
    updateCartUI();
    successDetails.innerHTML = `
        <p><strong>Order ID:</strong> ${orderId}</p>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>City:</strong> ${city}</p>
        <p><strong>Total:</strong> NPR ${total.toLocaleString()}</p>
        <p><strong>Payment:</strong> ${method}</p>`;
    successMsg.textContent = method === 'Cash on Delivery'
        ? 'Thank you! Our team will call you to confirm delivery.'
        : `Payment via ${method} received. Order confirmed!`;
    successModal.classList.add('open');
    document.body.style.overflow = 'hidden';
}

// ── Wishlist ──────────────────────────────────────────
function handleWishlist(id, btn) {
    const p = products.find(x => x.id === id);
    if (wishlist.has(id)) {
        wishlist.delete(id);
        btn.classList.remove('active');
        btn.querySelector('i').className = 'far fa-heart';
        showNotification('Removed from wishlist', 'info');
    } else {
        wishlist.add(id);
        btn.classList.add('active');
        btn.querySelector('i').className = 'fas fa-heart';
        showNotification(`"${p?.name}" saved to wishlist ❤️`, 'success');
    }
    if (wishlistBadge) wishlistBadge.textContent = wishlist.size;
}

// ── Newsletter ────────────────────────────────────────
function handleNewsletter(e) {
    e.preventDefault();
    const input = document.getElementById('newsletterEmail');
    if (!input.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)) {
        showNotification('Please enter a valid email address.', 'error');
        return;
    }
    showNotification('Subscribed successfully! 🎉', 'success');
    input.value = '';
}

// ── Contact Form ──────────────────────────────────────
function handleContact(e) {
    e.preventDefault();
    const name  = document.getElementById('contactName')?.value.trim();
    const phone = document.getElementById('contactPhone')?.value.trim();
    const msg   = document.getElementById('contactMsg')?.value.trim();
    if (!name || !phone || !msg) {
        showNotification('Please fill all required fields.', 'error');
        return;
    }
    showNotification(`Message sent! We'll contact you at ${phone} soon.`, 'success');
    e.target.reset();
}

// ── Fly-to-cart animation ─────────────────────────────
function animateToCart(imgSrc, imgAlt) {
    const cr = cartIcon.getBoundingClientRect();
    const clone = document.createElement('img');
    clone.src = imgSrc; clone.alt = '';
    clone.setAttribute('aria-hidden','true');
    Object.assign(clone.style, {
        position:'fixed', width:'60px', height:'60px', objectFit:'cover',
        borderRadius:'12px', zIndex:'9999', pointerEvents:'none',
        left:`${window.innerWidth/2 - 30}px`, top:`${window.innerHeight/2 - 30}px`,
        transition:'all 0.7s cubic-bezier(0.25,0.46,0.45,0.94)', opacity:'1'
    });
    document.body.appendChild(clone);
    requestAnimationFrame(() => requestAnimationFrame(() => {
        Object.assign(clone.style, {
            left:`${cr.left + cr.width/2 - 15}px`,
            top:`${cr.top + cr.height/2 - 15}px`,
            width:'30px', height:'30px', opacity:'0'
        });
    }));
    setTimeout(() => clone.remove(), 750);
}

// ── Notification ──────────────────────────────────────
const ICONS = { success:'fa-check-circle', error:'fa-exclamation-circle', info:'fa-info-circle' };
function showNotification(message, type = 'info') {
    document.querySelectorAll('.notification').forEach(n => n.remove());
    const n = document.createElement('div');
    n.className = `notification notification--${type}`;
    n.setAttribute('role','alert');
    n.innerHTML = `<i class="fas ${ICONS[type]||ICONS.info}" aria-hidden="true"></i> ${message}`;
    document.body.appendChild(n);
    requestAnimationFrame(() => requestAnimationFrame(() => n.classList.add('show')));
    const t = setTimeout(() => { n.classList.remove('show'); setTimeout(() => n.remove(), 400); }, 3500);
    n.addEventListener('click', () => { clearTimeout(t); n.classList.remove('show'); setTimeout(() => n.remove(), 400); });
}

// ── SEO: Product JSON-LD ──────────────────────────────
function injectProductSchemas(list) {
    if (!productSchemas) return;
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(list.map(p => ({
        "@context": "https://schema.org",
        "@type": "Product",
        "name": p.name,
        "description": p.description,
        "image": p.image,
        "brand": { "@type": "Brand", "name": "SneakPeak" },
        "offers": {
            "@type": "Offer",
            "priceCurrency": "NPR",
            "price": p.price,
            "availability": "https://schema.org/InStock",
            "url": `https://www.sneakpeak.com/products/${p.id}`
        },
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": p.rating,
            "bestRating": "5",
            "reviewCount": Math.floor(Math.random()*150+30)
        }
    })));
    productSchemas.appendChild(script);
}