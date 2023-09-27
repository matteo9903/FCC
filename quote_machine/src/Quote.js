import React, { useEffect } from 'react'
import { FaTwitter } from 'react-icons/fa';
import { FaTumblr } from 'react-icons/fa';

const Quote = ({fetchQuote, text, author, color}) => {

  const textTransition = 'color 1000ms linear';

  const button_style = {
    backgroundColor: color,
    color: 'white',
    height: '50px',
    fontSize: '20px',
    border: 'none',
    borderRadius: '10px',
    padding: '10px',
    margin: '10px',
    transition: 'background-color 500ms linear'
  }


  const icon_style = {
    color: color,
    height: '44px',
    width: '44px',
    margin: '10px',
    transition: textTransition
  }

  useEffect( () => {

    fetchQuote();

  }, [])

  return (
    <main style={{backgroundColor: color, transition: 'background-color 1000ms linear'}}>
    <div className='quote' id='quote-box'>
        <p id = 'text' style={{textAlign: 'justify', fontSize: '30px', color: color, transition: textTransition}}>{text}</p>
        <p id = 'author' style={{textAlign: 'right', fontSize: '24px', color: color, transition: textTransition}}>~ {author} ~</p>
        <div className='links'>
            <div>
            <a id="tweet-quote" href='https://twitter.com/intent/tweet' target='_blank' rel='noreferrer'><FaTwitter style={icon_style}/></a>
            <a id="tumblr-quote" href='https://www.tumblr.com/' target='_blank' rel='noreferrer'><FaTumblr style={icon_style}/></a>
            </div>
            <button id="new-quote" style={button_style} onClick={fetchQuote}>New Quote</button> 
        </div>
    </div>
    </main>
  )
}

export default Quote
