import asyncio
from redis import asyncio as aioredis

REDIS_URL = "redis://localhost:6379"

async def main():
    redis = aioredis.from_url(REDIS_URL, decode_responses=True)
    await redis.set("key", "value")
    value = await redis.get("key")
    print("Redis Value:", value)

asyncio.run(main())
