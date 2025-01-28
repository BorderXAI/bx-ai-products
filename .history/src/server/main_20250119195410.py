from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
# from .routes.tiktok_routes import router as tiktok_router
# from .routes.creators import router as creators_router
from .routes.sentiment import router as sentiment_router  

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Vite's default port
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
# app.include_router(tiktok_router)
# app.include_router(creators_router, prefix="/api")
app.include_router(sentiment_router, prefix="/api/sentiment", tags=["Sentiment Analysis"])

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("src.server.main:app", host="0.0.0.0", port=8000, reload=True)
