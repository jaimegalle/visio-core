import os

from dotenv import load_dotenv
import pyodbc
import psycopg2

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


def get_sqlserver_connection():
    driver = _get_sqlserver_driver()
    conn = pyodbc.connect(
        f"DRIVER={{{driver}}};"
        f"SERVER={os.environ['SS_SERVER']};"
        f"DATABASE={os.environ['SS_DATABASE']};"
        f"UID={os.environ['SS_UID']};"
        f"PWD={os.environ['SS_PWD']};"
        "TrustServerCertificate=yes;"
    )
    return conn


def get_postgres_connection():
    conn = psycopg2.connect(
        host=os.environ["PG_HOST"],
        port=int(os.environ.get("PG_PORT", "5432")),
        database=os.environ["PG_DATABASE"],
        user=os.environ["PG_USER"],
        password=os.environ["PG_PASSWORD"],
    )
    return conn


if __name__ == "__main__":
    print("Drivers ODBC disponíveis:", pyodbc.drivers())

    print("Tentando conectar ao SQL Server...")
    try:
        conn = get_sqlserver_connection()
        print("  Conexão SQL Server OK!")
        conn.close()
    except Exception as e:
        print(f"  Erro SQL Server: {e}")

    print("Tentando conectar ao PostgreSQL...")
    try:
        conn = get_postgres_connection()
        print("  Conexão PostgreSQL OK!")
        conn.close()
    except Exception as e:
        print(f"  Erro PostgreSQL: {e}")
