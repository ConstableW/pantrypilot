FROM python:3.11-slim

WORKDIR /app

COPY . /app/

RUN apt-get update && apt-get install -y \
    gcc \
    libffi-dev \
    libssl-dev \
    python3-dev \
    build-essential \
    && pip install fastapi uvicorn \
    && chmod +x /run.sh

CMD [ "/run.sh" ]
