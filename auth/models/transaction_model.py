from sqlalchemy import Column, Integer, String, Float, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime
from db.base import Base

class Transaction(Base):
    __tablename__ = "transactions"

    id_transaction = Column(Integer, primary_key=True, index=True)
    from_id = Column(Integer, ForeignKey("users.id"))
    to_id = Column(Integer, ForeignKey("users.id"))
    amount = Column(Float)
    token_type = Column(String)  # zec, eth, btc, near
    status = Column(String, default="pending")  # pending, completed, failed
    tx_hash = Column(String, nullable=True)
    timestamp = Column(DateTime, default=datetime.utcnow)

    from_user = relationship("User", foreign_keys=[from_id])
    to_user = relationship("User", foreign_keys=[to_id])
