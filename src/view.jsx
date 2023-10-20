import React from 'react'
import './App.css'
import { useLocation } from 'react-router-dom'

function View() {
    let data = useLocation()
    console.log(data.state)
  return (
    <div>
       <h2 style={{textAlign:'center'}}>USER DATA VIEW</h2>
      <table id="customers">
    <thead>
    <tr>
    <th>Name</th>
    <th>Email</th>
    <th>Password</th>
    <th>Address</th>
    <th>Mobile</th>
  </tr>  
  </thead>
  <tbody>
    <tr>
    <td>{data.state.name}</td>
    <td>{data.state.email}</td>
    <td>{data.state.password}</td>
    <td>{data.state.address}</td>
    <td>{data.state.mobilenumber}</td>
    </tr>
    </tbody>
    </table>
    </div>
  )
}

export default View