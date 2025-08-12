ENV_FILE = .env
DIR_NAMES = game_service user_service file_service auth_service nginx

# Colors for better output
GREEN = $$(printf '\033[0;32m')
YELLOW = $$(printf '\033[0;33m')
RED = $$(printf '\033[0;31m')
RESET = $$(printf '\033[0m')

all: build-frontend

build-frontend:
	
	@echo "$(YELLOW)Building frontend...$(RESET)"
	cd frontend && npm install && npm run build
	@cp frontend/loading.html frontend/dist
	@echo "$(YELLOW)Removing old dist...$(RESET)"
	rm -rf backend/nginx/dist
	@echo "$(YELLOW)Adding new dist...$(RESET)"
	@if [ ! -d backend/file_service/dist ]; then \
		mv frontend/dist backend/nginx/; \
	fi

basic: build-frontend
	@echo "$(YELLOW)Deploying nginx...$(RESET)"
	@fly deploy backend/nginx
	@echo "$(GREEN)Docker images built.$(RESET)"


clean: down
	@echo "$(YELLOW)Removing dist...$(RESET)"
	@rm -rf ./frontend/dist
	@rm -rf ./backend/nginx/dist
	@echo "$(GREEN)dist removed.$(RESET)"


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


re: clean all

re_basic: clean basic

%:
	@:
