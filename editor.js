// ============================================
// CONFIGURAÇÃO
// ============================================

// 🔐 SUBSTITUA AQUI PELA SUA GROQ API KEY
const GROQ_API_KEY = ''; // Coloca sua chave aqui temporariamente

// VS Code Dark+ Color Theme
const VS_CODE_THEME = {
  'keyword': '#569CD6',
  'type': '#4EC9B0',
  'class': '#4EC9B0',
  'interface': '#4EC9B0',
  'function': '#DCDCAA',
  'variable': '#9CDCFE',
  'string': '#CE9178',
  'number': '#B5CEA8',
  'comment': '#6A9955',
  'property': '#9CDCFE',
  'namespace': '#4EC9B0',
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
  'System', 'Object', 'String', 'Int32', 'Int64', 'Double', 'Float', 'Boolean', 'DateTime',
  'TimeSpan', 'Guid', 'Exception', 'EventArgs', 'Delegate', 'Action', 'Func', 'Task',
  'ArrayList', 'Hashtable', 'Queue', 'Stack', 'List', 'Dictionary', 'HashSet', 'LinkedList',
  'Enumerable', 'Queryable', 'IEnumerable', 'IQueryable', 'IGrouping',
  'StringBuilder', 'Encoding', 'Regex',
  'File', 'Directory', 'StreamReader', 'StreamWriter', 'FileStream',
  'HttpClient', 'WebClient', 'Uri', 'IPAddress',
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

// ============================================
// GLOBAL VARIABLES
// ============================================

let editor;
let userDefinedSymbols = new Set();
let decorations = [];

// ============================================
// INICIALIZAÇÃO
// ============================================

require.config({ paths: { vs: 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.44.0/min/vs' } });

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
            'editorError.foreground': '#f48771',
            'editorWarning.foreground': '#dcdcaa',
        }
    });

    // Cria editor
    editor = monaco.editor.create(document.getElementById('editor'), {
        value: `using System;

class Program
{
    static void Main()
    {
        Console.WriteLine("Bem-vindo ao C# Editor com IA!");
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
        glyphMargin: true,
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

    // Autocompletar
    registerCSharpCompletions();

    // Validação de sintaxe em tempo real
    validateSyntaxOnChange();

    // Sintaxe highlighting customizado
    applyCSharpHighlighting();

    // UI de botões
    setupUIButtons();
});

// ============================================
// AUTOCOMPLETAR IA
// ============================================

function registerCSharpCompletions() {
    monaco.languages.registerCompletionItemProvider('csharp', {
        provideCompletionItems: async (model, position) => {
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

            // 🤖 COMPLETAÇÃO COM IA
            if (word.length >= 3) {
                try {
                    const aiSuggestion = await getAICompletion(textUntilPosition);
                    if (aiSuggestion && aiSuggestion.trim()) {
                        suggestions.unshift({
                            label: '✨ IA Suggestion',
                            kind: monaco.languages.CompletionItemKind.Text,
                            insertText: aiSuggestion,
                            detail: 'AI Powered',
                            preselect: true,
                            range: new monaco.Range(
                                position.lineNumber, 
                                position.column - word.length, 
                                position.lineNumber, 
                                position.column
                            ),
                            sortText: `0_ai`,
                        });
                    }
                } catch (err) {
                    console.warn('IA não disponível:', err);
                }
            }

            return { suggestions };
        },
        triggerCharacters: ['.', ' ']
    });
}

// ============================================
// IA - GROQ COMPLETER
// ============================================

async function getAICompletion(code) {
    try {
        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${GROQ_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: 'mixtral-8x7b-32768',
                messages: [{
                    role: 'user',
                    content: `Complete this C# code snippet. Only return the completion, no explanations:\n${code}`
                }],
                max_tokens: 80,
                temperature: 0.3
            })
        });

        if (!response.ok) {
            throw new Error(`Groq API error: ${response.status}`);
        }

        const data = await response.json();
        const completion = data.choices[0].message.content;
        
        // Limpa a resposta (remove quebras de linha desnecessárias)
        return completion.trim().split('\n')[0];
    } catch (err) {
        console.error('Erro na completação IA:', err);
        return null;
    }
}

// ============================================
// VALIDAÇÃO DE SINTAXE
// ============================================

function validateSyntaxOnChange() {
    editor.onDidChangeModelContent(async () => {
        const code = editor.getValue();
        
        // Limpa decorações antigas
        decorations = editor.deltaDecorations(decorations, []);
        
        // Valida sintaxe
        validateCSharpSyntax(code);
        
        // Atualiza símbolos
        applyCSharpHighlighting();
    });
}

function validateCSharpSyntax(code) {
    const errors = [];
    const lines = code.split('\n');

    // Validações básicas
    let braceCount = 0;
    let parenCount = 0;
    let bracketCount = 0;

    lines.forEach((line, lineNum) => {
        // Conta chaves/parênteses
        for (let char of line) {
            if (char === '{') braceCount++;
            if (char === '}') braceCount--;
            if (char === '(') parenCount++;
            if (char === ')') parenCount--;
            if (char === '[') bracketCount++;
            if (char === ']') bracketCount--;
        }

        // Detecta erros comuns
        if (line.trim().match(/Console\.WriteLine\(\s*\)/)) {
            errors.push({
                line: lineNum + 1,
                message: 'WriteLine sem argumentos',
                severity: 'warning'
            });
        }

        if (line.trim().match(/new\s+\w+\s*(?![\({])/)) {
            errors.push({
                line: lineNum + 1,
                message: 'new sem instanciação',
                severity: 'error'
            });
        }

        if (line.match(/using\s+\w+\s*(?!;)/)) {
            errors.push({
                line: lineNum + 1,
                message: 'using sem ponto-e-vírgula',
                severity: 'error'
            });
        }
    });

    // Verifica desbalanceamento
    if (braceCount !== 0) {
        errors.push({
            line: lines.length,
            message: `Chaves desbalanceadas (${braceCount > 0 ? '+' : ''}${braceCount})`,
            severity: 'error'
        });
    }
    if (parenCount !== 0) {
        errors.push({
            line: lines.length,
            message: `Parênteses desbalanceados`,
            severity: 'error'
        });
    }

    // Cria decorações para erros
    const newDecorations = errors.map(err => ({
        range: new monaco.Range(err.line, 1, err.line, 1),
        options: {
            isWholeLine: true,
            className: `error-line-${err.severity}`,
            glyphMarginClassName: `error-glyph-${err.severity}`,
            glyphMarginHoverMessage: { value: err.message },
            minimap: { color: err.severity === 'error' ? '#f48771' : '#dcdcaa', position: 2 },
        }
    }));

    decorations = editor.deltaDecorations(decorations, newDecorations);

    // Atualiza status
    const errorCount = errors.filter(e => e.severity === 'error').length;
    const warningCount = errors.filter(e => e.severity === 'warning').length;
    const statusText = errorCount > 0 
        ? `❌ ${errorCount} erro(s)` 
        : warningCount > 0 
        ? `⚠️ ${warningCount} aviso(s)` 
        : '✅ Nenhum erro detectado';
    
    document.getElementById('status').textContent = statusText;
}

// ============================================
// EXPLICAR CÓDIGO COM IA
// ============================================

async function explainSelectedCode() {
    const selection = editor.getSelectedText();

    if (!selection || selection.trim() === '') {
        showNotification('Selecione um trecho de código para explicar', 'warning');
        return;
    }

    const explainBtn = document.getElementById('explainBtn');
    explainBtn.disabled = true;
    explainBtn.innerHTML = '⏳ Analisando...';

    try {
        const explanation = await getAIExplanation(selection);
        showExplanationModal(selection, explanation);
    } catch (err) {
        showNotification('Erro ao conectar com IA: ' + err.message, 'error');
    } finally {
        explainBtn.disabled = false;
        explainBtn.innerHTML = '💡 Explicar';
    }
}

async function getAIExplanation(code) {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${GROQ_API_KEY}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            model: 'mixtral-8x7b-32768',
            messages: [{
                role: 'user',
                content: `Explique este código C# em português de forma clara, didática e concisa. Use exemplos se necessário:\n\n${code}`
            }],
            max_tokens: 1000,
            temperature: 0.7
        })
    });

    if (!response.ok) {
        throw new Error(`Erro na API Groq: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
}

function showExplanationModal(code, explanation) {
    const modal = document.createElement('div');
    modal.className = 'explanation-modal-overlay';
    modal.innerHTML = `
        <div class="explanation-modal">
            <div class="explanation-header">
                <h2>📝 Análise de Código</h2>
                <button class="close-btn" onclick="this.closest('.explanation-modal-overlay').remove()">✕</button>
            </div>
            
            <div class="explanation-code">
                <strong style="color: #4ec9b0;">📌 Código Selecionado:</strong>
                <pre>${escapeHtml(code)}</pre>
            </div>
            
            <div class="explanation-text">
                <strong style="color: #dcdcaa;">💡 Explicação:</strong>
                <p>${explanation.replace(/\n/g, '<br>')}</p>
            </div>
            
            <div class="explanation-footer">
                <button class="btn-close-modal" onclick="this.closest('.explanation-modal-overlay').remove()">Fechar</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => notification.remove(), 4000);
}

// ============================================
// UTILITÁRIOS
// ============================================

function extractWord(text) {
    const match = text.match(/\b[\w.]*$/);
    return match ? match[0].split('.').pop() : '';
}

function applyCSharpHighlighting() {
    const code = editor.getValue();
    
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

// ============================================
// BUTTONS SETUP
// ============================================

function setupUIButtons() {
    // Download
    document.getElementById('downloadBtn').addEventListener('click', () => {
        const code = editor.getValue();
        const element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(code));
        element.setAttribute('download', 'Program.cs');
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
        showNotification('✅ Código baixado!', 'success');
    });

    // Limpar
    document.getElementById('clearBtn').addEventListener('click', () => {
        if (confirm('Tem certeza que deseja limpar o editor?')) {
            editor.setValue('');
            userDefinedSymbols.clear();
            document.getElementById('status').textContent = '✅ Nenhum erro detectado';
            showNotification('✨ Editor limpo!', 'success');
        }
    });

    // Explicar com IA
    document.getElementById('explainBtn').addEventListener('click', explainSelectedCode);

    // PWA Install
    let deferredPrompt;
    const installBtn = document.getElementById('installBtn');

    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;
        installBtn.style.display = 'block';
    });

    installBtn?.addEventListener('click', async () => {
        if (deferredPrompt) {
            deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;
            console.log(`Usuário respondeu: ${outcome}`);
            deferredPrompt = null;
            installBtn.style.display = 'none';
        }
    });

    window.addEventListener('appinstalled', () => {
        console.log('✅ PWA instalada!');
        installBtn.style.display = 'none';
    });
}