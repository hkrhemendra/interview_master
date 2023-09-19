import React, { useEffect, useState, useRef } from 'react'
import { getContactById, postContacts, updateContact } from '../services/callApi';

const Modal = ({id, elementId = ''}) => {

  const modalTitle = id === "addModal" ? 'Add Contact' : 'Edit Contact';

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: ''
  })

  // error handle in form 
  const [showAlert, setShowAlert] = useState(false);
  const [error, setError] = useState('')


  // Handle Change INPUT
  const handleChange = (e) => {
    const updatedFormData = {...formData}
    updatedFormData[e.target.name] = e.target.value
    setFormData(updatedFormData)
  }

  // Handle Submit Button
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = id === 'addModal' ?  await postContacts(formData) : await updateContact(formData, elementId)
    if(response.status === true){
      id === 'addModal' ? alert('Data added succeffully') : alert('Data updated successfully')
      window.location.reload(false);
    }else {
      const listError = response.data.errors.map((ele) => ele.msg)
      setError(listError)
      setShowAlert(true)
      setTimeout(() => {
        setShowAlert(false)
      }, 3000)
    }
  } 

  const initialized = useRef(false);

  useEffect(() => {
    async function setEditForm() {
      if(!initialized.current){
        initialized.current = true
        if(id === "editModal"){
          const response = await getContactById(elementId);
          if(response.status === true){
            const idData = response.data.data
            setFormData({
              name: idData.name,
              email: idData.email,
              phone: idData.phone,
              address: idData.address
            })
          }
        }
      }
    }
    setEditForm()
  }, [elementId, id])

  return (
    <>
      <div className="modal fade" id={id} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">{modalTitle}</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              {/* Alert Box */}
              {
                showAlert ? 
                  (<div className="alert alert-danger" role="alert">
                    {error.length === 0 ? 
                    ( <div></div> ): 
                    error.map(ele => {
                      return (
                        <li> {ele} </li>
                      )
                    })
                  }
                  </div>) : 
                  <div></div>
              }
            
              {/* Alert Box End */}
            {/* Start Form  */}
            <form>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Full Name</label>
                <input type="email" className="form-control" onChange={handleChange} value={formData.name} name='name' id="exampleInputEmail1" aria-describedby="emailHelp"/>
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Phone</label>
                <input type="type" className="form-control" name='phone' onChange={handleChange} value={formData.phone} id="exampleInputPassword1"/>
              </div> 
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Email</label>
                <input type="type" className="form-control" name='email' onChange={handleChange} value={formData.email} id="exampleInputPassword1"/>
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Address</label>
                <input type="type" className="form-control" name='address' onChange={handleChange} value={formData.address} id="exampleInputPassword1"/>
              </div>
            </form>
            {/* End Form */}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" onClick={handleSubmit} >Save changes</button>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default Modal
