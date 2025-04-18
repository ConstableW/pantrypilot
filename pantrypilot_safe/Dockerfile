ARG BUILD_FROM
FROM $BUILD_FROM

WORKDIR /app
COPY . /app/
COPY rootfs / # Wichtig: rootfs wird korrekt eingebunden

RUN apk add --no-cache python3 py3-pip \
    && pip install --upgrade pip --break-system-packages \
    && pip install --break-system-packages fastapi uvicorn

# Kein CMD, S6 übernimmt das
