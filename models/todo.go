package models

import (
	"errors"

	"github.com/google/uuid"
)
type Todo struct {
	ID          string `json:"id"`
	Title       string `json:"title"`
	Description string `json:"description"`
	Completed   bool   `json:"completed"`
}
var Todos []Todo
func CreateTodo(title, description string) Todo {
	todo:=Todo{
		ID:uuid.New().String(),
		Title:title,
		Description:description,
		Completed:false,
	}
	Todos=append(Todos,todo)
	return todo
}
func GetAllTodos() []Todo {
	return Todos
}
func GetTodoById(id string) (Todo,error) {
	for _,todo:=range Todos{
		if todo.ID==id{
			
		}
	}
	return Todo{},errors.New("todo not found")
}
func UpdateTodo(id string,title,description string,completed bool)(Todo,bool){
	for i,todo:=range Todos{
		if todo.ID==id{
			Todos[i].Title=title
			Todos[i].Description=description
			Todos[i].Completed=completed
			return Todos[i],true
				}
	}
	return Todo{},false
}
func DeleteTodo(id string) bool {
	for i,t:=range Todos{
		if t.ID==id{
			Todos=append(Todos[:i],Todos[i+1:]...)
			return true
		}
	}
	return false
}
