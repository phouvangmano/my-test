import { useState } from "react";

const TodoList = () => {
    const [newTodo, setNewTodo] = useState("");

    const [todos, setTodos] = useState([
        { text: 'ຮຽນ React', completed: false },
        { text: 'ສ້າງ To-do app', completed: false },
        { text: 'ໃຝ້ຫັດໃຊ້ List & Keys', completed: false },
    ]);

    const addTodo = (e) => {
        e.preventDefault();
        if (newTodo.trim() === "") return; // Prevent adding empty todos

        setTodos([...todos, { text: newTodo, completed: false }]); // Add new todo to list
        setNewTodo(""); // Reset input field
    };

    const toggleTodo = (index) => {
        const updatedTodos = [...todos];
        updatedTodos[index].completed = !updatedTodos[index].completed; // Toggle the completed state
        setTodos(updatedTodos);
    };

    return (
        <div>
            <h2><u>ລາຍການສິງທີ່ຕ້ອງເຮັດ</u></h2>
            <form onSubmit={addTodo}>
                <input
                    value={newTodo}
                    type="text"
                    onChange={(event) => setNewTodo(event.target.value)}
                    placeholder="ເພີ່ມລາຍການໃຫມ່..."
                />
                <button type="submit">ເພີ່ມ</button>
            </form>
            <ul>
                {todos.map((todo, index) => (
                    <li
                        onClick={() => toggleTodo(index)}
                        key={index}
                        style={{ textDecoration: todo.completed ? "line-through" : "none" }}
                    >
                        {todo.text}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TodoList;
