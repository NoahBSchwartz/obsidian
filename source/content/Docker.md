### Docker Basics
- Run Docker From Terminal:`docker run --name hello_world_container hello-world`
- See all Containers: `docker ps -a`
	- See Running Containers: `docker ps`
- Remove Containers: `docker rm hello_world_container`
- Run an image interactively: `docker run -it ubuntu`
	- To exit: `exit`
### Docker Compose
Orchestration Tool which helps work with multiple containers
- Config File:![[Screenshot 2024-01-18 at 11.12.00 AM.png]]
- Start: `docker compose up -d`
- View all running instances: `docker compose ps`
- Stop: `docker compose down`