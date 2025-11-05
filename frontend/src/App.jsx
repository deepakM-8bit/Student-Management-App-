import { useState, useEffectEvent } from "react";
import axios from 'axios';

const API = 'http://localhost:3000/api/student';

const App = () => {

  const [user,setUser] = useState([]);
  const[form,setForm] = useState({name:"",email:"",phoneno:""});
  const[editing,setEditing] = useState(null);

  const fetchUsers = async() => {
    const res = await axios.get(API);
    setUser(res.data);
  };

  useEffectEvent(()=>{
    fetchUsers();
  },[]);

  const handleSubmit = async (e)=>{
    e.preventDefault();
    if (editing){
      await axios.put(`${API}/${editing}`, form);
      setEditing(null) 
    } else{
      await axios.post(`${API}`,form);
    } 
    setForm({name:"",email:"",phoneno:""});
    fetchUsers();
  };

  const handleEdit = (user) => {
    setEditing(user.id);
    setForm({name:user.name, email:user.email, phoneno:user.phoneno});
  };

  const handleDelete = async (id) => {
    await axios.delete(`${API}/${id}`);
    fetchUsers();
  };


  return (
    <div className="container" style={{maxWidth: 600, margin: "50px auto"}}>
      <h2>Student management app</h2>
      
      <form onSubmit={handleSubmit}>
        <input 
        type="text"
        value={form.name}
        placeholder="enter your name"
        onChange={(e) => setForm({...form, name: e.target.value})} />

        <input 
        type="email"
        value={form.email}
        placeholder="enter your email"
        onChange={(e) => setForm({...form, email:e.target.value})} />

        <input
        type="tel"
        value={form.phoneno}
        placeholder="enter your phone no"
        onChange={(e) => setForm({...form, phoneno:e.target.value})} />

        <button type="submit">{editing? 'Update':'Add'}</button>
      </form>

     <div className="user-table-container">
  <table className="user-table">
    <thead>
      <tr>
        <th>NAME</th>
        <th>EMAIL</th>
        <th>PHONE NO</th>
        <th>ACTIONS</th>
      </tr>
    </thead>
    <tbody>
      {user.map((u) => (
        <tr key={u.id}>
          <td>{u.name}</td>
          <td>{u.email}</td>
          <td>{u.phoneno}</td>
          <td className="actions">
            <button className="edit-btn" onClick={() => handleEdit(u)}>Edit</button>
            <button className="delete-btn" onClick={() => handleDelete(u.id)}>Delete</button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
</div>
  );
}

export default App