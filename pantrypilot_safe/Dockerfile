ARG BUILD_FROM
FROM $BUILD_FROM

WORKDIR /app
COPY . /app/

RUN apk add --no-cache python3 py3-pip \
    && pip install --upgrade pip --break-system-packages \
    && pip install --break-system-packages fastapi uvicorn \
    && chmod +x /run.sh

CMD [ "/run.sh" ]
