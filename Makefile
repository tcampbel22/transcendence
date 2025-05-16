DOCKER_COMPOSE_FILE = docker-compose.yml
ENV_FILE = .env
DIR_NAMES = game_service user_service file_service googleAuth nginx

# Colors for better output
GREEN = $$(printf '\033[0;32m')
YELLOW = $$(printf '\033[0;33m')
RED = $$(printf '\033[0;31m')
RESET = $$(printf '\033[0m')

all: ssl_cert build-frontend up

ssl_cert:
	@mkdir -p ./backend/nginx/ssl
	@for name in $(DIR_NAMES); do \
	SSL_DIR=./backend/$$name/ssl; \
	mkdir -p $$SSL_DIR; \
	SSL_CERT=$$SSL_DIR/cert.pem; \
	SSL_KEY=$$SSL_DIR/key.pem; \
	if [ ! -f $$SSL_CERT ] || [ ! -f $$SSL_KEY ]; then \
		echo "$(YELLOW)Generating SSL certificate for $$name...$(RESET)"; \
		openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
			-keyout $$SSL_KEY \
			-out $$SSL_CERT \
			-subj "/C=FI/ST=Uusimaa/L=Helsinki/O=42/OU=Hive/CN=nginx" \
			2>/dev/null; \
		echo "$(GREEN)SSL certificate generated.$(RESET)"; \
	else \
		echo "$(YELLOW)SSL certificate already exists.$(RESET)"; \
	fi; \
	if [ "$$name" != "nginx" ]; then \
		cp $$SSL_CERT ./backend/nginx/ssl/$$name.cert.pem; \
		cp $$SSL_KEY ./backend/nginx/ssl/$$name.key.pem; \
	else \
		cp $$SSL_CERT ./backend/user_service/ssl/nginx.cert.pem; \
		cp $$SSL_CERT ./backend/game_service/ssl/nginx.cert.pem; \
	fi; \
	done

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
	@docker-compose -f $(DOCKER_COMPOSE_FILE) up -d nginx file_service user_service  game_service googlesignin
	@echo "$(GREEN)Docker images built.$(RESET)"

redo:
	@echo "$(YELLOW)Stopping container...$(RESET)"
	@if [ "$(filter-out $@,$(MAKECMDGOALS))" ]; then \
		echo "$(YELLOW)Rebuilding specific service: $(filter-out $@,$(MAKECMDGOALS))...$(RESET)"; \
		docker compose -f $(DOCKER_COMPOSE_FILE) down $(filter-out $@,$(MAKECMDGOALS)); \
		docker compose -f $(DOCKER_COMPOSE_FILE) up --build -d $(filter-out $@,$(MAKECMDGOALS)); \
	else \
		echo "$(YELLOW)Rebuilding all services...$(RESET)"; \
		docker compose down; \
		docker compose up --build -d; \
	fi
	@echo "$(GREEN)Rebuild complete.$(RESET)"

clean: down
	@echo "$(YELLOW)Removing docker images...$(RESET)"
	@docker system prune -af
	@echo "$(GREEN)Docker images removed.$(RESET)"
	@rm -rf ./frontend/dist
	@rm -rf ./backend/file_service/dist
	@rm -rf ./backend/nginx/ssl
	@rm -rf ./backend/game_service/ssl
	@rm -rf ./backend/user_service/ssl
	@rm -rf ./backend/file_service/ssl
	@rm -rf ./backend/googleAuth/ssl

#WARNING!! THIS WILL PERMANTLY REMOVE THE DB, ONLY USE IN TESTING ENV
db_clean: clean
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

re: clean all

re_basic: clean basic

%:
	@:
