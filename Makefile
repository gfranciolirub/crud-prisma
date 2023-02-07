up:
	docker-compose up -d

prisma-up:
	npx prisma db push

down:
	docker-compose down

migrations:
	npx prisma migrate dev