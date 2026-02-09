// VS Code Dark+ Color Theme
const VS_CODE_THEME = {
  'keyword': '#569CD6',           // blue
  'type': '#4EC9B0',              // teal (class, interface)
  'class': '#4EC9B0',             // teal
  'interface': '#4EC9B0',         // teal
  'function': '#DCDCAA',          // yellow
  'variable': '#9CDCFE',          // light blue
  'string': '#CE9178',            // brown/orange
  'number': '#B5CEA8',            // green
  'comment': '#6A9955',           // green
  'property': '#9CDCFE',          // light blue
  'namespace': '#4EC9B0',         // teal
};

// C# Keywords
const CSHARP_KEYWORDS = [
  'abstract', 'as', 'base', 'bool', 'break', 'byte', 'case', 'catch', 'char', 'checked',
  'class', 'const', 'continue', 'decimal', 'default', 'delegate', 'do', 'double', 'else',
  'enum', 'event', 'explicit', 'extern', 'false', 'finally', 'fixed', 'float', 'for',
  'foreach', 'goto', 'if', 'implicit', 'in', 'int', 'interface', 'internal', 'is',
  'lock', 'long', 'namespace', 'new', 'null', 'object', 'operator', 'out', 'override',
  'params', 'private', 'protected', 'public', 'readonly', 'ref', 'return', 'sbyte',
  'sealed', 'short', 'sizeof', 'stackalloc', 'static', 'string', 'struct', 'switch',
  'this', 'throw', 'true', 'try', 'typeof', 'uint', 'ulong', 'unchecked', 'unsafe',
  'using', 'ushort', 'virtual', 'void', 'volatile', 'while', 'async', 'await', 'var',
  'yield', 'where', 'get', 'set', 'value', 'add', 'remove', 'init'
];

// System namespaces e tipos
const SYSTEM_TYPES = [
  // System
  'System', 'Object', 'String', 'Int32', 'Int64', 'Double', 'Float', 'Boolean', 'DateTime',
  'TimeSpan', 'Guid', 'Exception', 'EventArgs', 'Delegate', 'Action', 'Func', 'Task',
  
  // System.Collections
  'ArrayList', 'Hashtable', 'Queue', 'Stack', 'List', 'Dictionary', 'HashSet', 'LinkedList',
  
  // System.Linq
  'Enumerable', 'Queryable', 'IEnumerable', 'IQueryable', 'IGrouping',
  
  // System.Text
  'StringBuilder', 'Encoding', 'Regex',
  
  // System.IO
  'File', 'Directory', 'StreamReader', 'StreamWriter', 'FileStream',
  
  // System.Net
  'HttpClient', 'WebClient', 'Uri', 'IPAddress',
  
  // System.Threading
  'Thread', 'ThreadPool', 'Mutex', 'Semaphore', 'Lock',
];

const SYSTEM_METHODS = [
  'Console.WriteLine', 'Console.Write', 'Console.ReadLine', 'Console.Clear',
  'ToString', 'GetType', 'Equals', 'GetHashCode', 'Convert.ToInt32', 'Convert.ToString',
  'Math.Max', 'Math.Min', 'Math.Abs', 'Math.Sqrt', 'Math.Pow', 'Math.Round',
  'DateTime.Now', 'DateTime.UtcNow', 'DateTime.Parse',
  'String.Format', 'String.Concat', 'String.Join', 'String.IsNullOrEmpty',
  'List.Add', 'List.Remove', 'List.Contains', 'List.Clear', 'List.Count',
  'Dictionary.Add', 'Dictionary.Remove', 'Dictionary.Keys', 'Dictionary.Values',
];

// Inicializa Monaco Editor
require.config({ paths: { vs: 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.44.0/min/vs' } });

let editor;
let userDefinedSymbols = new Set();

require(['vs/editor/editor.main'], function() {
    // Define VS Code Dark+ Theme
    monaco.editor.defineTheme('vs-code-dark-plus', {
        base: 'vs-dark',
        inherit: true,
        rules: [
            { token: 'keyword.csharp', foreground: '569CD6', fontStyle: 'bold' },
            { token: 'type.csharp', foreground: '4EC9B0' },
            { token: 'class.csharp', foreground: '4EC9B0', fontStyle: 'bold' },
            { token: 'interface.csharp', foreground: '4EC9B0', fontStyle: 'bold' },
            { token: 'struct.csharp', foreground: '4EC9B0', fontStyle: 'bold' },
            { token: 'enum.csharp', foreground: '4EC9B0', fontStyle: 'bold' },
            { token: 'namespace.csharp', foreground: '4EC9B0' },
            { token: 'function.csharp', foreground: 'DCDCAA' },
            { token: 'method.csharp', foreground: 'DCDCAA' },
            { token: 'variable.csharp', foreground: '9CDCFE' },
            { token: 'property.csharp', foreground: '9CDCFE' },
            { token: 'field.csharp', foreground: '9CDCFE' },
            { token: 'parameter.csharp', foreground: '9CDCFE' },
            { token: 'string.csharp', foreground: 'CE9178' },
            { token: 'number.csharp', foreground: 'B5CEA8' },
            { token: 'comment.csharp', foreground: '6A9955', fontStyle: 'italic' },
            { token: 'punctuation.csharp', foreground: 'D4D4D4' },
            { token: 'operator.csharp', foreground: 'D4D4D4' },
        ],
        colors: {
            'editor.background': '#1e1e1e',
            'editor.foreground': '#d4d4d4',
            'editor.lineNumbersBackground': '#1e1e1e',
            'editor.lineNumbersForeground': '#858585',
            'editor.selectionBackground': '#264f78',
            'editor.lineHighlightBackground': '#2d2d30',
            'editorCursor.foreground': '#aeafad',
            'editorWhitespace.foreground': '#3e3e42',
            'editor.foldBackground': '#424242',
        }
    });

    // Cria editor
    editor = monaco.editor.create(document.getElementById('editor'), {
        value: `using System;

class Program
{
    static void Main()
    {
        Console.WriteLine("Bem-vindo ao C# Editor!");
        // Digite seu código aqui...
    }
}`,
        language: 'csharp',
        theme: 'vs-code-dark-plus',
        fontSize: 14,
        fontFamily: '"Cascadia Code", "Consolas", "Courier New", monospace',
        autoIndent: 'advanced',
        formatOnPaste: true,
        formatOnType: true,
        minimap: { enabled: false },
        scrollBeyondLastLine: false,
        wordWrap: 'on',
        lineNumbers: 'on',
        glyphMargin: false,
        folding: true,
        lineDecorationsWidth: 10,
        bracketPairColorization: { enabled: true },
        'bracketPairColorization.independentColorPoolPerBracketType': true,
    });

    // Atualiza posição do cursor
    editor.onDidChangeCursorPosition((e) => {
        const pos = e.position;
        document.getElementById('position').textContent = 
            `Linha ${pos.lineNumber}, Coluna ${pos.column}`;
    });

    // Autocomplete
    registerCSharpCompletions();

    // Sintaxe highlighting customizado
    applyCSharpHighlighting();
});

// Registra provider de autocompletar
function registerCSharpCompletions() {
    monaco.languages.registerCompletionItemProvider('csharp', {
        provideCompletionItems: (model, position) => {
            const textUntilPosition = model.getValueInRange({
                startLineNumber: 1,
                startColumn: 1,
                endLineNumber: position.lineNumber,
                endColumn: position.column
            });

            const word = extractWord(textUntilPosition);
            const suggestions = [];

            // Palavras-chave
            CSHARP_KEYWORDS.forEach(keyword => {
                if (keyword.startsWith(word.toLowerCase())) {
                    suggestions.push({
                        label: keyword,
                        kind: monaco.languages.CompletionItemKind.Keyword,
                        insertText: keyword,
                        detail: 'C# Keyword',
                        range: new monaco.Range(
                            position.lineNumber, 
                            position.column - word.length, 
                            position.lineNumber, 
                            position.column
                        ),
                        sortText: `1_${keyword}`,
                    });
                }
            });

            // Tipos do System
            SYSTEM_TYPES.forEach(type => {
                if (type.toLowerCase().startsWith(word.toLowerCase())) {
                    suggestions.push({
                        label: type,
                        kind: monaco.languages.CompletionItemKind.Class,
                        insertText: type,
                        detail: 'System Type',
                        range: new monaco.Range(
                            position.lineNumber, 
                            position.column - word.length, 
                            position.lineNumber, 
                            position.column
                        ),
                        sortText: `2_${type}`,
                    });
                }
            });

            // Métodos
            SYSTEM_METHODS.forEach(method => {
                const methodName = method.split('.').pop();
                if (methodName.toLowerCase().startsWith(word.toLowerCase())) {
                    suggestions.push({
                        label: methodName,
                        kind: monaco.languages.CompletionItemKind.Method,
                        insertText: methodName + '()',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        detail: method,
                        range: new monaco.Range(
                            position.lineNumber, 
                            position.column - word.length, 
                            position.lineNumber, 
                            position.column
                        ),
                        sortText: `3_${methodName}`,
                    });
                }
            });

            // Símbolos definidos pelo usuário
            userDefinedSymbols.forEach(symbol => {
                if (symbol.toLowerCase().startsWith(word.toLowerCase())) {
                    suggestions.push({
                        label: symbol,
                        kind: monaco.languages.CompletionItemKind.Variable,
                        insertText: symbol,
                        detail: 'User Defined',
                        range: new monaco.Range(
                            position.lineNumber, 
                            position.column - word.length, 
                            position.lineNumber, 
                            position.column
                        ),
                        sortText: `4_${symbol}`,
                    });
                }
            });

            return { suggestions };
        },
        triggerCharacters: ['.', ' ']
    });
}

// Extrai palavra atual
function extractWord(text) {
    const match = text.match(/\b[\w.]*$/);
    return match ? match[0].split('.').pop() : '';
}

// Highlighting customizado (análise básica)
function applyCSharpHighlighting() {
    const code = editor.getValue();
    
    // Extrai símbolos definidos pelo usuário (class, method, var, etc)
    const classRegex = /class\s+(\w+)/g;
    const methodRegex = /(?:public|private|protected|static|async)?\s+\w+\s+(\w+)\s*\(/g;
    const varRegex = /var\s+(\w+)/g;

    let match;
    while ((match = classRegex.exec(code)) !== null) {
        userDefinedSymbols.add(match[1]);
    }
    while ((match = methodRegex.exec(code)) !== null) {
        userDefinedSymbols.add(match[1]);
    }
    while ((match = varRegex.exec(code)) !== null) {
        userDefinedSymbols.add(match[1]);
    }
}

// Download do código
document.getElementById('downloadBtn').addEventListener('click', () => {
    const code = editor.getValue();
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(code));
    element.setAttribute('download', 'Program.cs');
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
});

// Limpar editor
document.getElementById('clearBtn').addEventListener('click', () => {
    if (confirm('Tem certeza que deseja limpar o editor?')) {
        editor.setValue('');
        userDefinedSymbols.clear();
    }
});

// Monitorar mudanças para atualizar símbolos
editor.onDidChangeModelContent(() => {
    applyCSharpHighlighting();
});