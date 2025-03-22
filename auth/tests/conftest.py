# tests/conftest.py
import pytest
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from models import * 
from db.base import Base

# Fixture para criar uma sessão de teste
@pytest.fixture(scope='module')
def test_session():
    engine = create_engine('sqlite:///:memory:')  # Banco de dados em memória
    Base.metadata.create_all(engine)
    Session = sessionmaker(bind=engine)
    session = Session()
    yield session  # Disponibiliza a sessão para os testes
    session.close()
    Base.metadata.drop_all(engine)
