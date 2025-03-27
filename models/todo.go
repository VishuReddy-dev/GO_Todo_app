package models

import (
	"errors"

	"github.com/VishuReddy-dev/crud/database"
)
type Todo struct {
	ID          string `json:"id"`
	Title       string `json:"title"`
	Description string `json:"description"`
	Completed   bool   `json:"completed"`
	CreatedAt   string `json:"created_at"`
}

func CreateTodo(title, description string) (Todo,error) {
	var todo Todo
	err := database.DB.QueryRow(
		"INSERT INTO todos (title,description) VALUES ($1,$2) RETURNING id,title,description,completed,created_at",
		title, description,
	).Scan(&todo.ID, &todo.Title, &todo.Description, &todo.Completed, &todo.CreatedAt)
	return todo, err
}
func GetAllTodos() ([]Todo,error) {
	rows,err:=database.DB.Query("SELECT * FROM todos")
	if err!=nil{
		return nil,err
	}
	defer rows.Close()
	var todos []Todo
	for rows.Next(){
		var todo Todo
		err :=rows.Scan(&todo.ID,&todo.Title,&todo.Description,&todo.Completed,&todo.CreatedAt)
		if err!=nil{
			return nil,err
		}
		todos=append(todos, todo)
	}
	return todos,nil
}
func GetTodoById(id string) (Todo,error) {
	row,err:=database.DB.Query("SELECT * FROM todos WHERE id=$1",id)
	if err!=nil{
		return Todo{},err
	}
	defer row.Close()
	var todo Todo
	if row.Next(){
		err=row.Scan(&todo.ID,&todo.Title,&todo.Description,&todo.Completed,&todo.CreatedAt)
		if err!=nil{
			return Todo{},err
		}
		return todo,nil
	}
	return Todo{},errors.New("todo not found")
}
func UpdateTodo(id string,title,description string,completed bool)(Todo,bool){
	_,err:=database.DB.Exec("UPDATE todos SET title=$1,description=$2,completed=$3 WHERE id=$4",title,description,completed,id)
	if err!=nil{
		return Todo{},false;
	}
	todo,err:=GetTodoById(id)
	if err!=nil{
		return Todo{},false;
	}
	return todo,true;
}
func DeleteTodo(id string) bool {
	_,err:=database.DB.Exec("DELETE FROM todos WHERE id=$1",id)
	// if err!=nil{
	// 	return false
	// }
	// return true
	return err==nil;
}
