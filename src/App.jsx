import { useState } from 'preact/hooks';
import Editor from "@monaco-editor/react";

function App() {
  const [code, setCode] = useState('// Write your code here\n');

  const handleEditorChange = (value) => {
    setCode(value);
  };

  return (
    <div>
      <h1>Monaco Editor Example</h1>
      <div className="editor-container">
        <Editor
          height="100%"
          defaultLanguage="javascript"
          defaultValue={code}
          onChange={handleEditorChange}
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            wordWrap: 'on',
            automaticLayout: true,
          }}
        />
      </div>
    </div>
  );
}

export default App;
