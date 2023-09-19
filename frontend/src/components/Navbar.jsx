// import axios from 'axios'
import React from 'react'
import Modal from './Modal'
// import * as qs from 'qs'

const Navbar = ({searchKey, handleSearchChange, handleSearchSubmit, handleResetSearch, handleSort}) => {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary" style={{backgroundColor: "#e3f2fd"}}>
        <div className="container-fluid">
          <a className="navbar-brand" href='/'>Contact</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            </ul>
            
            <form className="d-flex" role="search" onSubmit={handleSearchSubmit}>
              <input className="form-control me-2" type="search" onChange={handleSearchChange} value={searchKey} placeholder="Search" aria-label="Search"/>
            </form>
            <button className="btn btn-outline-success mx-2 my-1" onClick={() => handleResetSearch()}  type="button"><i className="ri-loop-right-fill"></i></button>
            <button className="btn btn-outline-success mx-2 my-1" onClick={() => handleSort('asc')} type="button"><i className="ri-upload-2-line"></i></button>
            <button className="btn btn-outline-success mx-2 my-1" onClick={() => handleSort('dsc')} type="button"><i className="ri-download-2-line"></i></button>
            <button className="btn btn-outline-success mx-2 my-1"  data-bs-toggle="modal" data-bs-target="#addModal" type="button"><i className="ri-add-fill"></i></button>
            {/* Modal Start */}
            <Modal id="addModal" />
            {/* Modal End */}
         </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar
