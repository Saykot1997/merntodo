import { useEffect, useState } from "react"
import axios from "axios"

function App() {

  const [todos, setTodos] = useState([])
  const [todo, setTodo] = useState("")
  const [editModeOpen, setEditModeOpen] = useState(false)
  const [currentTodo, setCurrentTodo] = useState(null)

  const toggleEditMode = (todo = null) => {
    setEditModeOpen(!editModeOpen)
    if (todo) {
      setCurrentTodo(todo)
    }
  }

  useEffect(() => {
    const fatchTodos = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_SERVER}/api/todos`)
        setTodos(res.data.data)
      } catch (error) {
        console.log(error.message)
      }
    }
    fatchTodos()
  }, [])

  const addTodo = async (e) => {
    e.preventDefault()
    if (!todo) {
      return alert("enter todo name")
    }
    try {
      const res = await axios.post(`${process.env.REACT_APP_SERVER}/api/todos`, { name: todo })
      setTodos([...todos, res.data.data])
      setTodo("")
    } catch (error) {
      console.log(error)
    }
  }

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_SERVER}/api/todos/${id}`)
      setTodos([...todos.filter((todo) => todo._id.toString() !== id.toString())])
    } catch (error) {
      console.log(error)
    }
  }

  const updateTodo = async () => {
    if (!currentTodo.name) {
      return alert("enter todo name")
    }
    try {
      const res = await axios.put(`${process.env.REACT_APP_SERVER}/api/todos/${currentTodo._id}`, currentTodo)
      setTodos([...todos.map((todo) => todo._id !== currentTodo._id ? todo : res.data.data)])
      setCurrentTodo("")
    } catch (error) {
      console.log(error)
    }
  }

  console.log(todos)

  return (
    <div className=" bg-gray-100 w-full h-screen">
      <div className=" w-full h-full pt-10">
        <div className=" bg-white w-[700px] mx-auto shadow-md p-5 rounded-md relative">
          <p className=" text-xl text-purple-600 font-bold text-center">Todo List</p>
          <form onSubmit={addTodo} className=" w-full grid grid-cols-4 gap-5 my-3">
            <div className=" col-span-3">
              <input type="text" value={todo} onChange={(e) => setTodo(e.target.value)} placeholder="type todo name" className=" focus:outline-none border p-1 rounded w-full" />
            </div>
            <div className=" col-span-1 flex justify-end">
              <button type="submit" className="  bg-blue-500 py-1 px-2 rounded text-white">Add</button>
            </div>
          </form>
          {
            todos.map((todo) => {
              return (
                <div className=" bg-gray-100 py-1 px-2 mb-1 flex justify-between">
                  {
                    editModeOpen && currentTodo._id === todo._id ?
                      <input className=" border border-blue-500 rounded py-1 px-2 w-full mr-1 focus:outline-none" value={currentTodo.name} onChange={(e) => setCurrentTodo({ ...currentTodo, name: e.target.value })} />
                      :
                      <p className=" text-lg font-bold text-gray-500">{todo.name}</p>
                  }
                  <div className=" flex items-center gap-2">
                    {
                      editModeOpen && currentTodo._id === todo._id ?
                        <button onClick={updateTodo} className=" bg-blue-500 text-white rounded py-[2px] px-1">Save</button>
                        :
                        <button onClick={() => toggleEditMode(todo)} className=" bg-green-500 text-white rounded py-[2px] px-1">Edit</button>
                    }
                    <button onClick={() => deleteTodo(todo._id)} className=" bg-red-500 text-white rounded py-[2px] px-1">Delete</button>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>

    </div>
  );
}

export default App;
