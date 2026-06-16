import logging
from flask import Flask, request, jsonify
from flask_cors import CORS

logging.basicConfig(level=logging.INFO, format='%(asctime)s [%(levelname)s] - %(message)s')
app = Flask(__name__)
CORS(app)

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
            "shoes": ("fashion.html", "sneakers")
        }

        self.navigation_commands = {
            "flipkart": "flipkart.html", "dashboard": "flipkart.html", "electronics": "flipkart.html",
            "fashion": "fashion.html", "clothing": "fashion.html"
        }

    def process_message(self, raw_message):
        normalized = str(raw_message).lower().strip()
        
        # 1. Check for specific product isolation requests first
        for keyword, (page, filter_val) in self.product_registry.items():
            if keyword in normalized:
                return {
                    "status": "success",
                    "message": f"🔍 Isolate query match found: [{filter_val.toUpperCase()}]. Shifting view grid matrix...",
                    "metadata": {
                        "action": "REDIRECT",
                        "target": f"{page}?filter={filter_val}",
                        "delay_ms": 800
                    }
                }

        # 2. Check for global catalog listing query
        if "list" in normalized or "item" in normalized or "inventory" in normalized:
            return {
                "status": "inventory_dump",
                "message": "📋 **INVENTORY DIRECTORY**\n\n**Electronics (Flipkart)**:\n • iPhone\n • MacBook\n • Headphones\n • Keyboard\n\n**Apparel (Clothing)**:\n • Blazer\n • Jacket\n • Hoodie\n • Sneakers",
                "metadata": {"action": "NONE"}
            }

        # 3. Standard full-dashboard page navigation redirects
        for keyword, target_url in self.navigation_commands.items():
            if keyword in normalized:
                return {
                    "status": "success",
                    "message": "🔒 Authorization granted. Shifting to cluster matrix...",
                    "metadata": {"action": "REDIRECT", "target": target_url, "delay_ms": 800}
                }

        return {
            "status": "unknown_intent",
            "message": "Command unrecognized. Type an item name (e.g., 'hoodie') or 'list' to view all items.",
            "metadata": {"action": "NONE"}
        }

engine = ChatOpsEngine()

@app.route('/api/v1/chatops', methods=['POST'])
def handle_chatops_request():
    payload = request.json or {}
    execution_result = engine.process_message(payload.get("message", ""))
    return jsonify(execution_result)

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000, debug=True)