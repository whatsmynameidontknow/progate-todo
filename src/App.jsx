import { useState } from 'react';
import '@/App.css';
import TodoContext from '@/contexts/TodoContext';
import Form from '@/components/layout/Form';
import TodoList from '@/components/TodoList';
import { load, save } from '@/lib/storage';
import { useEffect } from 'react';

function App() {
    const [todos, setTodos] = useState(load());
    const addTodo = (todo) => {
        setTodos([...todos, todo]);
    };
    const toggleCompletion = (todoID) => {
        setTodos(
            todos.map((todo) => {
                if (todo.ID === todoID) {
                    todo.isDone = !todo.isDone;
                }
                return todo;
            })
        );
    };
    const deleteTodo = (todoID) => {
        setTodos(todos.filter((todo) => todo.ID !== todoID));
    };
    const updateTodo = (newTodo) => {
        setTodos(
            todos.map((todo) => {
                if (todo.ID === newTodo.ID) {
                    return newTodo;
                }
                return todo;
            })
        );
    };
    const clearTodos = () => {
        setTodos([]);
    };

    useEffect(() => {
        save(todos);
    }, [todos]);

    return (
        <TodoContext.Provider
            value={{ addTodo, toggleCompletion, deleteTodo, updateTodo }}
        >
            <main className="w-ful h-[92dvh] lg:h-[88dvh] justify-center border-2 rounded-md py-2 px-4 border-gray-800">
                <div className="h-2/6 lg:mb-2">
                    <h1 className="text-center font-rocksalt mb-2 font-extrabold">
                        A Todo List App
                    </h1>
                    <div className="h-4/5">
                        <Form
                            onSubmit={addTodo}
                            buttonText="Add Todo"
                            className={'lg:flex-row lg:space-y-0 lg:space-x-1'}
                            inputFieldClassName={'lg:h-full lg:w-10/12'}
                            buttonClassName={'lg:w-2/12 lg:h-full'}
                        />
                    </div>
                </div>
                <hr className="border-[1px] border-gray-600" />
                <div className="h-4/6">
                    <h2 className="h-[8%] lg:h-[10%] font-rocksalt mt-2 font-extrabold">
                        Todo List
                    </h2>
                    <div className="h-[90%] lg:h-[85%]">
                        <TodoList todos={todos} onClear={clearTodos} />
                    </div>
                </div>
            </main>
        </TodoContext.Provider>
    );
}

export default App;
