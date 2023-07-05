import React, { useState } from 'react';
import '../../App.css';
import { FaSearch } from 'react-icons/fa';

export default function BookSearchEngine() {
  const [data,setData] = useState([]);
  const [txt,setText] = useState('');

 function findBook(text){
   if (text) {
    setText(text)
    let query = text;
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`)
    .then(res => res.json())
    .then((bookData) => {
      console.log(bookData)
      let dataArray = []
      bookData.items.forEach((item) => {
        dataArray.push(item)
      })
      setData(dataArray)
    })
    .catch(err => console.log(err))
   }else{
    setData([])
   }
  }

  function handleSubmit(e){
    e.preventDefault();
    let text = txt;
    if (text) {
     let query = text;
     fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`)
     .then(res => res.json())
     .then((bookData) => {
       console.log(bookData)
       let dataArray = []
       bookData.items.forEach((item) => {
         dataArray.push(item)
       })
       setData(dataArray)
     })
     .catch(err => console.log(err))
    }else{
     setData([])
    }
   }

  return (
    <div className='book-parent'>
        <form onSubmit={handleSubmit}
        className='book-form' >
        <input onChange={(e) => findBook(e.target.value)} className='book-input' type="text" placeholder='Search..' />
        <button className='book-btn'>
          <FaSearch />
        </button>
        </form>
        <div id='book-data'>
          {
            data?.map((item,index) => (
              <div key={index}
               className='each-book'>
                <img src={item?.volumeInfo?.imageLinks?.thumbnail} alt="img" style={{width:125,height:125}} />
                <div style={{ padding:10 }}>
                  <h3>{item?.volumeInfo?.title}</h3>
                  <p>{item?.volumeInfo?.description}</p>
                  <br />
                  <div className='link'>
                  <a className='view' href={item?.volumeInfo?.infoLink}>View More</a>
                  <a className='read' href={item?.volumeInfo?.previewLink}>Read Book</a>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
    </div>
  )
}
