import React, { useState } from 'react'
import './File.css'
import jsonData from './users_data.json'
import { Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';

function Login({setusername}) {

        const [credentials, setCredentials] = useState({ username: '', password: '' });
        const history = useNavigate();
        let data= jsonData
        const handleLogin = () => {
          let admins = data.adminusers
          let found = false;
          admins.forEach((admin)=>{
            if(admin.email === credentials.username && admin.password ===credentials.password)
            {
              localStorage.setItem('data',JSON.stringify(credentials))
              setusername(credentials.username)
              found=true
            }
          })
          if (found) {
            
            history('/'); 
          } else {
            alert('Something went wrong. Please provide correct credentials.');
          }
          
          
        };
  return (
    <div className='main'>
        
        <Row>
               
                <div className="form-box">
                    <div className="form">
                        <span className="title">Login Here</span>
                        <div className="form-container">
			                <input type="email" className="input" placeholder="Email" style={{marginBottom:'2rem'}} onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}/>
			                <input type="password" className="input" placeholder="Password" onChange={(e) => setCredentials({ ...credentials, password: e.target.value })} />
                        </div>
                        <button onClick={handleLogin}>Login</button>
                    </div>
                </div>
                

        </Row>


    </div>
  )
}

export default Login