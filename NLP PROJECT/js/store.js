// =========================================================================
// NEXUS & ATELIER - Unified Storefront & AI Concierge Engine
// =========================================================================

const CATALOG = [
  // --- Electronics ---
  {
    id: "macbook",
    name: "Apple MacBook Pro M3 Max",
    sku: "SKU-TECH // APPL-LAP-M3",
    category: "electronics",
    price: 169900,
    priceFormatted: "₹1,69,900",
    stock: 38,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=700&auto=format&fit=crop&q=80",
    desc: "16-inch Liquid Retina XDR display, M3 Max chip with 16-core CPU, 40-core GPU, 36GB unified memory."
  },
  {
    id: "iphone",
    name: "Apple iPhone 15 Pro Titanium",
    sku: "SKU-TECH // APPL-MPH-15",
    category: "electronics",
    price: 129900,
    priceFormatted: "₹1,29,900",
    stock: 142,
    image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=700&auto=format&fit=crop&q=80",
    desc: "Aerospace-grade titanium design, A17 Pro chip, customizable Action button, 48MP main camera system."
  },
  {
    id: "headphones",
    name: "Sony WH-1000XM5 ANC",
    sku: "SKU-TECH // SONY-AUD-X5",
    category: "electronics",
    price: 29990,
    priceFormatted: "₹29,990",
    stock: 64,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=700&auto=format&fit=crop&q=80",
    desc: "Industry-leading noise canceling with two processors and 8 microphones, 30-hour battery life."
  },
  {
    id: "keyboard",
    name: "Keychron Q1 Pro Wireless",
    sku: "SKU-TECH // KEY-MECH-Q1",
    category: "electronics",
    price: 18490,
    priceFormatted: "₹18,490",
    stock: 22,
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=700&auto=format&fit=crop&q=80",
    desc: "Full CNC aluminum custom mechanical keyboard, QMK/VIA programmable, hot-swappable switches."
  },

  // --- Apparel / Fashion ---
  {
    id: "hoodie",
    name: "Over-Sized Heavyweight Fleece Hoodie",
    sku: "SKU-WEAR // AST-HD-04",
    category: "apparel",
    price: 1899,
    priceFormatted: "₹1,899",
    stock: 450,
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=700&auto=format&fit=crop&q=80",
    desc: "460 GSM custom French terry cotton, dropped shoulder boxy silhouette, ribbed hem and cuffs."
  },
  {
    id: "sneakers",
    name: "Knit Minimalist Cloud Sneakers",
    sku: "SKU-WEAR // STR-SNK-01",
    category: "apparel",
    price: 3499,
    priceFormatted: "₹3,499",
    stock: 180,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=700&auto=format&fit=crop&q=80",
    desc: "Engineered breathable knit upper, ultra-responsive rebound foam sole, ergonomic slip-on fit."
  },
  {
    id: "blazer",
    name: "Tailored Italian Wool Double-Breasted Blazer",
    sku: "SKU-WEAR // ATEL-BLZ-09",
    category: "apparel",
    price: 8999,
    priceFormatted: "₹8,999",
    stock: 45,
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=700&auto=format&fit=crop&q=80",
    desc: "Fine Italian virgin wool, peak lapels, cupro lining, hand-finished horn buttons."
  },
  {
    id: "jacket",
    name: "Selvedge Raw Denim Trucker Jacket",
    sku: "SKU-WEAR // DNM-JCK-12",
    category: "apparel",
    price: 4799,
    priceFormatted: "₹4,799",
    stock: 95,
    image: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=700&auto=format&fit=crop&q=80",
    desc: "14oz Japanese red-line selvedge denim, custom copper hardware, timeless structured fit."
  },

  // --- Luxury Fragrance / Perfumes ---
  {
    id: "lombre-noire",
    name: "Élyséen L'Ombre Noire Extrait",
    sku: "SKU-PARF // ELYS-NOIR-100",
    category: "fragrance",
    price: 14500,
    priceFormatted: "₹14,500",
    stock: 18,
    image: "assets/hero_bottle.jpg",
    desc: "Rare Cambodian Oud, Damascus Rose, Madagascar Bourbon Vanilla, smoked tonka. 30% oil concentration."
  },
  {
    id: "santal-celeste",
    name: "Élyséen Santal Céleste Eau de Parfum",
    sku: "SKU-PARF // ELYS-SANT-100",
    category: "fragrance",
    price: 12200,
    priceFormatted: "₹12,200",
    stock: 29,
    image: "https://images.unsplash.com/photo-1547887537-6158d64c35b3?w=700&auto=format&fit=crop&q=80",
    desc: "Creamy Mysore Sandalwood, crushed green cardamom pods, white amber, iris root and violet leaf."
  },
  {
    id: "fleur-dor",
    name: "Élyséen Fleur d'Or L'Absolu",
    sku: "SKU-PARF // ELYS-FLOR-100",
    category: "fragrance",
    price: 13800,
    priceFormatted: "₹13,800",
    stock: 15,
    image: "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?w=700&auto=format&fit=crop&q=80",
    desc: "Sparkling Calabrian Bergamot, honeyed Neroli, white peach nectar, sun-drenched cedar and ambergris."
  }
];

// Cart State
let cart = JSON.parse(localStorage.getItem('nexus_cart') || '[]');

// DOM Helpers
function saveCart() {
  localStorage.setItem('nexus_cart', JSON.stringify(cart));
  updateCartBadge();
  renderCartDrawer();
}

function updateCartBadge() {
  const badge = document.getElementById('cartBadge');
  if (!badge) return;
  const count = cart.reduce((sum, item) => sum + item.qty, 0);
  badge.innerText = count;
  badge.style.display = count > 0 ? 'flex' : 'none';
}

function showToast(message, type = 'info') {
  const container = document.getElementById('toastContainer');
  if (!container) return;
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: ${type === 'success' ? '#10b981' : '#3b82f6'};">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
    <span>${message}</span>
  `;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 2600);
}

// Cart Drawer Operations
function toggleCart(open) {
  const overlay = document.getElementById('cartDrawerOverlay');
  if (!overlay) return;
  if (open !== undefined) {
    if (open) overlay.classList.add('active');
    else overlay.classList.remove('active');
  } else {
    overlay.classList.toggle('active');
  }
}

function addToCart(productId) {
  const product = CATALOG.find(p => p.id === productId);
  if (!product) return;
  const existing = cart.find(i => i.id === productId);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }
  saveCart();
  showToast(`Added "${product.name}" to cart!`, 'success');
}

function updateCartQty(productId, delta) {
  const item = cart.find(i => i.id === productId);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) {
    cart = cart.filter(i => i.id !== productId);
  }
  saveCart();
}

function removeCartItem(productId) {
  cart = cart.filter(i => i.id !== productId);
  saveCart();
  showToast('Item removed from cart', 'info');
}

function renderCartDrawer() {
  const container = document.getElementById('cartItemsList');
  const subtotalEl = document.getElementById('cartSubtotal');
  const grandTotalEl = document.getElementById('cartGrandTotal');
  if (!container) return;

  if (cart.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <circle cx="9" cy="21" r="1"></circle>
          <circle cx="20" cy="21" r="1"></circle>
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
        </svg>
        <p style="font-size: 15px; font-weight: 600; color: #fff; margin-bottom: 4px;">Your cart is empty</p>
        <p style="font-size: 13px;">Browse items or ask the AI assistant to recommend products.</p>
      </div>
    `;
    if (subtotalEl) subtotalEl.innerText = "₹0";
    if (grandTotalEl) grandTotalEl.innerText = "₹0";
    return;
  }

  let total = 0;
  container.innerHTML = cart.map(item => {
    const itemTotal = item.price * item.qty;
    total += itemTotal;
    return `
      <div class="cart-item">
        <img class="cart-item-img" src="${item.image}" alt="${item.name}">
        <div class="cart-item-info">
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-price">₹${item.price.toLocaleString('en-IN')}</div>
          <div class="cart-qty-ctrl">
            <button class="qty-btn" onclick="updateCartQty('${item.id}', -1)">-</button>
            <span class="qty-val">${item.qty}</span>
            <button class="qty-btn" onclick="updateCartQty('${item.id}', 1)">+</button>
          </div>
        </div>
        <button class="btn-remove-item" onclick="removeCartItem('${item.id}')" title="Remove">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="3 6 5 6 21 6"></polyline>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
          </svg>
        </button>
      </div>
    `;
  }).join('');

  if (subtotalEl) subtotalEl.innerText = `₹${total.toLocaleString('en-IN')}`;
  if (grandTotalEl) grandTotalEl.innerText = `₹${total.toLocaleString('en-IN')}`;
}

function checkout() {
  if (cart.length === 0) {
    showToast('Your cart is empty!', 'info');
    return;
  }
  const total = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  alert(`✨ Order Confirmed!\n\nThank you for shopping with Nexus & Co.\nTotal Paid: ₹${total.toLocaleString('en-IN')}\nYour order dispatch confirmation has been logged.`);
  cart = [];
  saveCart();
  toggleCart(false);
}

// Product Grid Rendering & Filtering
function renderProductGrid(filterCategory = 'all', searchQuery = '') {
  const grid = document.getElementById('productGrid');
  if (!grid) return;

  let items = CATALOG;

  if (filterCategory !== 'all') {
    items = items.filter(item => item.category === filterCategory);
  }

  if (searchQuery.trim() !== '') {
    const q = searchQuery.toLowerCase().trim();
    items = items.filter(item => 
      item.name.toLowerCase().includes(q) || 
      item.desc.toLowerCase().includes(q) ||
      item.sku.toLowerCase().includes(q)
    );
  }

  if (items.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px;">
        <p style="font-size: 18px; font-weight: 600; color: #fff; margin-bottom: 8px;">No matching assets located</p>
        <p style="color: var(--text-muted); font-size: 14px;">Try searching for "macbook", "hoodie", "sneakers", or "oud"</p>
      </div>
    `;
    return;
  }

  grid.innerHTML = items.map(item => {
    let tagClass = 'tag-electronics';
    if (item.category === 'apparel') tagClass = 'tag-apparel';
    if (item.category === 'fragrance') tagClass = 'tag-fragrance';

    return `
      <div class="product-card" id="card-${item.id}">
        <div class="card-image-wrap">
          <span class="category-tag ${tagClass}">${item.category}</span>
          <span class="stock-tag ${item.stock < 25 ? 'stock-low' : ''}">Stock: ${item.stock}</span>
          <img src="${item.image}" alt="${item.name}" loading="lazy">
        </div>
        <div class="card-content">
          <div>
            <div class="product-sku">${item.sku}</div>
            <h3 class="product-title">${item.name}</h3>
            <p class="product-meta">${item.desc}</p>
          </div>
          <div class="card-footer">
            <span class="product-price">₹${item.price.toLocaleString('en-IN')}</span>
            <button class="btn-add-cart" onclick="addToCart('${item.id}')">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 5v14M5 12h14"></path>
              </svg>
              Add to Bag
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// AI Assistant & ChatOps Engine
function toggleChat(open) {
  const overlay = document.getElementById('chatOverlay');
  if (!overlay) return;
  if (open !== undefined) {
    if (open) overlay.classList.add('active');
    else overlay.classList.remove('active');
  } else {
    overlay.classList.toggle('active');
  }
}

function appendChatMessage(text, sender = 'bot', metaTag = '') {
  const feed = document.getElementById('chatMessages');
  if (!feed) return;

  const msgEl = document.createElement('div');
  msgEl.className = `chat-msg ${sender}`;

  const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const metaDisplay = metaTag || (sender === 'user' ? `YOU • ${timeStr}` : `AI CONCIERGE • ${timeStr}`);

  msgEl.innerHTML = `
    <div class="msg-meta">${metaDisplay}</div>
    <div class="msg-bubble">${text}</div>
  `;
  feed.appendChild(msgEl);
  feed.scrollTop = feed.scrollHeight;
}

// Client-side intelligent fallback response generator
function getClientSideResponse(text) {
  const q = text.toLowerCase().trim();

  // Check specific product query
  for (const item of CATALOG) {
    if (q.includes(item.id) || q.includes(item.name.toLowerCase().split(' ')[0])) {
      return {
        status: "success",
        message: `Found item matching **${item.name}**:\n\n• Price: **₹${item.price.toLocaleString('en-IN')}**\n• Stock available: **${item.stock} units**\n• ${item.desc}\n\n[Filter applied to catalog]`,
        filter: item.id
      };
    }
  }

  if (q.includes("list") || q.includes("inventory") || q.includes("items") || q.includes("catalog")) {
    return {
      status: "inventory",
      message: `📋 **ACTIVE INVENTORY DIRECTORY**\n\n**Electronics**:\n• MacBook Pro M3 (₹1,69,900)\n• iPhone 15 Pro (₹1,29,900)\n• Sony WH-1000XM5 (₹29,990)\n• Keychron Q1 Pro (₹18,490)\n\n**Apparel**:\n• Heavyweight Hoodie (₹1,899)\n• Knit Sneakers (₹3,499)\n• Italian Wool Blazer (₹8,999)\n• Selvedge Denim Jacket (₹4,799)\n\n**Haute Parfumerie**:\n• Élyséen L'Ombre Noire Extrait (₹14,500)\n• Santal Céleste EDP (₹12,200)\n• Fleur d'Or L'Absolu (₹13,800)`,
      filter: "all"
    };
  }

  if (q.includes("perfume") || q.includes("fragrance") || q.includes("scent") || q.includes("oud")) {
    return {
      status: "success",
      message: `✨ **Haute Parfumerie Collection**:\nWe feature handcrafted niche extraits from **Élyséen Parfums Paris** including L'Ombre Noire (Oud & Rose), Santal Céleste (Creamy Sandalwood), and Fleur d'Or (Sparkling Neroli).`,
      category: "fragrance"
    };
  }

  if (q.includes("laptop") || q.includes("phone") || q.includes("electronics") || q.includes("tech")) {
    return {
      status: "success",
      message: `⚡ Filtered display to **Electronics & Tech Hardware**. Check out Apple MacBook Pro, iPhone 15 Pro, and Sony ANC audio.`,
      category: "electronics"
    };
  }

  if (q.includes("fashion") || q.includes("clothing") || q.includes("wear") || q.includes("hoodie") || q.includes("shoes")) {
    return {
      status: "success",
      message: `🧵 Filtered display to **Fashion & Apparel**. Discover our heavy fleece hoodies, knit sneakers, and tailored blazers.`,
      category: "apparel"
    };
  }

  return {
    status: "info",
    message: `Hello! I am your AI Shopping Concierge. You can ask me to find any item (e.g. *"macbook"*, *"hoodie"*, *"perfumes"*), check inventory (type *"list"*), or ask about current stock levels.`
  };
}

async function sendChatMessage() {
  const input = document.getElementById('chatInput');
  if (!input) return;
  const userText = input.value.trim();
  if (!userText) return;

  // Render user prompt
  appendChatMessage(userText, 'user');
  input.value = '';

  // Show temporary loading indicator
  const loadingIndicator = document.createElement('div');
  loadingIndicator.className = 'chat-msg bot';
  loadingIndicator.id = 'chatLoading';
  loadingIndicator.innerHTML = `
    <div class="msg-meta">AI CONCIERGE • PROCESSING</div>
    <div class="msg-bubble" style="opacity: 0.7;">Thinking...</div>
  `;
  const feed = document.getElementById('chatMessages');
  feed.appendChild(loadingIndicator);
  feed.scrollTop = feed.scrollHeight;

  try {
    // Attempt backend Flask call first
    const response = await fetch('http://127.0.0.1:5000/api/v1/chatops', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: userText })
    });

    if (!response.ok) throw new Error("Flask server non-responsive");
    const data = await response.json();
    loadingIndicator.remove();
    appendChatMessage(data.message.replace(/\n/g, '<br>'), 'bot', `GATEWAY // ${data.status.toUpperCase()}`);

    if (data.metadata && data.metadata.action === 'REDIRECT' && data.metadata.target) {
      setTimeout(() => {
        window.location.href = data.metadata.target;
      }, data.metadata.delay_ms || 800);
    }
  } catch (err) {
    // Elegant client-side fallback
    loadingIndicator.remove();
    const fallback = getClientSideResponse(userText);
    appendChatMessage(fallback.message.replace(/\n/g, '<br>'), 'bot', `AI CONCIERGE // READY`);

    if (fallback.filter) {
      renderProductGrid('all', fallback.filter);
    } else if (fallback.category) {
      renderProductGrid(fallback.category, '');
      const pills = document.querySelectorAll('.pill-btn');
      pills.forEach(p => {
        p.classList.toggle('active', p.getAttribute('data-cat') === fallback.category);
      });
    }
  }
}

// Global initialization
document.addEventListener('DOMContentLoaded', () => {
  updateCartBadge();
  renderCartDrawer();
  renderProductGrid('all');

  // Search input live handler
  const searchInput = document.getElementById('catalogSearch');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const activePill = document.querySelector('.pill-btn.active');
      const category = activePill ? activePill.getAttribute('data-cat') : 'all';
      renderProductGrid(category, e.target.value);
    });
  }

  // Category filter pills
  const pills = document.querySelectorAll('.pill-btn');
  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      pills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const cat = pill.getAttribute('data-cat');
      const searchVal = searchInput ? searchInput.value : '';
      renderProductGrid(cat, searchVal);
    });
  });

  // URL query parameter filter support (e.g., ?filter=iphone)
  const urlParams = new URLSearchParams(window.location.search);
  const targetFilter = urlParams.get('filter');
  if (targetFilter) {
    if (searchInput) searchInput.value = targetFilter;
    renderProductGrid('all', targetFilter);
    showToast(`Filtering for: ${targetFilter.toUpperCase()}`, 'info');
  }
});
