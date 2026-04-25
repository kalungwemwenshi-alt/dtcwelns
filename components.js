const components = {
    navbar: `
        <nav class="navbar">
            <div class="nav-container">
                <a href="index.html" class="nav-brand">
                    <img src="assets/images/logo.png" alt="Dotcom Wellness" class="brand-logo">
                </a>
                <div class="nav-links" id="navLinks">
                    <a href="index.html">Home</a>
                    <a href="about.html">About Us</a>
                    <a href="products.html">Products</a>
                    <a href="skill-up.html">Skill-Up</a>
                    <a href="blog.html">Blog</a>
                    <a href="contact.html">Contact</a>
                    <a href="#" class="nav-cart-link" id="navCartBtn">
                        🛒 <span class="nav-cart-badge" id="cartBadge">0</span>
                    </a>
                </div>
                <button class="mobile-menu-toggle" id="mobileMenuToggle" aria-label="Toggle menu">
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>
        </nav>
    `,
    footer: `
        <footer class="footer">
            <div class="container">
                <div class="footer-grid">
                    <div class="footer-brand">
                        <a href="index.html">
                            <img src="assets/images/logo.png" alt="Dotcom Wellness" class="footer-logo">
                        </a>
                        <p style="margin-top: 1rem;">A Zambian-based premium health and wellness business dedicated to providing world-class natural health products that empower people to live better.</p>
                    </div>
                    <div class="footer-links">
                        <h4>Company</h4>
                        <ul>
                            <li><a href="about.html">About Us</a></li>
                            <li><a href="contact.html">Contact Us</a></li>
                            <li><a href="blog.html">Wellness Blog</a></li>
                        </ul>
                    </div>
                    <div class="footer-links">
                        <h4>Legal</h4>
                        <ul>
                            <li><a href="#">Privacy Policy</a></li>
                            <li><a href="#">Terms of Service</a></li>
                        </ul>
                    </div>
                    <div class="footer-links">
                        <h4>Contact</h4>
                        <ul>
                            <li><a href="mailto:info.dotcomwellness@gmail.com">info.dotcomwellness@gmail.com</a></li>
                            <li><a href="tel:+260973493949">+260 973 493 949</a></li>
                            <li>Mosi-oa-Tunya House, Stand L247, Livingstone, Zambia</li>
                        </ul>
                    </div>
                </div>
                <div class="footer-bottom">
                    <p>&copy; 2025 Dotcom Wellness. All rights reserved.</p>
                    <p>Designed for the future of wellness.</p>
                </div>
            </div>
        </footer>
    `,
    cartModal: `
        <!-- Checkout Modal -->
        <div class="checkout-modal" id="checkoutModal">
            <div class="checkout-content">
                <button class="close-modal" id="closeModal">&times;</button>
                <h2 class="checkout-title">Complete Order</h2>
                
                <div class="cart-items" id="cartItemsContainer">
                    <!-- Items injected here by JS -->
                </div>
                
                <div class="cart-total" style="font-size: 1.25rem; font-weight: 700; text-align: right; margin-bottom: 2rem; color: var(--text-primary);">
                    Total: K<span id="cartTotalSum">0</span>
                </div>

                <div class="checkout-form">
                    <div class="form-group">
                        <label for="receiverName">Receiver Name</label>
                        <input type="text" id="receiverName" placeholder="John Doe">
                    </div>
                    <div class="form-group">
                        <label for="deliveryAddress">Delivery Address</label>
                        <textarea id="deliveryAddress" rows="3" placeholder="Street, City, Province"></textarea>
                    </div>
                    <button class="btn btn-primary" id="submitOrderBtn" style="width: 100%;">Submit Order via WhatsApp</button>
                </div>
            </div>
        </div>
    `,
    whatsappSupport: `
        <div class="whatsapp-support-container">
            <div class="wa-chat-popup" id="waChatPopup">
                <div class="wa-chat-header">
                    <img src="assets/images/logo.png" alt="Support">
                    <div class="wa-chat-header-info">
                        <h4>Dotcom Wellness</h4>
                        <p>Typically replies within minutes</p>
                    </div>
                </div>
                <div class="wa-chat-body">
                    <div class="wa-chat-bubble">
                        Hello Livingstone Norland champions here how can we help you?
                    </div>
                </div>
                <div class="wa-chat-footer">
                    <input type="text" id="waUserInput" placeholder="Type your message...">
                    <button class="wa-chat-send" id="waSendBtn">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                    </button>
                </div>
            </div>
            <div class="wa-floating-btn" id="waFloatingBtn">
                <div class="wa-waves"></div>
                <div class="wa-waves"></div>
                <img src="assets/images/WhatsApp.svg.webp" alt="WhatsApp">
            </div>
        </div>
    `
};

// Function to inject components once DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Inject Navbar
    const navPlaceholder = document.getElementById('navbar-placeholder');
    if (navPlaceholder) {
        navPlaceholder.innerHTML = components.navbar;

        // Highlight active link
        const currentPath = window.location.pathname.split('/').pop() || 'index.html';
        const links = navPlaceholder.querySelectorAll('.nav-links a');
        links.forEach(link => {
            if (link.getAttribute('href') === currentPath) {
                link.classList.add('active');
            }
        });

        // Mobile Menu Toggle
        const menuToggle = document.getElementById('mobileMenuToggle');
        const navLinks = document.getElementById('navLinks');
        if (menuToggle && navLinks) {
            menuToggle.addEventListener('click', (e) => {
                e.stopPropagation();
                navLinks.classList.toggle('open');
                menuToggle.classList.toggle('active');
            });
            // Close on outside click
            document.addEventListener('click', (e) => {
                if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
                    navLinks.classList.remove('open');
                    menuToggle.classList.remove('active');
                }
            });
        }
    }

    // Inject Footer
    const footerPlaceholder = document.getElementById('footer-placeholder');
    if (footerPlaceholder) {
        footerPlaceholder.innerHTML = components.footer;
    }

    // Inject Cart Modal to body globally
    const body = document.querySelector('body');
    if (body && !document.getElementById('checkoutModal')) {
        body.insertAdjacentHTML('beforeend', components.cartModal);

        let cart = [];
        const cartBadge = document.getElementById('cartBadge');
        const navCartBtn = document.getElementById('navCartBtn');
        const checkoutModal = document.getElementById('checkoutModal');
        const closeModal = document.getElementById('closeModal');
        const cartItemsContainer = document.getElementById('cartItemsContainer');
        const submitOrderBtn = document.getElementById('submitOrderBtn');

        function updateCartUI() {
            const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
            if (cartBadge) cartBadge.textContent = totalItems;
        }

        function renderCartItems() {
            if (cart.length === 0) {
                cartItemsContainer.innerHTML = '<div class="empty-cart-msg">Your cart is empty.</div>';
                document.getElementById('cartTotalSum').textContent = '0';
                return;
            }
            let currentTotal = 0;
            cartItemsContainer.innerHTML = '';
            cart.forEach((item, index) => {
                currentTotal += item.price * item.quantity;
                const itemEl = document.createElement('div');
                itemEl.className = 'cart-item';
                itemEl.innerHTML = `
                    <div class="cart-item-info">
                        <h4>${item.name}</h4>
                        <p>K${item.price}</p>
                    </div>
                    <div class="quantity-controls">
                        <button class="qty-btn minus" data-index="${index}">-</button>
                        <div class="qty-display">${item.quantity}</div>
                        <button class="qty-btn plus" data-index="${index}">+</button>
                    </div>
                `;
                cartItemsContainer.appendChild(itemEl);
            });
            document.querySelectorAll('.qty-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const idx = parseInt(e.target.getAttribute('data-index'));
                    if (e.target.classList.contains('plus')) {
                        cart[idx].quantity++;
                    } else if (e.target.classList.contains('minus')) {
                        cart[idx].quantity--;
                        if (cart[idx].quantity === 0) cart.splice(idx, 1);
                    }
                    updateCartUI();
                    renderCartItems();
                });
            });
            document.getElementById('cartTotalSum').textContent = currentTotal;
        }

        function openModal() {
            renderCartItems();
            checkoutModal.classList.add('active');
        }

        function hideModal() {
            checkoutModal.classList.remove('active');
        }

        if (navCartBtn) {
            navCartBtn.addEventListener('click', (e) => {
                e.preventDefault();
                openModal();
            });
        }
        if (closeModal) closeModal.addEventListener('click', hideModal);
        if (checkoutModal) {
            checkoutModal.addEventListener('click', (e) => {
                if (e.target === checkoutModal) hideModal();
            });
        }

        document.querySelectorAll('.product-card').forEach(card => {
            const titleRaw = card.getAttribute('data-name') || card.querySelector('h3').childNodes[0].nodeValue.trim();
            const priceRaw = parseInt(card.getAttribute('data-price')) || 680;
            const addBtn = card.querySelector('.action-add');
            const orderBtn = card.querySelector('.action-order');

            function addToCart() {
                const existing = cart.find(item => item.name === titleRaw);
                if (existing) {
                    existing.quantity++;
                } else {
                    cart.push({ name: titleRaw, price: priceRaw, quantity: 1 });
                }
                updateCartUI();
            }

            if (addBtn) addBtn.addEventListener('click', (e) => { e.preventDefault(); addToCart(); });
            if (orderBtn) orderBtn.addEventListener('click', (e) => {
                e.preventDefault();
                if (!cart.find(item => item.name === titleRaw)) addToCart();
                openModal();
            });
        });

        if (submitOrderBtn) {
            submitOrderBtn.addEventListener('click', () => {
                const receiver = document.getElementById('receiverName').value.trim();
                const address = document.getElementById('deliveryAddress').value.trim();
                if (cart.length === 0) { alert('Your cart is empty.'); return; }
                if (!receiver || !address) { alert('Please fill in both name and delivery address.'); return; }
                let message = `*New Order from Dotcom Wellness*\n\n*Receiver:* ${receiver}\n*Address:* ${address}\n\n*Items:*\n`;
                let total = 0;
                cart.forEach(item => {
                    const itemTotal = item.quantity * item.price;
                    total += itemTotal;
                    message += `- ${item.quantity}x ${item.name} (K${itemTotal})\n`;
                });
                message += `\n*Grand Total: K${total}*`;
                const encodedMessage = encodeURIComponent(message);
                window.open(`https://wa.me/260973493949?text=${encodedMessage}`, '_blank');
                cart = [];
                updateCartUI();
                hideModal();
            });
        }

        updateCartUI();
    }

    // Inject WhatsApp Support
    if (body && !document.getElementById('waFloatingBtn')) {
        body.insertAdjacentHTML('beforeend', components.whatsappSupport);

        const waFloatingBtn = document.getElementById('waFloatingBtn');
        const waChatPopup = document.getElementById('waChatPopup');
        const waSendBtn = document.getElementById('waSendBtn');
        const waUserInput = document.getElementById('waUserInput');

        waFloatingBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            waChatPopup.classList.toggle('active');
            if (waChatPopup.classList.contains('active')) waUserInput.focus();
        });

        document.addEventListener('click', (e) => {
            if (!waChatPopup.contains(e.target) && !waFloatingBtn.contains(e.target)) {
                waChatPopup.classList.remove('active');
            }
        });

        const handleWASend = () => {
            const message = waUserInput.value.trim();
            if (!message) return;
            navigator.clipboard.writeText(message).catch(() => {});
            const encodedMessage = encodeURIComponent(message);
            window.open(`https://wa.me/260973493949?text=${encodedMessage}`, '_blank');
            waUserInput.value = '';
            waChatPopup.classList.remove('active');
        };

        waSendBtn.addEventListener('click', handleWASend);
        waUserInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') handleWASend(); });
    }
});
