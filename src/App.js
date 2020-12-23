import React, { useRef, useState, useEffect } from "react";
import AceEditor from "react-ace";
import { Console, Hook, Unhook } from "console-feed";
import "./App.css";
import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-css";
import "ace-builds/src-noconflict/theme-gruvbox";

function App() {
  const iframeRef = useRef(null);
  const [js, setJs] = useState("");
  const [css, setCss] = useState("");
  const [html, setHtml] = useState("");
  const [logs, setLogs] = useState([]);

  // useEffect(() => {
  //   Hook(
  //     iframeRef.current.contentWindow.console,
  //     (log) => setLogs((curLogs) => [...curLogs, log]),
  //     false
  //   );
  //   return () => Unhook(iframeRef.current.contentWindow.console);
  // }, []);

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
        `;
    return `data:text/html,${encodeURIComponent(content)}`;
  };

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
          <iframe
            ref={iframeRef}
            title="preview"
            src={renderContent()}
            onLoad={() => {
              Hook(
                iframeRef.current.contentWindow.console,
                (log) => setLogs((curLog) => [...curLog, log]),
                false
              );
            }}
          />
          <div className="console">
            <h2>Console</h2>
            <div className="console-content">
              <Console logs={logs} variant="dark" />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
