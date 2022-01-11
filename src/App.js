import TodoList from "./Todo/TodoList";
import React, {useEffect} from "react";
import Context from './context';
import AddTodo from "./Todo/AddTodo";
import Loader from './loader';
import Modal from './modal/Modal'


function App() {
  const [todos, setTodos] = React.useState([
      /* {id : 1, complited : false, title : "Buy butter"},
      {id : 2, complited : true, title : "Buy bread"},
      {id : 3, complited : false, title : "Buy milk"}  */   
    ])
  const [loading, setLoading] = React.useState(true);

    useEffect(() => {
      fetch('https://jsonplaceholder.typicode.com/todos?_limit=5')
        .then(response => response.json())
        .then(todos => {
          setTimeout(() => {
            setTodos(todos);
            setLoading(false);
          }, 2000)         
        })
    }, [])

  function toggleTodo(id) {
    setTodos(
      todos.map(todo => {
        if (todo.id === id){
          todo.complited = !todo.complited
        }
        return todo;
      })
    ) 
  }

  function removeTodo(id) {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  function addTodo(title) {
    setTodos(todos.concat([{
      title: title,
      id: Date.now(),
      complited: false
    }]))
  }
  return (
    <Context.Provider value ={{removeTodo: removeTodo}}>
      <div className="wrapper">
        <h1>React tutorial</h1>
        <Modal />
        <AddTodo onCreate={addTodo}/>

        {loading && <Loader />}
        {todos.length ? <TodoList todos={todos} onToggle={toggleTodo} /> : (loading ? null :
         <p>No todos</p>)}
        
      </div>
    </Context.Provider>    
  );
}

export default App;
