import sys
import traceback
import bcrypt
from connections import get_sqlserver_connection, get_postgres_connection
from psycopg2.extras import execute_values

BATCH_SIZE = 5000

CREATE_COLLATION_SQL = """
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_collation WHERE collname = 'pt_br_ci_ai'
    ) THEN
        CREATE COLLATION pt_br_ci_ai (
            provider = icu,
            locale = 'pt-BR-u-ks-level1',
            deterministic = false
        );
    END IF;
END
$$;
"""

DDL_STATEMENTS = [
    """CREATE TABLE pacient (
    crc SERIAL PRIMARY KEY,
    nome varchar(61) COLLATE pt_br_ci_ai,
    endereco text COLLATE pt_br_ci_ai,
    profissao varchar(21) COLLATE pt_br_ci_ai,
    cidade varchar(31) COLLATE pt_br_ci_ai,
    sexo varchar(2) COLLATE pt_br_ci_ai,
    convcode varchar(21) COLLATE pt_br_ci_ai,
    telefone text COLLATE pt_br_ci_ai,
    observ text COLLATE pt_br_ci_ai,
    datanasc varchar(13) COLLATE pt_br_ci_ai,
    bairro varchar(21) COLLATE pt_br_ci_ai,
    cep varchar(16) COLLATE pt_br_ci_ai,
    indicacao varchar(41) COLLATE pt_br_ci_ai,
    prxcons timestamp,
    email varchar(31) COLLATE pt_br_ci_ai
)""",
    """CREATE TABLE grupos (
    grupocodigo SERIAL PRIMARY KEY,
    gruponome varchar(50) COLLATE pt_br_ci_ai NOT NULL
)""",
    """CREATE TABLE users (
    usercodigo SERIAL PRIMARY KEY,
    login varchar(20) COLLATE pt_br_ci_ai NOT NULL,
    nomecompleto varchar(50) COLLATE pt_br_ci_ai NOT NULL,
    senha varchar(255) COLLATE pt_br_ci_ai NOT NULL
)""",
    """CREATE TABLE usersgrupos (
    usercodigo integer NOT NULL,
    grupocodigo integer NOT NULL
)""",
    """CREATE TABLE backupinfo (
    backupinfoid SERIAL PRIMARY KEY,
    physicalfile varchar(256) COLLATE pt_br_ci_ai NOT NULL,
    successful boolean NOT NULL,
    startdate timestamp NOT NULL,
    pacientes integer NOT NULL,
    consultas integer NOT NULL,
    lentes integer NOT NULL
)""",
    """CREATE TABLE diag (
    counter SERIAL PRIMARY KEY,
    crc integer,
    packtimex varchar(21) COLLATE pt_br_ci_ai,
    diag varchar(31) COLLATE pt_br_ci_ai,
    packtime timestamp
)""",
    """CREATE TABLE consult (
    counter SERIAL PRIMARY KEY,
    crc integer,
    hda text COLLATE pt_br_ci_ai,
    obs text COLLATE pt_br_ci_ai,
    avod varchar(31) COLLATE pt_br_ci_ai,
    avoe varchar(31) COLLATE pt_br_ci_ai,
    pood varchar(11) COLLATE pt_br_ci_ai,
    pooe varchar(11) COLLATE pt_br_ci_ai,
    kod varchar(21) COLLATE pt_br_ci_ai,
    koe varchar(21) COLLATE pt_br_ci_ai,
    refrod varchar(41) COLLATE pt_br_ci_ai,
    refroe varchar(41) COLLATE pt_br_ci_ai,
    addod varchar(21) COLLATE pt_br_ci_ai,
    addoe varchar(21) COLLATE pt_br_ci_ai,
    biood text COLLATE pt_br_ci_ai,
    biooe text COLLATE pt_br_ci_ai,
    food text COLLATE pt_br_ci_ai,
    fooe text COLLATE pt_br_ci_ai,
    presc text COLLATE pt_br_ci_ai,
    esfod varchar(8) COLLATE pt_br_ci_ai,
    esfoe varchar(8) COLLATE pt_br_ci_ai,
    cilod varchar(8) COLLATE pt_br_ci_ai,
    ciloe varchar(8) COLLATE pt_br_ci_ai,
    eixod varchar(6) COLLATE pt_br_ci_ai,
    eixoe varchar(6) COLLATE pt_br_ci_ai,
    dp varchar(7) COLLATE pt_br_ci_ai,
    lensobs text COLLATE pt_br_ci_ai,
    cartas text COLLATE pt_br_ci_ai,
    mask integer,
    packtime timestamp,
    pqod varchar(31) COLLATE pt_br_ci_ai,
    pqoe varchar(31) COLLATE pt_br_ci_ai,
    mespecod varchar(31) COLLATE pt_br_ci_ai,
    mespecoe varchar(31) COLLATE pt_br_ci_ai,
    esfoe2 varchar(8) COLLATE pt_br_ci_ai,
    esfod2 varchar(8) COLLATE pt_br_ci_ai,
    ciloe2 varchar(8) COLLATE pt_br_ci_ai,
    cilod2 varchar(8) COLLATE pt_br_ci_ai,
    eixoe2 varchar(6) COLLATE pt_br_ci_ai,
    eixod2 varchar(6) COLLATE pt_br_ci_ai,
    dp2 varchar(7) COLLATE pt_br_ci_ai,
    lensobs2 text COLLATE pt_br_ci_ai
)""",
    """CREATE TABLE lent (
    counter SERIAL PRIMARY KEY,
    nome varchar(46) COLLATE pt_br_ci_ai,
    lente varchar(21) COLLATE pt_br_ci_ai,
    pagamento varchar(21) COLLATE pt_br_ci_ai,
    observ varchar(31) COLLATE pt_br_ci_ai,
    diamod varchar(6) COLLATE pt_br_ci_ai,
    diamoe varchar(6) COLLATE pt_br_ci_ai,
    grauod varchar(31) COLLATE pt_br_ci_ai,
    grauoe varchar(31) COLLATE pt_br_ci_ai,
    cbod varchar(16) COLLATE pt_br_ci_ai,
    cboe varchar(16) COLLATE pt_br_ci_ai,
    data timestamp,
    prescoe text COLLATE pt_br_ci_ai,
    prescod text COLLATE pt_br_ci_ai
)""",
    """CREATE TABLE picretina (
    counter SERIAL PRIMARY KEY,
    data_foto timestamp,
    crc integer NOT NULL,
    desc_foto varchar(26) COLLATE pt_br_ci_ai,
    obse_foto text COLLATE pt_br_ci_ai
)""",
    """CREATE TABLE prescricoes (
    indice SERIAL PRIMARY KEY,
    categoria char(3) COLLATE pt_br_ci_ai NOT NULL,
    texto text COLLATE pt_br_ci_ai NOT NULL,
    descricao varchar(100) COLLATE pt_br_ci_ai
)""",
]

INDEX_STATEMENTS = [
    "CREATE INDEX idx_consult_crc ON consult (crc)",
    "CREATE INDEX idx_diag_crc ON diag (crc)",
    "CREATE INDEX idx_picretina_crc ON picretina (crc)",
]

TABLES = [
    {
        "source": "pacient",
        "target": "pacient",
        "columns": [
            ("CRC", "crc"), ("NOME", "nome"), ("ENDERECO", "endereco"),
            ("PROFISSAO", "profissao"), ("CIDADE", "cidade"), ("SEXO", "sexo"),
            ("CONVCODE", "convcode"), ("TELEFONE", "telefone"), ("OBSERV", "observ"),
            ("DATANASC", "datanasc"), ("BAIRRO", "bairro"), ("CEP", "cep"),
            ("INDICACAO", "indicacao"), ("PRXCONS", "prxcons"), ("EMAIL", "email"),
        ],
        "serial_col": "crc",
        "serial_seq": "pacient_crc_seq",
    },
    {
        "source": "JJGrupos",
        "target": "grupos",
        "columns": [
            ("JJGrupoCodigo", "grupocodigo"), ("JJGrupoNome", "gruponome"),
        ],
        "serial_col": "grupocodigo",
        "serial_seq": "grupos_grupocodigo_seq",
    },
    {
        "source": "JJUsers",
        "target": "users",
        "columns": [
            ("JJUserCodigo", "usercodigo"), ("JJLogin", "login"),
            ("JJNomeCompleto", "nomecompleto"), ("JJSenha", "senha"),
        ],
        "serial_col": "usercodigo",
        "serial_seq": "users_usercodigo_seq",
        "transforms": {
            "senha": lambda plain: bcrypt.hashpw(
                plain.encode("utf-8"), bcrypt.gensalt(rounds=10)
            ).decode("utf-8"),
        },
    },
    {
        "source": "JJUsersGrupos",
        "target": "usersgrupos",
        "columns": [
            ("JJUserCodigo", "usercodigo"), ("JJGrupoCodigo", "grupocodigo"),
        ],
    },
    {
        "source": "BackupInfo",
        "target": "backupinfo",
        "columns": [
            ("BackupInfoID", "backupinfoid"), ("PhysicalFile", "physicalfile"),
            ("Successful", "successful"), ("StartDate", "startdate"),
            ("Pacientes", "pacientes"), ("Consultas", "consultas"),
            ("Lentes", "lentes"),
        ],
        "serial_col": "backupinfoid",
        "serial_seq": "backupinfo_backupinfoid_seq",
    },
    {
        "source": "diag",
        "target": "diag",
        "columns": [
            ("COUNTER", "counter"), ("CRC", "crc"), ("PACKTIMEX", "packtimex"),
            ("DIAG", "diag"), ("PACKTIME", "packtime"),
        ],
        "serial_col": "counter",
        "serial_seq": "diag_counter_seq",
    },
    {
        "source": "consult",
        "target": "consult",
        "columns": [
            ("COUNTER", "counter"), ("CRC", "crc"), ("HDA", "hda"), ("OBS", "obs"),
            ("AVOD", "avod"), ("AVOE", "avoe"), ("POOD", "pood"), ("POOE", "pooe"),
            ("KOD", "kod"), ("KOE", "koe"), ("REFROD", "refrod"), ("REFROE", "refroe"),
            ("ADDOD", "addod"), ("ADDOE", "addoe"), ("BIOOD", "biood"), ("BIOOE", "biooe"),
            ("FOOD", "food"), ("FOOE", "fooe"), ("PRESC", "presc"),
            ("ESFOD", "esfod"), ("ESFOE", "esfoe"), ("CILOD", "cilod"), ("CILOE", "ciloe"),
            ("EIXOD", "eixod"), ("EIXOE", "eixoe"), ("DP", "dp"),
            ("LENSOBS", "lensobs"), ("CARTAS", "cartas"), ("MASK", "mask"),
            ("PACKTIME", "packtime"), ("PQOD", "pqod"), ("PQOE", "pqoe"),
            ("MESPECOD", "mespecod"), ("MESPECOE", "mespecoe"),
            ("ESFOE2", "esfoe2"), ("ESFOD2", "esfod2"), ("CILOE2", "ciloe2"),
            ("CILOD2", "cilod2"), ("EIXOE2", "eixoe2"), ("EIXOD2", "eixod2"),
            ("DP2", "dp2"), ("LENSOBS2", "lensobs2"),
        ],
        "serial_col": "counter",
        "serial_seq": "consult_counter_seq",
    },
    {
        "source": "lent",
        "target": "lent",
        "columns": [
            ("COUNTER", "counter"), ("NOME", "nome"), ("LENTE", "lente"),
            ("PAGAMENTO", "pagamento"), ("OBSERV", "observ"), ("DIAMOD", "diamod"),
            ("DIAMOE", "diamoe"), ("GRAUOD", "grauod"), ("GRAUOE", "grauoe"),
            ("CBOD", "cbod"), ("CBOE", "cboe"), ("DATA", "data"),
            ("PRESCOE", "prescoe"), ("PRESCOD", "prescod"),
        ],
        "serial_col": "counter",
        "serial_seq": "lent_counter_seq",
    },
    {
        "source": "picretina",
        "target": "picretina",
        "columns": [
            ("COUNTER", "counter"), ("DATA_FOTO", "data_foto"), ("CRC", "crc"),
            ("DESC_FOTO", "desc_foto"), ("OBSE_FOTO", "obse_foto"),
        ],
        "serial_col": "counter",
        "serial_seq": "picretina_counter_seq",
    },
    {
        "source": "Prescricoes",
        "target": "prescricoes",
        "columns": [
            ("Indice", "indice"), ("Categoria", "categoria"),
            ("Texto", "texto"), ("Descricao", "descricao"),
        ],
        "serial_col": "indice",
        "serial_seq": "prescricoes_indice_seq",
    },
]

ALL_PG_TABLES = [t["target"] for t in TABLES]


def migrate_table(ss_conn, pg_conn, config):
    source = config["source"]
    target = config["target"]
    columns = config["columns"]
    transforms = config.get("transforms", {})

    source_cols = ", ".join(f"[{c[0]}]" for c in columns)
    target_cols = ", ".join(c[1] for c in columns)
    single_placeholders = ", ".join(["%s"] * len(columns))

    ss_cur = ss_conn.cursor()
    ss_cur.execute(f"SELECT {source_cols} FROM [{source}]")

    pg_cur = pg_conn.cursor()
    batch_sql = f"INSERT INTO {target} ({target_cols}) VALUES %s"
    single_sql = f"INSERT INTO {target} ({target_cols}) VALUES ({single_placeholders})"

    migrated = 0
    errors = 0
    batch_num = 0

    while True:
        rows = ss_cur.fetchmany(BATCH_SIZE)
        if not rows:
            break
        batch_num += 1

        transformed_batch = []
        for row in rows:
            row_tuple = tuple(row)
            if transforms:
                row_list = list(row_tuple)
                for i, (_, col_name) in enumerate(columns):
                    if col_name in transforms and row_list[i] is not None:
                        row_list[i] = transforms[col_name](row_list[i])
                row_tuple = tuple(row_list)
            transformed_batch.append(row_tuple)

        try:
            execute_values(pg_cur, batch_sql, transformed_batch)
            pg_conn.commit()
            migrated += len(transformed_batch)
        except Exception as e:
            pg_conn.rollback()
            print(f"    Batch {batch_num} failed ({len(transformed_batch)} rows): {e}")
            print(f"    Retrying row by row...")
            for row in transformed_batch:
                try:
                    pg_cur.execute(single_sql, tuple(row))
                    pg_conn.commit()
                    migrated += 1
                except Exception as e2:
                    pg_conn.rollback()
                    errors += 1
                    if errors <= 10:
                        print(f"    Row error: {e2}")

    ss_cur.close()
    pg_cur.close()
    return migrated, errors


def main():
    print("Connecting to databases...")
    ss_conn = get_sqlserver_connection()
    pg_conn = get_postgres_connection()

    try:
        pg_conn.autocommit = True
        pg_cur = pg_conn.cursor()

        print("\nDropping existing tables...")
        for table in reversed(ALL_PG_TABLES):
            pg_cur.execute(f"DROP TABLE IF EXISTS {table} CASCADE")
        print(f"  Dropped {len(ALL_PG_TABLES)} tables")

        print("\nEnsuring collation exists...")
        pg_cur.execute(CREATE_COLLATION_SQL)
        print("  Collation pt_br_ci_ai ready")

        print("\nCreating tables...")
        for stmt in DDL_STATEMENTS:
            pg_cur.execute(stmt)
        print(f"  Created {len(ALL_PG_TABLES)} tables")

        pg_cur.close()

        print("\nMigrating data...")
        pg_conn.autocommit = False
        results = {}

        for config in TABLES:
            source = config["source"]
            target = config["target"]
            print(f"\n  {source} -> {target}...")
            migrated, errors = migrate_table(ss_conn, pg_conn, config)
            results[target] = (migrated, errors)
            status = f"{migrated} rows"
            if errors:
                status += f" ({errors} errors)"
            print(f"    Done: {status}")

        pg_conn.autocommit = True
        pg_cur = pg_conn.cursor()

        print("\nResetting sequences...")
        for config in TABLES:
            seq = config.get("serial_seq")
            if seq:
                col = config["serial_col"]
                table = config["target"]
                pg_cur.execute(f"SELECT MAX({col}) FROM {table}")
                max_val = pg_cur.fetchone()[0]
                if max_val is not None:
                    pg_cur.execute(f"SELECT setval('{seq}', {max_val})")
                    print(f"  {seq} -> {max_val} (next: {max_val + 1})")
                else:
                    print(f"  {seq} -> table empty, keeping default")

        print("\nCreating indexes...")
        for stmt in INDEX_STATEMENTS:
            pg_cur.execute(stmt)
        print(f"  {len(INDEX_STATEMENTS)} indexes created")

        print("\nFinal report:")
        print(f"  {'Table':<20} {'Source':>10} {'Migrated':>10} {'Errors':>10}")
        print(f"  {'-'*20} {'-'*10} {'-'*10} {'-'*10}")
        total_source = 0
        total_migrated = 0
        total_errors = 0
        ss_cur = ss_conn.cursor()
        for config in TABLES:
            source = config["source"]
            target = config["target"]
            ss_cur.execute(f"SELECT COUNT(*) FROM [{source}]")
            source_count = ss_cur.fetchone()[0]
            migrated, errors = results[target]
            total_source += source_count
            total_migrated += migrated
            total_errors += errors
            match = "OK" if migrated == source_count else "MISMATCH"
            print(f"  {target:<20} {source_count:>10} {migrated:>10} {errors:>10}  {match}")
        ss_cur.close()
        print(f"  {'TOTAL':<20} {total_source:>10} {total_migrated:>10} {total_errors:>10}")

        pg_cur.close()
        print("\nMigration complete!")

    except Exception:
        traceback.print_exc()
        sys.exit(1)
    finally:
        ss_conn.close()
        pg_conn.close()


if __name__ == "__main__":
    main()