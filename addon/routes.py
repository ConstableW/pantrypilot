from fastapi import APIRouter, HTTPException
from fastapi import Request
from db import get_connection

router = APIRouter()

@router.get("/products")
def get_products():
    conn = get_connection()
    cur = conn.cursor()
    cur.execute("SELECT * FROM products")
    result = cur.fetchall()
    conn.close()
    return result

@router.post("/products")
async def add_product(req: Request):
    data = await req.json()
    name = data.get("name")
    barcode = data.get("barcode", None)

    if not name:
        raise HTTPException(status_code=400, detail="Missing product name")

    conn = get_connection()
    cur = conn.cursor()
    try:
        cur.execute("INSERT INTO products (name, barcode) VALUES (?, ?)", (name, barcode))
        conn.commit()
        return {"status": "ok"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    finally:
        conn.close()

@router.get("/stock")
def get_stock():
    conn = get_connection()
    cur = conn.cursor()
    cur.execute("""
    SELECT s.id, p.name, s.quantity, s.location, s.expiration_date
    FROM stock s JOIN products p ON s.product_id = p.id
    ORDER BY s.expiration_date ASC
    """)
    result = cur.fetchall()
    conn.close()
    return result

@router.post("/stock")
async def add_stock(req: Request):
    data = await req.json()
    name = data.get("name")
    quantity = data.get("quantity")
    location = data.get("location")
    expiration_date = data.get("expiration_date")

    if not all([name, quantity, location, expiration_date]):
        raise HTTPException(status_code=400, detail="Missing fields")

    conn = get_connection()
    cur = conn.cursor()
    cur.execute("SELECT id FROM products WHERE name = ?", (name,))
    row = cur.fetchone()
    if not row:
        raise HTTPException(status_code=404, detail="Product not found")

    product_id = row[0]
    cur.execute("""
    INSERT INTO stock (product_id, quantity, location, added_on, expiration_date)
    VALUES (?, ?, ?, DATE('now'), ?)
    """, (product_id, quantity, location, expiration_date))
    conn.commit()
    conn.close()
    return {"status": "ok"}
