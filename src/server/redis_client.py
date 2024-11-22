import asyncio
from redis import asyncio as aioredis
import os

REDIS_URL = os.getenv("REDIS_URL", "redis://localhost:6379")

# 创建一个 Redis 客户端
redis = None

async def get_redis_client():
    global redis
    if not redis:
        redis = aioredis.from_url(REDIS_URL, decode_responses=True)
    return redis

# 示例调用
async def main():
    client = await get_redis_client()
    await client.set("key", "value")
    value = await client.get("key")
    print("Redis Value:", value)

if __name__ == "__main__":
    asyncio.run(main())
