import json
import os

from dotenv import load_dotenv
import pyodbc

load_dotenv()


def _get_sqlserver_driver():
    available = pyodbc.drivers()
    for driver in ["ODBC Driver 18 for SQL Server", "ODBC Driver 17 for SQL Server"]:
        if driver in available:
            return driver
    if available:
        return available[0]
    raise RuntimeError(
        "Nenhum driver ODBC para SQL Server encontrado. "
        "Instale o Microsoft ODBC Driver for SQL Server."
    )


driver = _get_sqlserver_driver()
conn = pyodbc.connect(
    f"DRIVER={{{driver}}};"
    f"SERVER={os.environ['SS_SERVER']};"
    f"DATABASE={os.environ['SS_DATABASE']};"
    f"UID={os.environ['SS_UID']};"
    f"PWD={os.environ['SS_PWD']};"
    "TrustServerCertificate=yes;"
)
conn.autocommit = True
cur = conn.cursor()

# Tables
cur.execute("SELECT TABLE_SCHEMA, TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_TYPE='BASE TABLE' ORDER BY TABLE_SCHEMA, TABLE_NAME")
tables = cur.fetchall()
print("=== TABLES ===")
for t in tables:
    print(f"{t[0]}.{t[1]}")
print(f"Total: {len(tables)}")

# Columns
print("\n=== COLUMNS ===")
cur.execute("""
SELECT TABLE_SCHEMA, TABLE_NAME, COLUMN_NAME, ORDINAL_POSITION,
       DATA_TYPE, CHARACTER_MAXIMUM_LENGTH, NUMERIC_PRECISION, NUMERIC_SCALE,
       IS_NULLABLE, COLUMN_DEFAULT
FROM INFORMATION_SCHEMA.COLUMNS
ORDER BY TABLE_SCHEMA, TABLE_NAME, ORDINAL_POSITION
""")
cols = cur.fetchall()
for c in cols:
    print(f"{c[0]}.{c[1]}.{c[2]}|pos={c[3]}|type={c[4]}|len={c[5]}|prec={c[6]}|scale={c[7]}|null={c[8]}|default={c[9]}")

# Primary Keys
print("\n=== PRIMARY KEYS ===")
cur.execute("""
SELECT kc.TABLE_SCHEMA, kc.TABLE_NAME, kc.COLUMN_NAME, kc.CONSTRAINT_NAME
FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE kc
JOIN INFORMATION_SCHEMA.TABLE_CONSTRAINTS tc
  ON kc.CONSTRAINT_NAME = tc.CONSTRAINT_NAME AND kc.TABLE_SCHEMA = tc.TABLE_SCHEMA
WHERE tc.CONSTRAINT_TYPE = 'PRIMARY KEY'
ORDER BY kc.TABLE_SCHEMA, kc.TABLE_NAME, kc.ORDINAL_POSITION
""")
for r in cur.fetchall():
    print(f"{r[0]}.{r[1]}.{r[2]}|pk={r[3]}")

# Foreign Keys
print("\n=== FOREIGN KEYS ===")
cur.execute("""
SELECT
    fk.name AS fk_name,
    OBJECT_SCHEMA_NAME(fk.parent_object_id) AS src_schema,
    OBJECT_NAME(fk.parent_object_id) AS src_table,
    COL_NAME(fkc.parent_object_id, fkc.parent_column_id) AS src_col,
    OBJECT_SCHEMA_NAME(fk.referenced_object_id) AS ref_schema,
    OBJECT_NAME(fk.referenced_object_id) AS ref_table,
    COL_NAME(fkc.referenced_object_id, fkc.referenced_column_id) AS ref_col
FROM sys.foreign_keys fk
JOIN sys.foreign_key_columns fkc ON fk.object_id = fkc.constraint_object_id
ORDER BY src_schema, src_table, fk.name
""")
for r in cur.fetchall():
    print(f"{r[0]}|{r[1]}.{r[2]}.{r[3]}->{r[4]}.{r[5]}.{r[6]}")

# Indexes
print("\n=== INDEXES ===")
cur.execute("""
SELECT
    OBJECT_SCHEMA_NAME(i.object_id) AS schema_name,
    OBJECT_NAME(i.object_id) AS table_name,
    i.name AS index_name,
    i.type_desc,
    i.is_unique,
    i.is_primary_key,
    COL_NAME(ic.object_id, ic.column_id) AS col_name,
    ic.key_ordinal
FROM sys.indexes i
JOIN sys.index_columns ic ON i.object_id = ic.object_id AND i.index_id = ic.index_id
WHERE OBJECT_SCHEMA_NAME(i.object_id) NOT IN ('sys', 'guest', 'INFORMATION_SCHEMA')
ORDER BY schema_name, table_name, i.name, ic.key_ordinal
""")
for r in cur.fetchall():
    print(f"{r[0]}.{r[1]}.{r[6]}|idx={r[2]}|type={r[3]}|unique={r[4]}|pk={r[5]}|ord={r[7]}")

# Unique Constraints
print("\n=== UNIQUE CONSTRAINTS ===")
cur.execute("""
SELECT kc.TABLE_SCHEMA, kc.TABLE_NAME, kc.COLUMN_NAME, kc.CONSTRAINT_NAME, kc.ORDINAL_POSITION
FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE kc
JOIN INFORMATION_SCHEMA.TABLE_CONSTRAINTS tc
  ON kc.CONSTRAINT_NAME = tc.CONSTRAINT_NAME AND kc.TABLE_SCHEMA = tc.TABLE_SCHEMA
WHERE tc.CONSTRAINT_TYPE = 'UNIQUE'
ORDER BY kc.CONSTRAINT_NAME, kc.ORDINAL_POSITION
""")
for r in cur.fetchall():
    print(f"{r[0]}.{r[1]}.{r[2]}|uc={r[3]}|ord={r[4]}")

# Check Constraints
print("\n=== CHECK CONSTRAINTS ===")
cur.execute("""
SELECT tc.TABLE_SCHEMA, tc.TABLE_NAME, tc.CONSTRAINT_NAME, cc.CHECK_CLAUSE
FROM INFORMATION_SCHEMA.TABLE_CONSTRAINTS tc
JOIN INFORMATION_SCHEMA.CHECK_CONSTRAINTS cc ON tc.CONSTRAINT_NAME = cc.CONSTRAINT_NAME
WHERE tc.CONSTRAINT_TYPE = 'CHECK'
ORDER BY tc.TABLE_SCHEMA, tc.TABLE_NAME
""")
for r in cur.fetchall():
    print(f"{r[0]}.{r[1]}|ck={r[2]}|clause={r[3]}")

# Default Constraints (sys level)
print("\n=== DEFAULT CONSTRAINTS (sys) ===")
cur.execute("""
SELECT
    OBJECT_SCHEMA_NAME(dc.parent_object_id) AS schema_name,
    OBJECT_NAME(dc.parent_object_id) AS table_name,
    COL_NAME(dc.parent_object_id, dc.parent_column_id) AS col_name,
    dc.name AS constraint_name,
    dc.definition
FROM sys.default_constraints dc
ORDER BY schema_name, table_name
""")
for r in cur.fetchall():
    print(f"{r[0]}.{r[1]}.{r[2]}|dc={r[3]}|def={r[4]}")

# Identity columns
print("\n=== IDENTITY COLUMNS ===")
cur.execute("""
SELECT OBJECT_SCHEMA_NAME(t.object_id) AS schema_name,
       t.name AS table_name,
       c.name AS column_name,
       c.is_identity,
       IDENT_SEED(OBJECT_SCHEMA_NAME(t.object_id)+'.'+t.name) AS seed,
       IDENT_INCR(OBJECT_SCHEMA_NAME(t.object_id)+'.'+t.name) AS increment
FROM sys.columns c
JOIN sys.tables t ON c.object_id = t.object_id
WHERE c.is_identity = 1
ORDER BY schema_name, table_name
""")
for r in cur.fetchall():
    print(f"{r[0]}.{r[1]}.{r[2]}|seed={r[4]}|incr={r[5]}")

# Computed columns
print("\n=== COMPUTED COLUMNS ===")
cur.execute("""
SELECT OBJECT_SCHEMA_NAME(t.object_id) AS schema_name,
       t.name AS table_name,
       c.name AS column_name,
       cc.definition
FROM sys.columns c
JOIN sys.tables t ON c.object_id = t.object_id
JOIN sys.computed_columns cc ON c.object_id = cc.object_id AND c.column_id = cc.column_id
ORDER BY schema_name, table_name
""")
for r in cur.fetchall():
    print(f"{r[0]}.{r[1]}.{r[2]}|def={r[3]}")

# Row counts per table
print("\n=== ROW COUNTS ===")
cur.execute("""
SELECT OBJECT_SCHEMA_NAME(p.object_id) AS schema_name,
       OBJECT_NAME(p.object_id) AS table_name,
       SUM(p.rows) AS row_count
FROM sys.partitions p
WHERE p.index_id IN (0, 1)
  AND OBJECT_SCHEMA_NAME(p.object_id) NOT IN ('sys')
GROUP BY p.object_id
ORDER BY schema_name, table_name
""")
for r in cur.fetchall():
    print(f"{r[0]}.{r[1]}|rows={r[2]}")

conn.close()
