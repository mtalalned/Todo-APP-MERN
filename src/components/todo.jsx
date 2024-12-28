import React from 'react'

const Todo = ({item , index , funcDel , funcEdit , funcEditModal}) => {
  return (
    <>
        <div className='flex justify-between gap-20 items-center py-3 bg-white rounded-lg p-5 w-[100%]'>
          <div className='flex justify-start items-center gap-5 w-[60%]'>
            <p className='text-center w-[5%]'>{index+1}.</p>
            <div className='flex flex-col justify-center w-[95%]'>
                <p className='text-start break-all font-bold'>{item.title}</p>
                <p className='text-start break-all'>{item.description}</p>
            </div>
          </div>
          <div className='flex gap-2 w-[40%]'>
            <button className="bg-red-400 rounded-md text-white py-1 w-[100px] hover:bg-red-500 transition duration-300 ease-in-out font-semibold" onClick={()=> funcDel (item , index)}>Delete</button>
            <button className="bg-green-400 rounded-md text-white py-1 w-[100px] hover:bg-green-500 transition duration-300 ease-in-out font-semibold" onClick={()=> funcEditModal (item , index)}>Edit</button>
          </div>
        </div>
    </>
  )
}

export default Todo
