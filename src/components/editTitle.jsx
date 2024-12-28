import React, { useRef, useState } from 'react'

const EditTitle = ({funcEditModal , funcEdit , item , index}) => {
  
  // const input = useRef()
  // const desInput = useRef()

  const [updatedInput , setUpdatedInput] = useState('')
  const [desInput , setDesInput] = useState('')
  
  
  return (
    <>
      {/* Open the modal using document.getElementById('ID').showModal() method */}
        <div className='fixed top-0 w-[100%] min-h-screen flex justify-center items-center backdrop-blur-md'>
          <div className="modal-box w-[100%]">
            <form onSubmit={(event)=>funcEdit(event , item , index , updatedInput , desInput)} className='flex flex-col gap-2'>
              <input value={updatedInput} onChange={(e) => setUpdatedInput(e.target.value)} type="text" placeholder="Enter title here" style={{backgroundColor: '#ffffff'}} className="min-w-[300px] p-2 border rounded-md bg-slate-500 text-gray-700 focus:ring-2 focus:ring-slate-400 transition duration-300 ease-in-out"/>
              <textarea value={desInput} onChange={(e) => setDesInput(e.target.value)} className="min-w-[300px] p-2 border rounded-md text-gray-700 focus:ring-2 focus:ring-slate-400 transition duration-300 ease-in-out" placeholder="Enter description here"></textarea>
              <button type='submit' className="w-[100%] py-2 rounded-md bg-purple-700 font-semibold text-white hover:bg-purple-500 transition duration-300 ease-in-out">Update Todo</button>
            </form>
            <div className="modal-action">
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn" onClick={() => funcEditModal()}>Close</button>
              </form>
            </div>
          </div>
        </div>
        
    </>
  )
}

export default EditTitle
