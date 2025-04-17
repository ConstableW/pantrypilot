import sqlite3

def init_db():
    conn = sqlite3.connect("data/pantry.db")
    cursor = conn.cursor()
    
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL UNIQUE,
        barcode TEXT,
        standard_mhd_days INTEGER DEFAULT 0,
        category TEXT
    );
    """)
    
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS stock (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        product_id INTEGER NOT NULL,
        quantity INTEGER NOT NULL,
        location TEXT NOT NULL,
        added_on DATE NOT NULL,
        expiration_date DATE NOT NULL,
        FOREIGN KEY (product_id) REFERENCES products (id)
    );
    """)
    
    conn.commit()
    conn.close()

def get_connection():
    return sqlite3.connect("data/pantry.db", check_same_thread=False)
