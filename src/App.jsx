import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import Todo from './components/todo'
import EditTitle from './components/editTitle'

const App = () => {
  
  const input = useRef()
  const desinput = useRef()
  const [inputArray , setInputArray ] = useState([])
  const [loader , setLoader] = useState(true)
  const [showModal , setShowModal] = useState(false)
  const [itemNo , setItemNo] = useState(null)
  const [indexNo , setIndexNo] = useState(null)

 useEffect (()=>{

  const fetchData = async () => {
    try {
      const response = await axios.get ('https://subjective-donny-mtpersonal-a0637e12.koyeb.app/api/v1/todo')
      setInputArray (response.data.data)
    } catch (error){
      console.log ('error in fetching data' , error)
    } finally{
      setLoader(false)
    }
  }
  fetchData ()
 } , [])
 
 
  const AddTodo = async (event) => {
    event.preventDefault()
    try {
      const postRequest = await axios.post ('https://subjective-donny-mtpersonal-a0637e12.koyeb.app/api/v1/todo' , {
        title: input.current.value,
        description: desinput.current.value
      })
      setInputArray([...inputArray , postRequest.data.data])
      input.current.value = ''
      desinput.current.value = ''
    } catch (error){
      console.log ('error in adding todo' , error)
    }
  }
  

  const deleteTodo = async (item , index) => {
    try {
      const deleteRequest = await axios.delete (`https://subjective-donny-mtpersonal-a0637e12.koyeb.app/api/v1/todo/${item._id}`)
      inputArray.splice(index , 1)
      setInputArray([...inputArray])
    } catch (error){
      console.log ('error in delete request' , error)
    }
  }

  const editTodo = async (event , item , index , updatedInput , desInput) =>{
    event.preventDefault()
    console.log (updatedInput , desInput)
    try {
      const editRequest = await axios.put(`https://subjective-donny-mtpersonal-a0637e12.koyeb.app/api/v1/todo/${item._id}` , {
        title: updatedInput,
        description: desInput
      })
      console.log (editRequest.data.updatedTodo)
      inputArray[index].title = editRequest.data.updatedTodo.title
      inputArray[index].description = editRequest.data.updatedTodo.description
      setInputArray([...inputArray])
      setShowModal(false)
    } catch (error){
      console.log ('error in editing request' , error)
    }
  }

  const modalControl = (item , index) => {
    if(showModal === false){
      setShowModal(true)
      setItemNo(item)
      setIndexNo(index)
    } else {
      setShowModal(false)
    }
  }


  
  return (
    <div className='p-10 flex flex-col justify-center items-center gap-5'>
      <h1 className='text-center text-5xl font-bold text-white'>TODO APP</h1>
      <form onSubmit={(event) => AddTodo(event)} className='flex gap-5 justify-center items-center w-[60%]'>
        <div className='flex flex-col gap-3 w-[100%]'>
          <input type="text" ref={input} placeholder="Enter title here" style={{backgroundColor: '#ffffff'}} className="min-w-[300px] p-2 border rounded-md bg-slate-500 text-gray-700 focus:ring-2 focus:ring-slate-400 transition duration-300 ease-in-out"/>
          <textarea ref={desinput} className="min-w-[300px] p-2 border rounded-md text-gray-700 focus:ring-2 focus:ring-slate-400 transition duration-300 ease-in-out" placeholder="Enter description here"></textarea>
          <button type='submit' className="w-[100%] py-2 rounded-md bg-purple-700 font-semibold text-white hover:bg-purple-500 transition duration-300 ease-in-out">Add Todo</button>
        </div>
      </form>
      {loader && <span className="loading loading-spinner loading-lg text-white min-h-[25vh]"></span>}
      <div className='flex flex-col gap-4 min-h-[25vh] justify-center w-[60%]'>
        {inputArray.length === 0 && loader === false ? <h1 className='text-white text-2xl font-bold border p-3 rounded-lg text-center'>Enter Todo to get started</h1> : inputArray && inputArray.map ((item , index)=> {
            return <Todo key={item._id} item={item} index={index} funcDel={deleteTodo} funcEditModal={modalControl}/>
          })}
      </div>
      {showModal && <EditTitle funcEditModal={modalControl} funcEdit={editTodo} item={itemNo} index={indexNo}/>}
    </div>
  )
}

export default App
