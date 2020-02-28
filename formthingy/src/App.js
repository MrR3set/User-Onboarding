import React, { useState } from 'react';
import './App.css';
import UserForm from "./components/Form"

function App() {

  const [user, setUser] = useState([{
    uid:1,
    name: "some name...",
    email:"some email...",
    password:"some password..."
  }]);
  
  const addNewUser = _user => {
    console.log("_user")
    // const newUser={
    //   uid: Date.now(),
    //   name: _user.name,
    //   email: _user.email,
    //   role: _user.role
    // }
    // setUser([...user, newUser]);
  }



  return (
    <div className="App">
      <UserForm addUser={addNewUser}></UserForm>
    </div>
  );
}

export default App;
