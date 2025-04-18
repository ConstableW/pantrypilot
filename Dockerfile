FROM python:3.11-slim

WORKDIR /app

COPY . /app/

RUN pip install fastapi uvicorn && chmod +x /run.sh

CMD [ "/run.sh" ]
