import sqlite3

def get_connection():
    conn = sqlite3.connect("/data/pantry.db")
    conn.row_factory = sqlite3.Row
    return conn
