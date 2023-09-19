import React, { useState } from "react";
import Modal from "./Modal";
import { deleteContactbyId } from "../services/callApi";

const Table = ({data}) => {

  // Handle Delete 
  const handleOnDelete = async (id) => {

    let response = await deleteContactbyId(id)

    if(response.status){
      alert('Data deleted successffulyy')
      window.location.reload(false);
    }else {
      alert('Something went wrong please try again later')
    }

  }

  // Handle Check box

  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isCheck, setIsCheck] = useState([]);
  const [list, setList] = useState([]);


  const handleCheckClick = (e) => {
    const {id, checked} = e.target
    console.log(checked)
    if(checked){
      setIsCheck([...isCheck, id])
    }else {
      setIsCheck(isCheck.filter(ele => ele.id !== id))
    }
    console.log(isCheck)
  }

  return (
    <div className="container">
      <table className="table my-5">
        <thead>
          <tr>
            <th scope="col">  <input className="form-check-input mx-1" type="checkbox" /> </th>
            <th scope="col">Contact</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Address</th>
            <th scope="col">Active</th>
            <th scope="col">Create At</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            data.length === 0 ? <tr></tr> : data.map(ele => {
              return (
                <>
                  <tr key={ele.id} >
                    <th scope="row"> <input className="form-check-input mx-1" type="checkbox" key={ele.id} checked={isCheck.includes(ele.id)} onClick={handleCheckClick} id={ele.id} /> </th>
                    <th scope="row"> {ele.phone} </th>
                    <td>{ele.name}</td>
                    <td>{ele.email}</td>
                    <td>{ele.address}</td>
                    <td>{ele.active ? "Active" : "Inactive"}</td>
                    <td>{ele.created_at.split('T')[0]}</td>
                    <td> 
                      <button data-bs-toggle="modal" data-bs-target="#editModal" >
                        <i className="ri-edit-box-line" ></i>
                      </button> 
                      <button onClick={() => handleOnDelete(ele.id)} >
                        <i className="ri-delete-bin-5-line"></i>
                      </button> 
                    </td>
                  </tr>
                  <Modal id='editModal' elementId={ele.id} />
                </>
              )
            })
          }
          
        </tbody>
      </table>
    </div>
  );
};

export default Table;
