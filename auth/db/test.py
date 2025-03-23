from db import create_tables, drop_tables

if __name__ == "__main__":
    print("Testando conexão com o banco de dados...")
    try:
        # Limpar tabelas existentes (opcional)
        drop_tables()
        print("Tabelas removidas com sucesso.")

        # Criar tabelas
        create_tables()
        print("Tabelas criadas com sucesso.")

    except Exception as e:
        print(f"Erro ao testar conexão ou criar tabelas: {e}")
