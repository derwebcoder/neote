import { useState } from 'react'
// import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import '@neote/editor'
import '@neote/tags'

export function App() {
  const [count, setCount] = useState(0)

  const sendMessage = async () => {
    console.log('sendMessage')
    const response = await (window as any).neote.ai.chatCompletion([
      {
        "role": "system",
        "content": "You always respond in poem format."
      },
      {
        "role": "user",
        "content": "Hello!"
      }
    ])
    console.log('response', response)
  }

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        {/* <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a> */}
      </div>
      <h1>Vite + React + Electronics!</h1>
      <neote-editor></neote-editor>
      <neote-tag name="peter"></neote-tag>
      <div className="card">
        <button onClick={sendMessage}>
          There is no antidote {count + 1}
        </button>
        <p>
          You are using Chrome {window.versions?.chrome()}. Nice!
        </p>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}
