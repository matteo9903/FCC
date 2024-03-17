import React from 'react'

const Footer = ({ length }) => {
  const today = new Date();

  return (
    <footer>
        <p>{length} List {length === 1 ? "Item" : "items"}</p>
    </footer>
  )
}

export default Footer


// &copy è simbolo del copyright

// <p>Copyright &copy; {today.getFullYear()}</p>
// serve solo per dimostrazione
