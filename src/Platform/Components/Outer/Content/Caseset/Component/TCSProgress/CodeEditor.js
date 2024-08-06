import React, { useEffect, useRef, useState } from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css'; // 引入 material 主题样式
import 'codemirror/mode/sql/sql'; // 确保 SQL 模式文件被正确引入
import 'codemirror/mode/javascript/javascript'
import './CodeEditor.scss'

const CodeEditor = ({ code, handleCode }) => {
    const [localCode, setLocalCode] = useState(code);
    const editorRef = useRef(null);

    useEffect(() => {
        setLocalCode(code);
    }, [code]);

    // Ensure CodeMirror instance is available and focus on update
    useEffect(() => {
        if (editorRef.current) {
            editorRef.current.editor.focus();
        }
    }, [localCode]);

    const handleChange = (editor, data, value) => {
        setLocalCode(value);
        handleCode(value);
    };

    const options = {
        mode: 'sql', // 确保设置了 SQL 模式
        theme: 'material', // 确保 CodeMirror 主题被正确应用
        lineNumbers: true,
        lineWrapping: true,
    };

    return (
        <CodeMirror
            ref={editorRef}
            value={localCode}
            onBeforeChange={handleChange}
            options={options}
            className="code-editor"
        />
    );
};

export default CodeEditor;
