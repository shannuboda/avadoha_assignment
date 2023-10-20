import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import logo from './assets/2.png'
import './App.css'
import { Button } from 'react-bootstrap';
import Login from './assets/login';
import {Routes, Route, useNavigate} from 'react-router-dom'
import Dashboard from './assets/Dashboard';
import { useState,useEffect } from 'react';
import View from './view';
function App() {
  let navigation = useNavigate()
   let [user, setusername] = useState('')
     useEffect(() => {
      let usermail = localStorage.getItem('data');
      if (usermail) {
        setusername(usermail.username);
      }
    }, [])
  return (
    <>
           <Navbar className="bg-body-tertiary">
        <Container>
          <Navbar.Brand onClick={()=>navigation('/')} style={{cursor:'pointer'}}>
            <img
              alt=""
              src={logo}
              width="40"
              height="35"
              className="d-inline-block align-top"
            />{' '}
            <h2 style={{display:'inline'}}> AVADOHA FRONTEND </h2>
          </Navbar.Brand>
          <Navbar.Collapse className="justify-content-end">
          {user!=='' ? <Button onClick={()=>{
            localStorage.clear()
            navigation('/login')
            location.reload()
          }}>LOGOUT</Button>:''}
          </Navbar.Collapse>
        </Container>
      </Navbar>

        <Routes>
          <Route path='/login' element ={<Login setusername={setusername}></Login>} />
          <Route path='/' element={<Dashboard></Dashboard>} />
          <Route path='/view' element={<View></View>} />
        </Routes>

    </>
  )
}

export default App
