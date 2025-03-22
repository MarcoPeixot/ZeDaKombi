from sqlalchemy import Integer, String, CheckConstraint
from sqlalchemy.orm import Mapped, mapped_column, validates
from db.base import Base
import re

class Campanha(Base):
    """Define o modelo de dados para Campanha."""

    __tablename__ = "campanhas"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    titulo: Mapped[str] = mapped_column(String(255), nullable=False)
    descricao: Mapped[str | None] = mapped_column(String, nullable=True)
    cor: Mapped[str] = mapped_column(
        String(7),
        CheckConstraint("cor LIKE '#______'", name="check_cor_hex"),
        nullable=False
    )
    prioridade: Mapped[int] = mapped_column(Integer, nullable=False)

    @validates("cor")
    def validate_cor(self, key, value):
        """Valida se a cor está no formato hexadecimal correto."""
        if not re.match(r"^#[0-9A-Fa-f]{6}$", value):
            raise ValueError("A cor deve estar no formato hexadecimal #RRGGBB.")
        return value