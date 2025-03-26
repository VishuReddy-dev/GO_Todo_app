package handlers

import (
	"github.com/VishuReddy-dev/crud/models"
	"github.com/gofiber/fiber/v2"
)
func GetTodos(c *fiber.Ctx) error {
	return c.JSON(models.GetAllTodos())
}
func CreateTodo(c *fiber.Ctx) error {
	type request struct {
		Title string `json:"title"`
		Description string `json:"description"`
	}
	var body request
	if err:=c.BodyParser(&body); err!=nil{
		return c.Status(400).JSON(fiber.Map{"error":"Inavlid request"})
	}
	todo:=models.CreateTodo(body.Title,body.Description)
	return c.Status(201).JSON(todo)
}
func UpdateTodo(c *fiber.Ctx) error{
	id:=c.Params("id")
	type request struct{
		Title string `json:"title"`
		Description string `json:"description"`
		Completed bool `json:"completed"`
	}
	var body request
	if err:=c.BodyParser(&body); err!=nil{
		return c.Status(400).JSON(fiber.Map{"error":"Invalid request"})
	}
	todo,found:=models.UpdateTodo(id,body.Title,body.Description,body.Completed)
	if !found{
		return c.Status(404).JSON(fiber.Map{"error":"object not found"})
	}
	return c.JSON(todo)
}
func DeleteTodo(c *fiber.Ctx) error{
	id:=c.Params("id")
	if success:=models.DeleteTodo(id);!success{
		return c.Status(404).JSON(fiber.Map{"error":"Todo not found"})
	}
	return c.JSON(fiber.Map{"message":"Todo deleted"})
}