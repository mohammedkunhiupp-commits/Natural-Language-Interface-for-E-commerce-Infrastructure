import sqlite3

# Connect to the database file
conn = sqlite3.connect('ecommerce.db')
cursor = conn.cursor()

# Create a sample products table
cursor.execute('''
CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY,
    name TEXT,
    price REAL,
    stock INTEGER
)
''')

# Add some sample Flipkart items
sample_data = [
    (1, 'iPhone 15', 69999.00, 10),
    (2, 'Samsung S24', 74999.00, 5),
    (3, 'AirPods Pro', 24900.00, 25)
]

cursor.executemany('INSERT INTO products VALUES (?,?,?,?)', sample_data)
conn.commit()
conn.close()
print("Database 'ecommerce.db' created successfully!")