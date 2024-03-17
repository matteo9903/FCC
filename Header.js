// creato all'interno del Tutorial 03
import React from 'react'

// devo aggiungere "props" nella dichiarazione della componente

// posso anche applicare destructuring mettendo { title } al posto di props
// e {title} al posto di {props.title}
const Header = (props) => {
  

  return (
    <header>
        <h1>{props.title}</h1>
      
    </header>
  )
}
// se non ricevo alcuna (ad es. da API o da local storage), metto valore props di default

Header.defaultProps = {
  title: "Default title"
}

export default Header

 
