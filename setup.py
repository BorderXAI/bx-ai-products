from setuptools import setup, find_packages

setup(
    name="bx-ai-products",
    version="0.1.0",
    packages=find_packages(),
    install_requires=[
        "fastapi>=0.68.0",
        "uvicorn>=0.15.0",
        "aiohttp>=3.8.0",
        "python-dotenv>=0.19.0",
        "pydantic>=1.8.0",
        "apify-client>=1.6.1",
    ],
)
