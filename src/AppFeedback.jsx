import { useState } from 'react'
import './App.css'

function AppFeedback() {
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
    request("/api/feedback").then(setTxt)
  }

  const testPost = () => {
    request(
      "/api/feedback", {
        method: 'POST'
      }
    ).then(setTxt)
  }

  const testPut = () => {
    request(
      "/api/feedback", {
        method: 'PUT'
      }
    ).then(setTxt)
  }

  const testPatch = () => {
    request(
      "/api/feedback", {
        method: 'PATCH'
      }
    ).then(setTxt)
  }

  const testDelete = () => {
    request(
      "/api/feedback", {
        method: 'DELETE'
      }
    ).then(setTxt)
  }

  return <>
      <h1>Випробування API Feedback Controller</h1>
      <button onClick={testGet}>GET</button>
      <button onClick={testPost}>POST</button>
      <button onClick={testPut}>PUT</button>
      <button onClick={testPatch}>PATCH</button>
      <button onClick={testDelete}>DELETE</button>
      <p>{txt}</p>
    </>
}

export default AppFeedback

