ARG BUILD_FROM
FROM $BUILD_FROM

WORKDIR /app

# Kopiere alles aus dem aktuellen Verzeichnis in den Container nach /app
COPY . .

# Installiere Python + Abhängigkeiten
RUN apk add --no-cache python3 py3-pip \
    && pip install --upgrade pip --break-system-packages \
    && pip install --break-system-packages fastapi uvicorn \
    && chmod +x run.sh

# Führe das Skript beim Start aus
CMD ["./run.sh"]
