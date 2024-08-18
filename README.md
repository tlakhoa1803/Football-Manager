Hello everyone, this is the project for one of our courses on the topic of football management. We had just over a week to work on it, so it’s not fully complete. We received a score of 9 for this project. I will guide you on how to run it.

We used Node v20.15.0 for this project.

You will need Golang, Docker, Postman, and SQLtools in VSCode.
First, we run 'docker-compose up -d' in VScode, then create a connection in SQLtools ( Choose MySQL, database: SE104, root, root)
Then, connect database and run 'go run github.com/NMCNPM-football/backend/cmd/app'. This command will create all table that web need.
Finally, import all the databases into MySQL and run the command 'npm start'.
