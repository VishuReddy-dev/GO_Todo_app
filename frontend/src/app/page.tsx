"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, Plus, ListTodo, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

interface Todo {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  created_at: string;
}

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState({ title: "", description: "" });
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [stats, setStats] = useState({ total: 0, completed: 0 });

  // Fetch todos
  const fetchTodos = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/todos");
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      toast.error("Failed to fetch todos");
    } finally {
      setLoading(false);
    }
  };

  // Add todo
  const addTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodo.title.trim()) {
      toast.error("Title is required");
      return;
    }
    setAdding(true);
    try {
      const response = await fetch("http://localhost:3000/api/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTodo),
      });
      if (response.ok) {
        setNewTodo({ title: "", description: "" });
        fetchTodos();
        toast.success("Todo added successfully");
      }
    } catch (error) {
      toast.error("Failed to add todo");
    } finally {
      setAdding(false);
    }
  };

  // Toggle todo completion
  const toggleTodo = async (todo: Todo) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/todos/${todo.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...todo,
            completed: !todo.completed,
          }),
        }
      );
      if (response.ok) {
        fetchTodos();
        toast.success("Todo updated successfully");
      }
    } catch (error) {
      toast.error("Failed to update todo");
    }
  };

  // Delete todo
  const deleteTodo = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:3000/api/todos/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setTodos(todos.filter(todo => todo.id !== id));
        toast.success("Todo deleted successfully");
      }
    } catch (error) {
      toast.error("Failed to delete todo");
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  useEffect(() => {
    setStats({
      total: todos.length,
      completed: todos.filter(todo => todo.completed).length
    });
  }, [todos]);

  return (
    <div className="container mx-auto p-4 min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header Section */}
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-center bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
        >
          Bento Todo App
        </motion.h1>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Stats Cards */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-none shadow-lg">
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Tasks</p>
                  <h3 className="text-3xl font-bold text-purple-700">{stats.total}</h3>
                </div>
                <ListTodo className="h-8 w-8 text-purple-600" />
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-none shadow-lg">
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Completed</p>
                  <h3 className="text-3xl font-bold text-green-700">{stats.completed}</h3>
                </div>
                <CheckCircle2 className="h-8 w-8 text-green-600" />
              </CardContent>
            </Card>
          </motion.div>

          {/* Add Todo Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-none shadow-lg">
              <CardContent className="p-6">
                <form onSubmit={addTodo} className="space-y-4">
                  <Input
                    placeholder="New task..."
                    value={newTodo.title}
                    onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
                    className="border-none bg-white/50 backdrop-blur-sm"
                  />
                  <Input
                    placeholder="description..."
                    value={newTodo.description}
                    onChange={(e) => setNewTodo({ ...newTodo, description: e.target.value })}
                    className="border-none bg-white/50 backdrop-blur-sm"
                  />
                  <Button 
                    type="submit" 
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    disabled={adding}
                  >
                    {adding ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Todo List - Spans full width */}
          <div className="col-span-1 md:col-span-3">
            <AnimatePresence mode="popLayout">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {todos.map((todo) => (
                  <motion.div
                    key={todo.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    layout
                    className="group"
                  >
                    <Card className={`h-full backdrop-blur-sm transition-all duration-300 ${
                      todo.completed ? 'bg-gray-50/50' : 'bg-white/50'
                    }`}>
                      <CardContent className="p-6 space-y-4">
                        <div className="flex items-start gap-3">
                          <Checkbox
                            checked={todo.completed}
                            onCheckedChange={() => toggleTodo(todo)}
                            className="mt-1"
                          />
                          <div className="flex-1">
                            <h3 className={`font-medium ${
                              todo.completed ? 'line-through text-gray-500' : ''
                            }`}>
                              {todo.title}
                            </h3>
                            <p className="text-sm text-gray-500 mt-1">{todo.description}</p>
                          </div>
                        </div>
                        <motion.div 
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                          whileHover={{ scale: 1.02 }}
                        >
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => deleteTodo(todo.id)}
                            className="w-full"
                          >
                            Delete
                          </Button>
                        </motion.div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
