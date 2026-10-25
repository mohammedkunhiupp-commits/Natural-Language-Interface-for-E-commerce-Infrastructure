"""
LangChain & Ollama Experimental Autonomous Agent
Connects local LLaMA models with the SQLite eCommerce catalog.
"""

import os
from langchain_core.tools import tool
from langchain_core.prompts import PromptTemplate
from langchain_classic.agents import AgentExecutor, create_react_agent
from langchain_community.utilities import SQLDatabase
from langchain_ollama import OllamaLLM

# Connect to the seeded SQLite database
db_path = os.path.join(os.path.dirname(__file__), "ecommerce.db")
db = SQLDatabase.from_uri(f"sqlite:///{db_path}")

@tool
def query_inventory(question: str) -> str:
    """Use this to check product prices, stock levels, or SKU codes from the database."""
    clean_name = question.replace("'", "").strip()
    query = f"SELECT name, category, price, stock, sku, description FROM products WHERE name LIKE '%{clean_name}%' OR category LIKE '%{clean_name}%'"
    try:
        results = db.run(query)
        return results if results else "No matching products found in inventory."
    except Exception as e:
        return f"Database query error: {str(e)}"

@tool
def open_dashboard(site_name: str) -> str:
    """Use this when the user wants to navigate to electronics, fashion, or perfume collections."""
    target = site_name.lower().strip()
    if "fashion" in target or "apparel" in target or "clothing" in target:
        return "SUCCESS_OPEN_FASHION"
    elif "perfume" in target or "fragrance" in target:
        return "SUCCESS_OPEN_PERFUMES"
    return "SUCCESS_OPEN_ELECTRONICS"

tools = [query_inventory, open_dashboard]

template = """Answer the following questions as best you can. You have access to the following tools:

{tools}

Use the following format:
Question: the input question you must answer
Thought: you should always think about what to do
Action: the action to take, should be one of [{tool_names}]
Action Input: the input to the action
Observation: the result of the action
... (this Thought/Action/Action Input/Observation can repeat N times)
Thought: I now know the final answer
Final Answer: the final answer to the original input question

IMPORTANT:
- If the user asks about electronics, fashion, or perfumes, recommend navigating using open_dashboard.
- If the user asks about product prices, inventory, or stock, use query_inventory.

Begin!
Question: {input}
{agent_scratchpad}"""

prompt = PromptTemplate.from_template(template)

try:
    llm = OllamaLLM(model="llama3.2")
    agent = create_react_agent(llm, tools, prompt)
    agent_executor = AgentExecutor(
        agent=agent,
        tools=tools,
        verbose=True,
        handle_parsing_errors=True
    )
except Exception as e:
    agent_executor = None
    print(f"Ollama agent initialization note: {e}")

if __name__ == '__main__':
    if agent_executor:
        res = agent_executor.invoke({"input": "What is the price of the macbook?"})
        print(res)
    else:
        print("Please ensure Ollama is installed and running with llama3.2 to run agent directly.")
