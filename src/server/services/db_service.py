from supabase import create_client, Client
import os

# Replace these with your actual Supabase URL and Key
SUPABASE_URL = "https://kwztiigugrqrgcxdqxui.supabase.co"
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

# Initialize Supabase Client
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

def list_categories():
    """
    List all categories from the database.
    """
    response = supabase.table("categories").select("*").execute()
    if response.data:
        return {"success": True, "data": response.data}
    return {"success": False, "error": response.error}

def list_creators():
    """
    List all creators from the database.
    """
    response = supabase.table("creators").select("*,category(*)").execute()
    if response.data:
        return {"success": True, "data": response.data}
    return {"success": False, "error": response.error}


#TODO: filter by min_followers + max_budget
def get_creator_by_category(category_id: int):
    """
    Fetch a creator by ID from the database.
    """
    response = supabase.table("creators").select("*,category(*)").eq("category", category_id).execute()
    if response.data:
        return {"success": True, "data": response.data}
    return {"success": False, "error": response.error}