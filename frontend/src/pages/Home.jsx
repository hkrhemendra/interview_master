import React, { useEffect, useState } from 'react'
import Table from '../components/Table'
import Navbar from '../components/Navbar'
import { getlAllContact } from '../services/callApi'

const Home = () => {

  // All data defined
  const [data, setData] = useState([])

  // Search Module Start
  // Keys for search Functionality
  const [searchKey, setSearchKey] = useState('')

  // Handle Search change
  const handleSearchChange = (event) => {
    setSearchKey(event.target.value)
  }
  
  // Handle Search Submit
  const handleSearchSubmit = (event) => {
    event.preventDefault();
    if(searchKey === ''){
      setDataValue()
    }else {
      const filteredData = data.filter(ele => {
        return ele.name.includes(searchKey)
      })
      setData(filteredData)
    }
  }

  // Search Module End


  // inc and dec functions Start

  const sortData = (sortBy) => {
    let sortedData = [...data]
    sortedData = sortedData.sort((a, b) => {
      return sortBy === 'asc' ? a.id - b.id : b.id - a.id
    })
    setData(sortedData)
  }

  // inc and dec functions End


  async function setDataValue(){
    const response = await getlAllContact()
    if(response.status === true){
      setData(response.data.data)
    }
  }

  useEffect(() => {
    setDataValue()
  }, [])

  return (
    <div>
      <Navbar
        searchKey = {searchKey}
        handleSearchChange = {handleSearchChange}
        handleSearchSubmit = {handleSearchSubmit}
        handleResetSearch = {setDataValue}
        handleSort = {sortData}
      />
      <Table data={data} />
    </div>
  )
}

export default Home
