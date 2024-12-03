import React, {useEffect, useState} from 'react';
import './App.css';
import {Data} from './Crudop';


function App() {

    const[data, setData] = useState([]);
    const[name, setname] = useState('')
    const[age, setage] = useState(0)
    const[id, setid] = useState(0)
    const[isupdate, setisupdate] = useState(false);

    useEffect(() =>{ setData(Data)},[]);

    const handleEdit = (id) => {
        const itemToEdit = data.find(item => item.id === id);
        if (itemToEdit) {
          setisupdate(true);
          setid(itemToEdit.id);
          setname(itemToEdit.name);
          setage(itemToEdit.age);
        } else {
          console.log("Item not found for editing");
        }
      };
    const handleDelete = (id) => {
        if(id > 0)
        {
            if(window.confirm("Are you sure you want to delete this item?"))
                {
            const dt = data.filter(item => item.id !== id);
            setData(dt);
            }
        }
    };
    const handleSave = () => {
        if (name !== "" && age !== 0) {
          const newItem = { id: data.length + 1, name: name, age: age };
          setData([...data, newItem]);
          setname("");
          setage(0);
        } else {
          console.error("Name and age are required.");
        }
      };
    const handleClear = () => {
        {
            setid(0);
            setname("");
            setage(0);
            setisupdate(false);
          };
    }
    const handleUpdate = () => {
        const updatedData = data.map(item => {
          if (item.id === id) {
            return { ...item, name: name, age: age };
          }
          return item;
        });
        setData(updatedData);
        setid(0);
        setname("");
        setage(0);
      };

      return (
        <div className="container">
            <h1>Data Management</h1>
            <div className="input-field">
                <input 
                    type="text" 
                    value={name} 
                    onChange={(e) => setname(e.target.value)} 
                    placeholder="Name" 
                />
            </div>
            <div className="input-field">
                <input 
                    type="number" 
                    value={age} 
                    onChange={(e) => setage(e.target.value)} 
                    placeholder="Age" 
                />
            </div>
            {isupdate ? (
                <button className="button" onClick={handleUpdate}>Update</button>
            ):
            (
            <button className="button" onClick={handleSave}>Save</button>
            )}
            <button className="button" onClick={handleClear}>Clear</button>
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(item => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.age}</td>
                            <td>
                            
                                <button className='action' onClick={() => handleEdit(item.id)}>Edit</button>
                                <button className='action' onClick={() => handleDelete(item.id)}>Delete</button>
                              
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
  }

export default App;