import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import md5 from 'js-md5';

// interface WordStatisticResult {
//   // : string;
//   // translatedText: string;
//   wordCount: number;
//   wordStart: string;
//   wordStartCount: number;
// }

interface WordStatisticResult {
  wordCount: number;
  wordStart: string;
  wordStartCount: number;
}


function App() {
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslationResult] = useState(``);
  const [buttonText, setButtonText] = useState('Translate');
  const [titleText, setTitleText] = useState('Little Translator')
  const [shuruText, setShuruText] = useState('input')
  const [statisticText, setStatisticText] = useState('Statistics: there are 0 words, the word of "i" appears 0 times')
  const [wordStatisticResult, setWordStatisticResult] = useState<WordStatisticResult | null>(null);
  // const [inputValue, setInputValue] = useState(""); 

  const appid = '20230316001603096';
  const key = '3wLMHej2nPWxD8qj83eM';
  const salt = (new Date).getTime();
 
  // 多个query可以用\n连接  如 query='apple\norange\nbanana\npear'
  const from = 'auto';
  const to = 'zh';
  // let wordCount2 = 0;
  // let wordStart2 ='I';
  // let wordStartCount2 = 0;
  
  // 调用翻译API的函数
  const translateText = async () => {
    const query = `${inputText}`;
    if (query == null || query == undefined || query == '') {
      // 提示不可输入空值
      // <Alert title="不可输入空值" type="error" />
    }
    // if (!query) {
    //   return <Alert title="不可输入空值" type="error" />
    // }

    const wordSplit = query.split(' ');
    const wordCount2 = wordSplit.length;
    const wordStart2 = query.charAt(0); 
    let wordStartCount2 = 0;

    const lowerCaseQuery = query.toLowerCase();
    const lowerCaseWordStart = wordStart2.toLowerCase();
    for (let i = 0; i < lowerCaseQuery.length; i++) {
      if (lowerCaseQuery[i] === lowerCaseWordStart) {
        wordStartCount2++;
      }
    }
    setWordStatisticResult({ wordCount: wordCount2, wordStart: wordStart2, wordStartCount: wordStartCount2});
    const str1 = appid + query + salt +key;
    const sign = md5(str1);
    const url = `http://127.0.0.1:5174/baiduapi?appid=${appid}&q=${query}&salt=${salt}&from=${from}&to=${to}&sign=${sign}`

    try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data.trans_result[0].dst);

    setTranslationResult(data.trans_result[0].dst);
    setButtonText(`翻译`);
    setTitleText(`小小翻译家`);
    setShuruText('输入')
    // const aa = `统计数据: 有${wordStatisticResult.wordCount}个词, ${wordStatisticResult.wordStart}这个单词出现了${wordStatisticResult.wordStartCount}次。`;
    // const aa = `统计数据: 有${wordStatisticResult.wordCount}个词, `;
    setStatisticText(`统计数据: 有${wordCount2}个词, ${wordStart2}这个单词出现了${wordStartCount2}次。`);
  } catch(error) {
    console.log(error);
    
    }
  };

  return (
    <div className="App">
      <div className='hezi'> 
        <header className="App-header">
          <h1>{titleText}</h1>
          {/* <h1>小小翻译家</h1> */}
        </header>
        <button className='buttonEl' onClick={translateText}>{ buttonText }</button>
      </div>
      <main>
        <p className='pEl'>{shuruText}</p>
        <input 
          className='inputEl'
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="input your words here"
        />
        
        
          <div>
            {/* <h3 className='yuanwen'>原文</h3> */}
            {/* <p>{translationResult.}</p> */}
            {/* <h3>翻译结果</h3> */}
            <p className='fanyijieguo'>{translatedText}</p>
            {/* <p className='tongji'>统计数据: 有{wordStatisticResult.wordCount}个词, {wordStatisticResult.wordStart}这个单词出现了  {wordStatisticResult.wordStartCount}次。</p> */}
            <p className='tongji'>{statisticText}</p>
          </div>
        
      </main>
    </div>
  );
}

export default App
