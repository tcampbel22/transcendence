DOCKER_COMPOSE_FILE = docker-compose.yml
ENV_FILE = .env
SSL_DIR = backend/nginx/ssl
SSL_CERT = $(SSL_DIR)/cert.pem
SSL_KEY = $(SSL_DIR)/key.pem

# Colors for better output
GREEN = $$(printf '\033[0;32m')
YELLOW = $$(printf '\033[0;33m')
RED = $$(printf '\033[0;31m')
RESET = $$(printf '\033[0m')

all: setup build-frontend up

setup: ssl_cert
	@echo "$(YELLOW)Building docker images...$(RESET)"
#	@docker compose -f $(DOCKER_COMPOSE_FILE) up setup
#	@echo "$(GREEN)Setup built.$(RESET)"

ssl_cert:
	@mkdir -p $(SSL_DIR)
	@if [ ! -f $(SSL_CERT) ] || [ ! -f $(SSL_KEY) ]; then \
		echo "$(YELLOW)Generating SSL certificate...$(RESET)"; \
		openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
			-keyout $(SSL_DIR)/key.pem \
			-out $(SSL_DIR)/cert.pem \
			-subj "/C=FI/ST=Uusimaa/L=Helsinki/O=42/OU=Hive/CN=soyboys.42.fr" \
			2>/dev/null; \
		echo "$(GREEN)SSL certificate generated.$(RESET)"; \
	else \
		echo "$(YELLOW)SSL certificate already exists.$(RESET)"; \
	fi

build-frontend:
	cd frontend && npm install && npm run build
	@if [ ! -d backend/file_service/dist ]; then \
		mv frontend/dist backend/file_service/; \
	fi

up:
	@echo "$(YELLOW)Building docker images...$(RESET)"
	@docker compose -f $(DOCKER_COMPOSE_FILE) up -d
	@echo "$(GREEN)Docker images built.$(RESET)"

down:
	@echo "$(YELLOW)Stopping docker containers...$(RESET)"
	@docker-compose -f $(DOCKER_COMPOSE_FILE) down
#	@docker compose -f $(DOCKER_COMPOSE_FILE) down setup
	@echo "$(GREEN)Docker containers stopped.$(RESET)"

basic: ssl_cert build-frontend
		@echo "$(YELLOW)Building docker images...$(RESET)"
	@docker-compose -f $(DOCKER_COMPOSE_FILE) up -d nginx file_service user_service  googlesignin
	@echo "$(GREEN)Docker images built.$(RESET)"

clean: down
	@echo "$(YELLOW)Removing docker images...$(RESET)"
	@docker system prune -af
	@echo "$(GREEN)Docker images removed.$(RESET)"
	@rm -rf ./frontend/dist
	@rm -rf ./backend/file_service/dist

#WARNING!! THIS WILL PERMANTLY REMOVE THE DB, ONLY USE IN TESTING ENV
db_clean: down
	@read -p "⚠️ $(RED) Are you sure you want to permanently delete the DB files? $(RESET)(y/N): " confirm; \
	if [ "$$confirm" = "y" ] || [ "$$confirm" = "Y" ]; then \
		echo "🗑️ $(YELLOW) Deleting databases...  $(RESET)"; \
		rm -rf ./backend/game_service/database/data/game.db; \
		rm -rf ./backend/user_service/database/data/user.db; \
		echo "🗑️ $(GREEN) databases deleted...  $(RESET)"; \
	else \
		echo "❌ $(GREEN)Aborted. Database not deleted.$(RESET)"; \
	fi

logs:
	@echo "$(YELLOW)Container logs:$(RESET)"
	@docker compose -f $(DOCKER_COMPOSE_FILE) logs
