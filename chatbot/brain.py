from langchain_ollama import OllamaLLM
from langchain_core.tools import tool
from langchain_core.prompts import PromptTemplate
from langchain_classic.agents import AgentExecutor, create_react_agent
from langchain_community.utilities import SQLDatabase

# 1. Connect to our new database
db = SQLDatabase.from_uri("sqlite:///ecommerce.db")

# 2. Define the SQL Tool
@tool
def query_inventory(question: str):
    """Use this to check product prices or stock."""
    # This line removes any single quotes that break the SQL syntax
    clean_name = question.replace("'", "") 
    
    query = f"SELECT * FROM products WHERE name LIKE '%{clean_name}%'"
    return db.run(query)

@tool
def open_dashboard(site_name: str):
    """Use this when the user wants to go to Flipkart or see the store dashboard."""
    return "SUCCESS_OPEN_FLIPKART"

# Add the new tool to the list
tools = [query_inventory, open_dashboard]

# 3. Agent Setup
# 1. Make sure the template has BOTH {tools} and {tool_names}
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
- If the user mentions 'Flipkart', use the open_dashboard tool.
- If the user asks about products, prices, or stock, use the query_inventory tool.

Begin!
Question: {input}
{agent_scratchpad}"""
# This line creates the actual prompt object
# 2. Create the prompt
prompt = PromptTemplate.from_template(template)
llm = OllamaLLM(model="llama3.2")
agent = create_react_agent(llm, tools, prompt)
# Change your last line to this:
agent_executor = AgentExecutor(
    agent=agent,
    tools=tools,
    verbose=True,  # <--- THIS MUST BE TRUE
    handle_parsing_errors=True
)