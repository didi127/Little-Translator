import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

interface TranslationResult {
  text: string;
  translatedText: string;
}


function App() {
  const [inputText, setInputText] = useState('');
  const [translationResult, setTranslationResult] = useState<TranslationResult | null>(null);

  // 调用翻译API的函数
  const translateText = async () => {
    const response = await fetch(`https://api.funtranslations.com/translate/yoda.json?text=${inputText}`);
    const data = await response.json();
    setTranslationResult({ text: inputText, translatedText: data.contents.translated });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>翻译器</h1>
      </header>
      <main>
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="请输入要翻译的文本"
        />
        <button onClick={translateText}>翻译</button>
        {translationResult && (
          <div>
            <h3>原文</h3>
            <p>{translationResult.text}</p>
            <h3>翻译结果</h3>
            <p>{translationResult.translatedText}</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App
