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

all: setup up

setup: ssl_cert
	@echo "$(YELLOW)Building docker images...$(RESET)"
	@docker compose -f $(DOCKER_COMPOSE_FILE) up setup
	@echo "$(GREEN)Setup built.$(RESET)"

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

up:
	@echo "$(YELLOW)Building docker images...$(RESET)"
	@docker-compose -f $(DOCKER_COMPOSE_FILE) up -d
	@echo "$(GREEN)Docker images built.$(RESET)"

down:
	@echo "$(YELLOW)Stopping docker containers...$(RESET)"
	@docker compose -f $(DOCKER_COMPOSE_FILE) down
	@docker compose -f $(DOCKER_COMPOSE_FILE) down setup
	@echo "$(GREEN)Docker containers stopped.$(RESET)"

clean: down
	@echo "$(YELLOW)Removing docker images...$(RESET)"
	@docker system prune -af
	@echo "$(GREEN)Docker images removed.$(RESET)"

logs:
	@echo "$(YELLOW)Container logs:$(RESET)"
	@docker compose -f $(DOCKER_COMPOSE_FILE) logs
