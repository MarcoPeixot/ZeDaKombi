from .Ong_routers import router as Ongs_router
from .Beneficiarios_routers import router as Beneficiarios_router
from .Familia_routers import router as Familias_router
from .DistribuicaoRecurso_routers import router as Distribuicoes_router
from .Recursos_routers import router as Recursos_routers
from .EstoqueRecurso_routers import router as EstoqueRecurso_routers
from .Login_routers import router as Login_routers
from .Relatorios_routers import router as Relatorios_routers
from .Campanha_routers import router as Campanha_routers

__all__ = ["Ongs_router", "Beneficiarios_router", "Familias_router", "Distribuicoes_router", "Recursos_routers", "EstoqueRecurso_routers", "Login_routers", "Relatorios_routers", "Campanha_routers"]
