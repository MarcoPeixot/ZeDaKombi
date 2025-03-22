from db import SessionLocal, engine

# Testando a conexão
try:
    connection = engine.connect()
    print("Conexão com o banco de dados bem-sucedida!")
    connection.close()
except Exception as e:
    print(f"Erro ao conectar ao banco de dados: {e}")

# Criando as tabelas
from db.db import create_tables

try:
    create_tables()
    print("Tabelas criadas com sucesso!")
except Exception as e:
    print(f"Erro ao criar tabelas: {e}")
