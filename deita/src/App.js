// Inside your React component
import React, { useEffect, useState } from 'react';
import axios from 'axios';
const table = {
  width: '100%',
  borderCollapse: 'collapse',
  fontFamily: 'Arial, sans-serif',
  border: '1px solid black',
};


function App() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    contactNumber: '',
    username: '',
    password: ''
  });
  
  const [first_nameList, setFirst_nameList] = useState([]);


  useEffect(() => {
    axios.get('http://localhost:3001/api/get')
      .then(response => {
        setFirst_nameList(response.data)

        console.log(response.data);
      })
      .catch(error => {
        console.error('Errors fetching data:', error);
      });
  }, []); // The empty array signifies that this effect doesn't depend on any props or state and should run once on mount
  



  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      console.log(formData);

      await axios.post('http://localhost:3001/api/insert/', formData);
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <p >CONTACT DETAILS</p>
        <form onSubmit={handleSubmit}>
          <input name="firstName" placeholder="First Name" onChange={handleInputChange} /> <br/>
          <input name="lastName" placeholder="Last Name" onChange={handleInputChange} /> <br/>
          <input name="contactNumber" placeholder="Contact Number" onChange={handleInputChange} /> <br/>
          <input name="username" placeholder="Username" onChange={handleInputChange} /> <br/>
          <input name="password" placeholder="Password" onChange={handleInputChange} /> 
          <button type="submit">Submit</button>
        </form>
      </header>
      <br/><br/><br/>
      <table style={table}>
        <thead>
          <tr style={table}>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Contact Number</th>
            <th>Username</th>
            <th>Password</th>
          </tr>
        </thead>
        <tbody style={table}>
          {first_nameList.map((val, index) => {
            return (
              <tr style={table} key={index}>
                <td>{val.first_name}</td>
                <td>{val.last_name}</td>
                <td>{val.contact_number}</td>
                <td>{val.username}</td>
                <td>{val.password}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
  



    </div>
  );
}

export default App;
