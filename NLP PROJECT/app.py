import logging
import sqlite3
import os
from flask import Flask, request, jsonify
from flask_cors import CORS

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s [%(levelname)s] - %(message)s')
app = Flask(__name__)
CORS(app)

DB_PATH = os.path.join(os.path.dirname(__file__), 'ecommerce.db')

def init_db():
    """Initialize SQLite database with full inventory if not already present."""
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS products (
            id TEXT PRIMARY KEY,
            name TEXT NOT NULL,
            category TEXT NOT NULL,
            price INTEGER NOT NULL,
            stock INTEGER NOT NULL,
            sku TEXT NOT NULL,
            description TEXT
        )
    ''')
    
    # Check if empty, seed default items
    cursor.execute('SELECT COUNT(*) FROM products')
    count = cursor.fetchone()[0]
    if count == 0:
        seed_data = [
            ("macbook", "Apple MacBook Pro M3 Max", "electronics", 169900, 38, "SKU-TECH // APPL-LAP-M3", "16-inch Liquid Retina XDR display, M3 Max chip"),
            ("iphone", "Apple iPhone 15 Pro", "electronics", 129900, 142, "SKU-TECH // APPL-MPH-15", "Aerospace-grade titanium, A17 Pro chip"),
            ("headphones", "Sony WH-1000XM5 ANC", "electronics", 29990, 64, "SKU-TECH // SONY-AUD-X5", "Industry-leading noise canceling"),
            ("keyboard", "Keychron Q1 Pro Wireless", "electronics", 18490, 22, "SKU-TECH // KEY-MECH-Q1", "Full CNC aluminum custom mechanical keyboard"),
            
            ("hoodie", "Over-Sized Heavyweight Fleece Hoodie", "apparel", 1899, 450, "SKU-WEAR // AST-HD-04", "460 GSM custom French terry cotton"),
            ("sneakers", "Knit Minimalist Cloud Sneakers", "apparel", 3499, 180, "SKU-WEAR // STR-SNK-01", "Engineered breathable knit upper"),
            ("blazer", "Tailored Italian Wool Double-Breasted Blazer", "apparel", 8999, 45, "SKU-WEAR // ATEL-BLZ-09", "Fine Italian virgin wool"),
            ("jacket", "Selvedge Raw Denim Trucker Jacket", "apparel", 4799, 95, "SKU-WEAR // DNM-JCK-12", "14oz Japanese red-line selvedge denim"),
            
            ("lombre-noire", "Élyséen L'Ombre Noire Extrait", "fragrance", 14500, 18, "SKU-PARF // ELYS-NOIR-100", "Rare Cambodian Oud, Damascus Rose, Madagascar Bourbon Vanilla"),
            ("santal-celeste", "Élyséen Santal Céleste Eau de Parfum", "fragrance", 12200, 29, "SKU-PARF // ELYS-SANT-100", "Creamy Mysore Sandalwood, crushed green cardamom pods"),
            ("fleur-dor", "Élyséen Fleur d'Or L'Absolu", "fragrance", 13800, 15, "SKU-PARF // ELYS-FLOR-100", "Sparkling Calabrian Bergamot, honeyed Neroli")
        ]
        cursor.executemany('INSERT INTO products VALUES (?, ?, ?, ?, ?, ?, ?)', seed_data)
        conn.commit()
    conn.close()

# Initialize DB on start
init_db()

class ChatOpsEngine:
    def __init__(self):
        # Global product catalog mapping: keyword -> (target_page, filter_value)
        self.product_registry = {
            "iphone": ("flipkart.html", "iphone"),
            "apple phone": ("flipkart.html", "iphone"),
            "macbook": ("flipkart.html", "macbook"),
            "apple laptop": ("flipkart.html", "macbook"),
            "sony": ("flipkart.html", "headphones"),
            "headphones": ("flipkart.html", "headphones"),
            "keyboard": ("flipkart.html", "keyboard"),
            "keychron": ("flipkart.html", "keyboard"),
            
            "blazer": ("fashion.html", "blazer"),
            "suit": ("fashion.html", "blazer"),
            "jacket": ("fashion.html", "jacket"),
            "denim": ("fashion.html", "jacket"),
            "hoodie": ("fashion.html", "hoodie"),
            "sneakers": ("fashion.html", "sneakers"),
            "shoes": ("fashion.html", "sneakers"),

            "perfume": ("perfumes.html", "perfume"),
            "fragrance": ("perfumes.html", "fragrance"),
            "oud": ("perfumes.html", "lombre-noire"),
            "sandalwood": ("perfumes.html", "santal-celeste"),
            "santal": ("perfumes.html", "santal-celeste"),
            "fleur": ("perfumes.html", "fleur-dor")
        }

        self.navigation_commands = {
            "flipkart": "flipkart.html",
            "electronics": "flipkart.html",
            "tech": "flipkart.html",
            "fashion": "fashion.html",
            "clothing": "fashion.html",
            "apparel": "fashion.html",
            "perfumes": "perfumes.html",
            "fragrances": "perfumes.html",
            "home": "index.html",
            "store": "index.html",
            "dashboard": "index.html"
        }

    def process_message(self, raw_message):
        normalized = str(raw_message).lower().strip()
        
        # 1. Check for specific product isolation requests
        for keyword, (page, filter_val) in self.product_registry.items():
            if keyword in normalized:
                return {
                    "status": "success",
                    "message": f"🔍 Isolate query match found: [{filter_val.upper()}]. Redirecting to asset node...",
                    "metadata": {
                        "action": "REDIRECT",
                        "target": f"{page}?filter={filter_val}",
                        "delay_ms": 700
                    }
                }

        # 2. Check for global catalog listing query
        if any(term in normalized for term in ["list", "item", "inventory", "catalog", "all"]):
            return {
                "status": "inventory_dump",
                "message": (
                    "📋 **INVENTORY DIRECTORY**\n\n"
                    "**⚡ Electronics (Cluster 01)**:\n"
                    " • Apple MacBook Pro M3 (₹1,69,900)\n"
                    " • Apple iPhone 15 Pro (₹1,29,900)\n"
                    " • Sony WH-1000XM5 ANC (₹29,990)\n"
                    " • Keychron Q1 Pro Wireless (₹18,490)\n\n"
                    "**🧵 Apparel (Cluster 02)**:\n"
                    " • Heavyweight Fleece Hoodie (₹1,899)\n"
                    " • Knit Cloud Sneakers (₹3,499)\n"
                    " • Italian Wool Blazer (₹8,999)\n"
                    " • Raw Denim Trucker Jacket (₹4,799)\n\n"
                    "**✨ Haute Parfumerie (Cluster 03)**:\n"
                    " • Élyséen L'Ombre Noire Extrait (₹14,500)\n"
                    " • Élyséen Santal Céleste EDP (₹12,200)\n"
                    " • Élyséen Fleur d'Or L'Absolu (₹13,800)"
                ),
                "metadata": {"action": "NONE"}
            }

        # 3. Standard full-dashboard page navigation redirects
        for keyword, target_url in self.navigation_commands.items():
            if keyword in normalized:
                return {
                    "status": "success",
                    "message": f"🔒 Authorization granted. Shifting view grid to {target_url}...",
                    "metadata": {"action": "REDIRECT", "target": target_url, "delay_ms": 700}
                }

        return {
            "status": "unknown_intent",
            "message": "Command unrecognized. Type an item name (e.g., 'macbook', 'hoodie', 'perfume') or 'list' to view directory.",
            "metadata": {"action": "NONE"}
        }

engine = ChatOpsEngine()

@app.route('/api/v1/chatops', methods=['POST'])
def handle_chatops_request():
    payload = request.json or {}
    execution_result = engine.process_message(payload.get("message", ""))
    return jsonify(execution_result)

@app.route('/api/v1/products', methods=['GET'])
def get_products():
    category = request.args.get('category')
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    if category:
        cursor.execute('SELECT id, name, category, price, stock, sku, description FROM products WHERE category = ?', (category,))
    else:
        cursor.execute('SELECT id, name, category, price, stock, sku, description FROM products')
    rows = cursor.fetchall()
    conn.close()
    
    products = [
        {"id": r[0], "name": r[1], "category": r[2], "price": r[3], "stock": r[4], "sku": r[5], "description": r[6]}
        for r in rows
    ]
    return jsonify({"status": "success", "count": len(products), "products": products})

@app.route('/api/v1/status', methods=['GET'])
def get_status():
    return jsonify({
        "status": "online",
        "cluster": "node-alpha-1",
        "database": "sqlite3 // ecommerce.db",
        "chatops": "ready"
    })

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000, debug=True)
