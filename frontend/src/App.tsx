import './App.css'
import { useState, useEffect } from 'react'
import axios from 'axios'

function App() {
  
  const fetchAPI = async () => {
    const response = await axios.get("http://127.0.0.1:8080/api/users")
    console.log(response.data.users)
    setArray(response.data.users)
  }
  
  // Run fetchAPI only on the initial rendering of the page
  useEffect(() => {
    fetchAPI()
  }, [])
  
  const [array, setArray] = useState([])

  return (
    <>
      <h1>This is React frontend</h1>
      {
        array.map((user,index)=>{
          return <p key={index}>{user}</p>
        })
      }
    </>
  )
}

export default App
