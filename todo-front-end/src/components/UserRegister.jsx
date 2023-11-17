import React, { useState } from "react";
import { Button } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function UserRegister(){
    const navigate = useNavigate();

    const [user, setUser] = useState({
        username: "",
        password: ""
    });

    function handleChange(e){
        const {name, value} = e.target;

        setUser((prevInput)=>{
            return {
                ...prevInput,
                [name]: value
            }
        });
    }
    
    const handleRegistration = (e) => {
    e.preventDefault();

    axios.post('/register', user)
      .then((response) => {
        navigate(`/todo-list/${response.data.username}`);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="form-container">
      <form className="register-form" onSubmit={handleRegistration}>
        <table>
          <tbody>
            <tr>
            <td><label htmlFor="username">Username</label></td>
            <td><input required onChange={handleChange} id="username" name="username" value={user.username} autoComplete="off"/></td>
          </tr>
          <tr>
            <td><label htmlFor="password">Password</label></td>
            <td>
              <input 
                required
                onChange={handleChange} 
                type="password" 
                id="password" 
                name="password" 
                value={user.password} 
                autoComplete="off"
              />
            </td>
          </tr>
          <tr>
            <td className="register-submit" colSpan={2}><Button variant="contained" color="secondary" type="submit">Register</Button></td>
          </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
}

export default UserRegister;