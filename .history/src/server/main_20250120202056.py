from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
# from .routes.tiktok_routes import router as tiktok_router
# from .routes.creators import router as creators_router
from .routes.sentiment import router as sentiment_router  
from .routes.amazon_reviews_scraper import router as amazon_scraper_router
from .routes.llm_reviews_pain_points import summarize_reviews

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
app.include_router(amazon_scraper_router, prefix="/api/amazon", tags=["Amazon Scraper"])
app.include_router(llm_reviews_router, prefix="/api/llm", tags=["LLM Pain Points"])

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("src.server.main:app", host="0.0.0.0", port=8000, reload=True)
