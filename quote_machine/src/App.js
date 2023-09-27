import { useState } from "react";
import Quote from "./Quote";

function App() {

  const[text, setText] = useState('');
  const[author, setAuthor] = useState('');
  const [color, setColor] = useState('#000000');

  const randColor = () => {
    const color = ['#'];
    for(let i=0; i<6; i++)
      color.push(Math.floor((Math.random()*16)).toString(16)) ; 
    // toString(n) --> converte numero in stringa in base n
    return color.join('');
  }

  const fetchQuote = async () => {
    
    const url = 'https://api.api-ninjas.com/v1/quotes';

    const reqOptions = {
      method: 'GET',
      headers: { 
      'X-Api-Key': 'l5QkY5V3a3kpdIhyekbLDw==5Ohu5UFsOQSIi4Gq'
    }
    }

    const response = await fetch(url, reqOptions);
    const quote = await response.json();
    setText(quote[0].quote);
    setAuthor(quote[0].author);
    let color = randColor();
    console.log(color);
    setColor(color);
  }

  return (
    <div className="App">
        <Quote 
          fetchQuote = {fetchQuote}
          text = {text}
          author = {author}
          color= {color}
        />
    </div>
  );
}

export default App;


// API KEY : l5QkY5V3a3kpdIhyekbLDw==5Ohu5UFsOQSIi4Gq