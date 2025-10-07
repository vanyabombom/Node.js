import { useState } from 'react'
import './App.css'

function App() {
  const [txt, setTxt] = useState("")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")

  const request = (url, conf) => new Promise((resolve, reject) => {
    if (url.startsWith('/')) {
      url = "http://localhost:81" + url
    }
    fetch(url, conf).then(r => r.json()).then(j => {
      if (j.status.isSuccess) {
        resolve(j.data)
      } else {
        console.error(j)
        reject(j)
      }
    })
  })

  const testGet = () => {
    request("/api/client/login").then(setTxt)
  }

  const testPut = () => {
    request(
      "/api/client", {
        method: 'PUT'
      }
    ).then(setTxt)
  }

  const testPost = () => {
    console.log(name, email, phone)
    request("/api/client", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify({name, email, phone})
    })
    .then(setTxt)
  }

  const testPatch = () => {
    request(
      "/api/client", {
        method: 'PATCH'
      }
    ).then(setTxt)
  }

  const testDelete = () => {
    request(
      "/api/client", {
        method: 'DELETE'
      }
    ).then(setTxt)
  }

  return <>
      <h1>Випробування API Client Controller</h1>
      <button onClick={testGet}>GET</button>
      <button onClick={testPut}>PUT</button>
      <button onClick={testPatch}>PATCH</button>
      <button onClick={testDelete}>DELETE</button>
      <div style={{border: "1px solid lightgray", padding: "5px"}}>
          <input type="text" value={name} onChange={e => setName(e.target.value)}/> <br/>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)}/> <br/>
          <input type="tel" value={phone} onChange={e => setPhone(e.target.value)}/> <br/>

          <button onClick={testPost}>POST</button>
      </div>
      <p>{txt}</p>
    </>
}

export default App

