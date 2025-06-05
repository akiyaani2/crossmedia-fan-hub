.PHONY: all dev-frontend build-frontend lint-frontend test-frontend dev-embed lint-embed test-embed run-ingest run-session lint-scripts supa-start supa-stop

all: lint-frontend lint-embed lint-scripts

### Frontend ###
dev-frontend:
	cd frontend && npm install && npm run dev

build-frontend:
	cd frontend && npm run build

lint-frontend:
	cd frontend && npm run lint

test-frontend:
	cd frontend && npm test

### Embedding Service ###
dev-embed:
	cd services/embedding_service && \\
	pip install -r requirements.txt && \\
	uvicorn embed_service:app --reload --host 0.0.0.0 --port 8000

lint-embed:
	cd services/embedding_service && flake8 .

test-embed:
	cd services/embedding_service && pytest

### Workers ###
run-ingest:
	cd scripts && pip install -r requirements.txt && python ingest.py

run-session:
	cd scripts && pip install -r requirements.txt && python session_worker.py

lint-scripts:
	cd scripts && flake8 .

### Supabase CLI (optional) ###
supa-start:
	cd infra/supabase && supabase start

supa-stop:
	cd infra/supabase && supabase stop 