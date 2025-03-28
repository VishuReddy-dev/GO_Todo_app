package main

import (
	"log"

	"github.com/VishuReddy-dev/crud/database"
	"github.com/VishuReddy-dev/crud/handlers"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger"
)

func main() {
	app := fiber.New()
	app.Use(logger.New())
	app.Use(cors.New(cors.Config{
		AllowOrigins: "http://localhost:3001",
		AllowHeaders: "Origin, Content-Type, Accept",
		AllowMethods: "GET, POST, PUT, DELETE",
	}))
	app.Get("/", func(c *fiber.Ctx) error {
		return c.SendString("Hello, World!")
	})
	if err:=database.Connect();err!=nil{
		log.Fatal(err)
	}
	defer database.DB.Close()
	api:=app.Group("/api")
	todos:=api.Group("/todos")

	todos.Post("/",handlers.CreateTodo)
	todos.Get("/",handlers.GetTodos)
	todos.Get("/:id",handlers.GetTodoById)
	todos.Put("/:id",handlers.UpdateTodo)
	todos.Delete("/:id",handlers.DeleteTodo)
	app.Listen(":3000")
}
