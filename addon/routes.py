from fastapi import APIRouter, Request
from db import get_connection

router = APIRouter(prefix="/api")

@router.get("/products")
def list_products():
    conn = get_connection()
    cur = conn.cursor()
    cur.execute("SELECT * FROM products")
    return [dict(row) for row in cur.fetchall()]
