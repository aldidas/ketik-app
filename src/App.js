import React, { useRef, useState, useEffect } from 'react'
import AceEditor from 'react-ace'
import './App.css'
import 'ace-builds/src-noconflict/mode-html'
import 'ace-builds/src-noconflict/mode-javascript'
import 'ace-builds/src-noconflict/mode-css'
import 'ace-builds/src-noconflict/theme-gruvbox'

function App() {
  const iframeRef = useRef(null)
  const [js, setJs] = useState('')
  const [css, setCss] = useState('')
  const [html, setHtml] = useState('')

  useEffect(() => {
    console.log(iframeRef.current.contentWindow.console)
    //iframeRef.current.contentWindow.console.addEventListener('log', value => {
    //console.log.apply(null, value)
    //})
  }, [])

  const renderContent = () => {
    const content = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>Code Preview</title>
            <style>${css}</style>
        </head>
        <body>
           ${html} 
           <script>${js}</script>
        </body>
        </html>
        `
    return `data:text/html,${encodeURIComponent(content)}`
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Header</h1>
      </header>
      <main>
        <section className="code">
          <div>
            <h2>HTML</h2>
            <AceEditor
              width="100%"
              height="calc(47vh - 26px)"
              mode="html"
              theme="gruvbox"
              onChange={setHtml}
            />
          </div>
          <div>
            <h2>Javascript</h2>
            <AceEditor
              width="100%"
              height="calc(47vh - 26px)"
              mode="javascript"
              theme="gruvbox"
              onChange={setJs}
            />
          </div>
          <div>
            <h2>CSS</h2>
            <AceEditor
              width="100%"
              height="calc(47vh - 26px)"
              mode="css"
              theme="gruvbox"
              onChange={setCss}
            />
          </div>
        </section>
        <section className="preview">
          <iframe ref={iframeRef} title="preview" src={renderContent()} />
          <div className="console">
            <h2>Console</h2>
            <div className="console-content">Content</div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
