import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

function UserLogin(){
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
    
    const handleLogin = (e) => {
    e.preventDefault();

    axios.post('/login', user)
      .then((response) => {
        if(response.data){
             navigate(`/todo-list/${response.data.username}`);}
        else{
            setUser({ username: "", password: "" });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="form-container">
      <form className="register-form" onSubmit={handleLogin}>
        <table>
          <tbody>
            <tr>
            <td><label htmlFor="username">Username</label></td>
            <td><input onChange={handleChange} id="username" name="username" value={user.username} autoComplete="off"/></td>
          </tr>
          <tr>
            <td><label htmlFor="password">Password</label></td>
            <td>
              <input 
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
            <td className="register-submit" colSpan={2}><Button variant="contained" color="secondary" type="submit">Login</Button></td>
          </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
}

export default UserLogin;