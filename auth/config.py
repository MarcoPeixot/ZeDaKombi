import os

from pydantic import BaseSettings, Field

from dotenv import load_dotenv

load_dotenv()
class Settings(BaseSettings):
    db_url: str = Field(..., env='DATABASE_URL')

settings = Settings()

database_url = settings.db_url