# 🛒 Natural Language Interface for E-commerce Infrastructure

> A ChatOps-style CLI chatbot built with Python and basic string matching — plus an extended web version powered by LangChain, Flask, SQLite, and Ollama (Llama 3.2).

---

## 👤 Author

| Field              | Detail                                                                 |
|--------------------|------------------------------------------------------------------------|
| **Name**           | Mohammed Kunhi UPP                                                     |
| **GitHub**         | [Mohammed Kunhi UPP](https://github.com/Mohammed-Kunhi-UPP)           |
| **Institution**    | Yenepoya Deemed To Be University                                       |
| **Programme**      | BCA (AI, Cloud Computing & DevOps) with IBM & TCS                     |
| **Semester / Year**| VI Semester — Third Year                                               |
| **Project Type**   | Individual Project                                                     |
| **Domain**         | Artificial Intelligence, Cloud Computing and DevOps - B                |
| **Project Title**  | Natural Language Interface for E-commerce Infrastructure               |
| **IDE**            | VS Code                                                                |

---

## 📌 Project Overview

Complex e-commerce dashboards can be overwhelming for non-technical users. This project builds a **ChatOps-style conversational interface** that lets users query and control e-commerce systems using plain English.

### Two Implementation Tiers

| Tier | Description | Files |
|------|-------------|-------|
| **Core CLI** *(Primary)* | Python CLI chatbot using `if/elif` and basic string matching | `chatbot.py` |
| **Extended Web** *(Bonus)* | Flask REST API + LangChain ReAct agent + SQLite + HTML UI | `app.py`, `brain.py`, `index.html`, `flipkart.html`, `setup_db.py` |

---

## 🗂️ Project Structure

```
project-root/
│
├── chatbot.py          ← [CORE] CLI chatbot — primary deliverable
├── brain.py            ← [EXTENDED] LangChain agent + tool definitions
├── app.py              ← [EXTENDED] Flask REST API server
├── setup_db.py         ← [EXTENDED] One-time SQLite database setup
├── ecommerce.db        ← [EXTENDED] SQLite product database (auto-created)
├── index.html          ← [EXTENDED] ChatOps browser UI
├── flipkart.html       ← [EXTENDED] Admin KPI dashboard
├── requirements.txt    ← Python dependencies
└── README.md           ← You are here
```

---

## ✨ Features

### Core CLI Chatbot
- ✅ Pure Python — zero external dependencies
- ✅ Keyword-based intent matching using Python's `in` operator
- ✅ 6 built-in commands: `help`, `status`, `price`, `stock`, `orders`, `exit`
- ✅ Case-insensitive input normalisation
- ✅ Default fallback response for unrecognised input
- ✅ Runs instantly in any VS Code terminal

### Extended Web Version
- ✅ Flask REST API with `/chat` POST endpoint
- ✅ LangChain ReAct agent with Llama 3.2 (via Ollama)
- ✅ Live SQL product lookup from SQLite database
- ✅ Flipkart-themed Admin Dashboard with KPI cards
- ✅ Auto-redirect to dashboard on relevant queries
- ✅ Responsive chat bubble UI (no framework needed)

---

## 🚀 Quick Start

### Option 1 — Core CLI Chatbot (Recommended for Beginners)

**Requirements:** Python 3.10+ only. No pip installs needed.

```bash
# 1. Open VS Code and create chatbot.py (see source below)
# 2. Run in VS Code terminal:
python chatbot.py
```

**Sample session:**
```
==================================================
  E-commerce ChatOps CLI  |  v1.0
  Type help to see available commands.
==================================================
> You: help
Bot: Commands: status | price | stock | orders | exit

> You: what is the price
Bot: iPhone 15: Rs.69,999 | Samsung S24: Rs.74,999 | AirPods Pro: Rs.24,900

> You: show status
Bot: Server: ONLINE | DB: Connected | Uptime: 99.2%

> You: check stock
Bot: iPhone 15: 10 units | Samsung S24: 5 units | AirPods Pro: 25 units

> You: exit
Bot: Goodbye! Exiting ChatOps CLI.
```

---

### Option 2 — Extended Web Version

#### Prerequisites

1. **Python 3.10+** — https://python.org
2. **Ollama** — https://ollama.com (install and run)
3. **VS Code** — https://code.visualstudio.com

#### Step-by-Step Setup

```bash
# Step 1 — Install Python dependencies
pip install flask flask-cors langchain langchain-ollama langchain-community langchain-classic

# Step 2 — Pull the Llama 3.2 model (requires ~2 GB disk space)
ollama pull llama3.2

# Step 3 — Create the SQLite database and seed product data
python setup_db.py
# Expected output: Database 'ecommerce.db' created successfully!

# Step 4 — Start the Flask API server
python app.py
# Expected output: --- Server Starting on http://127.0.0.1:5000 ---

# Step 5 — Open index.html in your browser
# (Double-click index.html or use VS Code Live Server extension)
```

#### Try These Queries in the Browser
```
"What is the price of iPhone 15?"
"How much stock is left for Samsung S24?"
"Show me the Flipkart dashboard"
"Check AirPods Pro inventory"
```

---

## 🤖 CLI Commands Reference

| User Input Example       | Matched Keyword | Response                                              |
|--------------------------|-----------------|-------------------------------------------------------|
| `help`                   | help            | Lists all available commands                          |
| `show status`            | status          | Server: ONLINE \| DB: Connected \| Uptime: 99.2%     |
| `what is the price`      | price           | iPhone 15: Rs.69,999 \| Samsung S24: Rs.74,999 ...   |
| `check stock`            | stock           | iPhone 15: 10 units \| Samsung S24: 5 units ...       |
| `how many orders today`  | orders          | Total Orders Today: 12,450 \| Active Users: 4,821    |
| `exit` / `quit` / `bye`  | exit            | Goodbye message + script ends                        |
| *(anything else)*        | *(no match)*    | "I didn't understand that. Type 'help' for commands." |

---

## 🛍️ Product Database (ecommerce.db)

| ID | Product      | Price (INR) | Stock |
|----|--------------|-------------|-------|
| 1  | iPhone 15    | ₹69,999     | 10    |
| 2  | Samsung S24  | ₹74,999     | 5     |
| 3  | AirPods Pro  | ₹24,900     | 25    |

> To add more products, edit the `sample_data` list in `setup_db.py` and re-run it.

---

## 🧠 How the Core CLI Works (String Matching Logic)

```python
# Step 1 — Normalise input (case-insensitive)
clean = user_input.strip().lower()

# Step 2 — Scan KEYWORD_MAP for a matching keyword
KEYWORD_MAP = {
    'help':   ['help', '?', 'commands'],
    'status': ['status', 'server', 'health', 'uptime'],
    'price':  ['price', 'cost', 'rate', 'how much'],
    'stock':  ['stock', 'inventory', 'available'],
    'orders': ['orders', 'order', 'sales', 'today'],
    'exit':   ['exit', 'quit', 'bye'],
}

for intent, keywords in KEYWORD_MAP.items():
    for kw in keywords:
        if kw in clean:          # Basic substring match
            return intent        # First match wins

# Step 3 — Look up pre-defined response
response = RESPONSE_MAP[intent]
print(f"Bot: {response}")
```

---

## ⚙️ Extended Web Architecture

```
Browser (index.html)
      │
      │ HTTP POST { message }
      ▼
Flask /chat (app.py)
      │
      │ agent_executor.invoke()
      ▼
LangChain ReAct Agent (brain.py)
      │
      ├─► query_inventory() ──► SQLite (ecommerce.db)
      │
      └─► open_dashboard()  ──► "SUCCESS_OPEN_FLIPKART"
      │
      │ Final Answer string
      ▼
Flask returns JSON { reply }
      │
      ▼
Browser renders chat bubble
(+ redirect to flipkart.html if dashboard triggered)
```

---

## 📦 Requirements

### Core CLI (`chatbot.py`)
```
Python 3.10+    # No additional packages needed
```

### Extended Web Version
```
flask
flask-cors
langchain
langchain-ollama
langchain-community
langchain-classic
```

Install all at once:
```bash
pip install flask flask-cors langchain langchain-ollama langchain-community langchain-classic
```

> **Note:** Ollama must be installed separately from https://ollama.com

---

## 🔧 Troubleshooting

| Problem | Cause | Fix |
|---------|-------|-----|
| `ModuleNotFoundError: flask` | Flask not installed | Run `pip install flask flask-cors` |
| `Connection refused` on port 5000 | Flask server not running | Run `python app.py` first |
| Ollama model not found | Model not pulled | Run `ollama pull llama3.2` |
| `OperationalError: no such table` | DB not created | Run `python setup_db.py` |
| Browser shows "Error connecting" | Flask not running or wrong port | Check `http://127.0.0.1:5000/chat` is live |
| LLM response very slow | CPU-only inference | Normal for local Llama 3.2; allow 5–15 seconds |

---

## 📸 Screenshots

> *(Add screenshots of your running CLI session and browser UI here)*

| CLI Chatbot | Web ChatOps UI | Flipkart Dashboard |
|-------------|----------------|--------------------|
| *(screenshot)* | *(screenshot)* | *(screenshot)* |

---

## 📄 Design Documents

| Document | Description |
|----------|-------------|
| `HLD_NLI_Ecommerce_ChatbotCLI.pdf` | High Level Design — architecture, system overview, technology stack |
| `LLD_NLI_Ecommerce_ChatbotCLI.pdf` | Low Level Design — function specs, data structures, error handling |

---

## 🔮 Future Enhancements

- [ ] Add fuzzy matching using `difflib` for typo tolerance
- [ ] Coloured terminal output using `colorama`
- [ ] Multi-turn conversation memory (LangChain `ConversationBufferMemory`)
- [ ] Write orders to database via a new `place_order` tool
- [ ] Docker containerisation (`Dockerfile` + `docker-compose.yml`)
- [ ] Deploy Flask API to AWS EC2 or Azure App Service
- [ ] Replace Ollama with AWS Bedrock for cloud-scale LLM inference

---

## 📚 References

- [Python Documentation](https://docs.python.org/3/)
- [Flask Documentation](https://flask.palletsprojects.com/)
- [LangChain Documentation](https://python.langchain.com/docs/)
- [Ollama — Local LLM Runtime](https://ollama.com/)
- [SQLite Documentation](https://sqlite.org/docs.html)
- [ReAct: Reasoning + Acting in LLMs — Yao et al., 2023](https://arxiv.org/abs/2210.03629)

---

*Natural Language Interface for E-commerce Infrastructure — Mohammed Kunhi UPP | Yenepoya Deemed To Be University | BCA (AI, Cloud Computing & DevOps) with IBM & TCS | VI Semester, Third Year | April 2026*
