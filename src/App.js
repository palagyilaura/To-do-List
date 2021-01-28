import './App.css';
import React,{useState, useEffect} from 'react';
import Form from './Components/Form';
import TodoList from './Components/TodoList';

function App() {
  //States
  const [inputText,setInputText]= useState("");
  const [todos, setTodos]= useState([]);
  const [status, setStatus] = useState("all");
  const [filteredTodos, setFilteredTodos] = useState([]);
  //Functions
  const filterHandler = () => {
    switch (status){
      case 'completed': 
        setFilteredTodos(todos.filter(todo=> todo.completed ===true));
        break;
      case 'uncompleted': 
        setFilteredTodos(todos.filter(todo=> todo.completed ===false));
        break;
      default: 
        setFilteredTodos(todos);
        break;
    };
  };
  
  useEffect(()=>{
    getLocalTodos();
  },[]);
  //UseEffect
  useEffect(()=>{
    filterHandler();
    saveLocalTodos();
  },[todos,status]);
  
  //Save to local
  const saveLocalTodos = ()=> {   
        localStorage.setItem("todos", JSON.stringify(todos));
    
  };
  const getLocalTodos = () => {
    if(localStorage.getItem("todos")===null){
      localStorage.setItem("todos", JSON.stringify([]));
    }
    else {
      let todoLocal= JSON.parse(localStorage.getItem("todos"));
      setTodos(todoLocal);
    }
  };

  return (
    <div className="App">
      <header>
        <h1>Lara's To-do List</h1>
      </header>
      <Form inputText={inputText} setInputText={setInputText} todos={todos} setTodos={setTodos} setStatus={setStatus}/>
      <TodoList todos={todos} setTodos={setTodos} filteredTodos={filteredTodos}/>
    </div>
  );
}

export default App;
