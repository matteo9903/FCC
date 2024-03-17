//import logo from './logo.svg';  elimino logo
//import './App.css';  elimino file App.css perché non serve a nulla
import Header from './Header';
import SearchItem from './SearchItem';
import Content from './Content';
import Footer from './Footer';
import { useState, useEffect } from 'react';
import AddItem from './AddItem';
//importo funzione per API
import apiRequest from './apiRequest';

function App() {
  const API_URL = " http://localhost:3500/items";
  //const API_URL = " http://localhost:3500/itemss";

    const [items, setItems] = useState( [] ); 

  const [newItem, setNewItem] = useState('');
  const [search, setSearch] = useState('');
  const [fetchError, setFetchError] = useState(null);
  // uso stato per far capire che la pagina sta caricando i dati (in attesa
  // della conclusione della risposta dell'API)
  const [isLoading, setIsLoading] = useState(true); // di default true perché pagina deve caricarsi

  useEffect(() => {

    const fetchItems = async () => {
      try {
        const response = await fetch(API_URL); // default ho method = GET
      // dopo che ho caricato dati li assegno alla lista
        const listItems = await response.json();
        // aggiungo controllo se risposta è avvenuta correttamente, in caso contrario
        // genero errore
        if(!response.ok)
          throw Error('Did not receive expected data');
        setItems(listItems);
        setFetchError(null); // se ho risposta rendo nullo l'errore
      } catch(err) {
        // se non ottengo risposta genero errore
        setFetchError(err.message);
      }
      finally {
        // una volta finito tutto metto loading a false
        // sia che sia anadato tutto bene che con errore
        setIsLoading(false);
      }
      
    }

    // simulo risposta di una restAPI reale, che può essere più lenta
    // di quella con JSONserver
    setTimeout(() => {
        // richiamo funzione ogni volta che aggiorno
        fetchItems();
    }, 2000);
  
  }, [])  // aggiungo dipendenza di useEffect


  const addItem = async (item) => {
    const id = items.length ? items[items.length - 1].id + 1 : 1
    const myNewItem = {id, checked: false, item};
    const listItems = [...items, myNewItem]; 
    setItems(listItems); 

    //opzioni della richiesta
    // creo richiesta di POST (aggiunta nuovo elemento)
    const postOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'      },
        body: JSON.stringify(myNewItem)

    }

    const result = await apiRequest(API_URL, postOptions); //risultato è errore
    if(result)
      setFetchError(result);  //se ho errore 


  }

   const handleCheck = async (id) => {    
    const listItems = items.map((item) => item.id === id ? {...item,
    checked: !item.checked} : item);  
     setItems(listItems);
     
    const myItem = listItems.filter((item) => item.id === id);
    // creo richiesta di PATCH (aggiornamento DB modificando elemento)
    const updateOptions = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({checked: myItem[0].checked})
    }
    const reqUrl = `${API_URL}/${id}`;
    const result = await apiRequest(reqUrl,updateOptions);

    if(result)
      setFetchError(result);  
  }

  const handleDelete = async (id) => {
      const listItems = items.filter((item) => item.id !== id);
      setItems(listItems); 

    // creo richiesta di DELETE (anche qua devo specificare id di quale elemento eliminare)
      const deleteOptions = {
        method: 'DELETE'
      };
    const reqUrl = `${API_URL}/${id}`;
    const result = await apiRequest(reqUrl,deleteOptions);
   
    if(result)
       setFetchError(result); 
    }


  const handleSubmit = (e) => {
      e.preventDefault();  
  
      if(!(newItem)) return;
      //addItem
      addItem(newItem);
      setNewItem('');
  }

  return (
    <div className="App">
      <Header title="Groceries" />
      <AddItem 
        newItem={newItem}
        setNewItem={setNewItem}
        handleSubmit={handleSubmit}
      />
      <SearchItem
        search={search}
        setSearch={setSearch}
        />

      <main>
        {isLoading && <p>Loading Items...</p>}
        {fetchError && 
        <p style = {{ color: "red" }}>
          {`Error: ${fetchError}`}
        </p>}
      {!fetchError && !isLoading &&
      <Content 
            items = {items.filter(item => ((item.item).toLowerCase()).includes(
              search.toLowerCase()
            ))}
            setItems = {setItems} 
            handleCheck = {handleCheck}
            handleDelete = {handleDelete}
      />
      }
      </main>

      <Footer length = {items.length} />
    </div>
  );
}

export default App;
