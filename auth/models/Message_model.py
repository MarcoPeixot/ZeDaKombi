# models/Message_model.py
from sqlalchemy import Integer, Text, TIMESTAMP, ForeignKey
from sqlalchemy.orm import relationship, mapped_column
from db.base import Base

class Message(Base):
    __tablename__ = "messages"

    id = mapped_column(Integer, primary_key=True)
    user_id = mapped_column(Integer, ForeignKey("users.id"))
    message = mapped_column(Text, nullable=False)
    created_at = mapped_column(TIMESTAMP, server_default='NOW()')

    # Relacionamento com string
    user = relationship("User", back_populates="messages")