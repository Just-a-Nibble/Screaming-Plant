# syntax=docker/dockerfile:1

FROM node:20.9 as frontend
COPY frontend/ frontend/
WORKDIR frontend/

RUN \
	npm ci && \
	npm run build

FROM python:3.11 as backend
COPY backend/ backend/
WORKDIR backend/

EXPOSE 80

RUN pip install -r requirements.txt

COPY --from=frontend frontend/dist/ app/static/

CMD \
	flask run \
		--host=0.0.0.0 \
		--port=80

