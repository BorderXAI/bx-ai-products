from fastapi import APIRouter, HTTPException
from ..services.db_service import get_creator_by_category, list_creators, list_categories

router = APIRouter()
@router.get("/creators")
async def fetch_creators():
    result = list_creators()
    if not result["success"]:
        raise HTTPException(status_code=500, detail=result["error"])
    return result["data"]

@router.get("/categories")
async def fetch_categories():
    result = list_categories()
    if not result["success"]:
        raise HTTPException(status_code=500, detail=result["error"])
    return result["data"]

# change to post
@router.get("/creators/{category_id}")
async def fetch_creator(category_id: int):
    result = get_creator_by_category(category_id)
    if not result["success"]:
        raise HTTPException(status_code=404, detail=result["error"])
    return result["data"]