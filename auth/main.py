from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.openapi.utils import get_openapi
import uvicorn
from routers import Login_routers
from fastapi.security import HTTPBearer
from routers.transaction_router import router as transaction_router

# Criar uma instância do aplicativo FastAPI
app = FastAPI(title="Autenticador", version="1.0.0")

# Configuração do esquema de segurança para o Swagger
security_scheme = HTTPBearer(
    bearerFormat="JWT",
    scheme_name="Bearer"
)

# Função para personalizar a documentação OpenAPI
def custom_openapi():
    if app.openapi_schema:
        return app.openapi_schema
    
    openapi_schema = get_openapi(
        title=app.title,
        version=app.version,
        description="API para gestão de ONGs e recursos",
        routes=app.routes,
    )
    
    if "components" not in openapi_schema:
        openapi_schema["components"] = {}

    if "securitySchemes" not in openapi_schema["components"]:
        openapi_schema["components"]["securitySchemes"] = {}

    # Adiciona o esquema de segurança corretamente
    openapi_schema["components"]["securitySchemes"]["Bearer"] = {
        "type": "http",
        "scheme": "bearer",
        "bearerFormat": "JWT"
    }

    # Aplica a segurança globalmente
    openapi_schema["security"] = [{"Bearer": []}]
    
    app.openapi_schema = openapi_schema
    return openapi_schema


# Aplica o esquema personalizado
app.openapi = custom_openapi

# Middleware de CORS (mantenha como está)
origins = ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_methods=["*"],
    allow_headers=["*"],
    allow_credentials=True,
    allow_origins=["*"]
)

app.include_router(Login_routers)
app.include_router(transaction_router)

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, log_level="info")