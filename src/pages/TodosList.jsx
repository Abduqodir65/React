import { useEffect, useState } from "react";
import { useAddTodoMutation, useDeleteTodoMutation, useEditCompletedMutation, useGetTodosQuery } from "../redux/apiSlice";
import { Loader2Icon } from "lucide-react";

const TodoList = () => {
    const [newTodo, setNewTodo] = useState("");
    const [editingTodo, setEditingTodo] = useState(null);
    const [editText, setEditText] = useState("");

    const { data: todos, isError, isLoading } = useGetTodosQuery();

    console.log(todos);
    
    const [deleteTodo, { isSuccess: deleteSuccess, data:deletedTodo,originalArgs:deletingTodoId , isLoading:deleteIsLoading}] = useDeleteTodoMutation();
    
    const [addTodo, { isLoading: addTodoLoading }] = useAddTodoMutation();
    const [editCompleted,{isLoading:toogleLoading,originalArgs:tooglingTodo}] = useEditCompletedMutation()

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!newTodo.trim()) return;
        setNewTodo(e.target.value);
        addTodo({
            text: newTodo,
            from:'10.24.2003',
            to : '10.24.2003',
            userId : 1,
            isCompleted: false
        })
        setNewTodo("");
    };

    const handleDelete = (id) => {
        deleteTodo(id)
    };

    const handleToggle = (id) => {  
        let todo = todos.find(t=>t.id==id)      
        editCompleted({
            ...todo,
            isCompleted : !todo.isCompleted
        })
    };

    const startEditing = (id) => {
        setEditingTodo(id)
        let todo = todos.find(t=>t.id==id)  
        setEditText(todo.text)
    };

    const handleEdit = async (id) => {
        let todo = todos.find(t=>t.id==id)      
        editCompleted({
            ...todo,
            text : editText
        })
        setEditText("")
        setEditingTodo(null)
    };

    if (isLoading) return <div className='text-center'>Loading...</div>;
    if (isError)
        return <div className='text-center text-error'>Error loading todos</div>;

    return (
        <div className='max-w-xl mx-auto p-4'>
            <h1 className='text-2xl font-bold text-center mb-8'>Todo List</h1>

            <form onSubmit={handleSubmit} className='flex gap-2 mb-8'>
                <input
                    type='text'
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    placeholder='Add new todo'
                    className='input input-bordered flex-1'
                />
                <button type='submit' disabled={addTodoLoading} className='btn btn-primary'>
                    Add
                </button>
            </form>

            <ul className='space-y-4'>
                {todos?.map((todo) => (
                    <li
                        key={todo.id}
                        className='flex items-center gap-4 bg-base-200 p-4 rounded-lg'
                    >
                        <input
                            type='checkbox'
                            checked={todo.isCompleted}
                            onChange={() => handleToggle(todo.id)}
                            className='checkbox'
                        />

                        {editingTodo === todo.id ? (
                            <div className='flex-1 flex gap-2 items-center'>
                                <input
                                    type='text'
                                    value={editText}
                                    onChange={(e) => setEditText(e.target.value)}
                                    className='input input-bordered flex-1'
                                />
                                <button
                                    onClick={() => handleEdit(todo.id)}
                                    className='btn btn-success btn-sm'
                                >
                                    Save
                                </button>
                                <button
                                    onClick={() => setEditingTodo(null)}
                                    className='btn btn-active btn-sm'
                                >
                                    Cancel
                                </button>
                            </div>
                        ) : (
                            <>
                                <span
                                    className={`flex-1 ${todo.isCompleted ? "line-through text-base-content/70" : ""
                                        }`}
                                >
                                    { (toogleLoading && tooglingTodo.id == todo.id ) ? <span className="loading loading-spinner loading-lg"/> : todo.text }
                                </span>
                                <button
                                    onClick={() => startEditing(todo.id)}
                                    className='btn btn-active btn-sm'
                                >
                                    Edit
                                </button>
                            </>
                        )}

                        <button
                            onClick={() => handleDelete(+todo.id)}
                            className='btn btn-error btn-sm'
                        >
                           {(deleteIsLoading && deletingTodoId == todo.id) ? <Loader2Icon/> : 'Delete'}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TodoList;
