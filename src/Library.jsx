import React, {Component} from 'react';
import './Library.scss';
import axios from 'axios';
const books = [];

export default class Library extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        firstname: '',
        username: '',
        amountowed: '0',
        bookISBN: '',
        books: []   
      };
      this.getUser();
      this.getBook();
    }  

      handleSubmit = e => {
        alert("Book Borrowed");
      //e.preventDefault();
      console.log("send");
        this.setState({
          bookISBN : e
        })
      //send objects or arrays not values

      axios
        .post('http://localhost:3001/borrow', {bookISBN: e})
        .then(res => alert('Book Borrowed'))
        .catch(err => {
          console.error(err);
        });
    };

      getUser() {
        axios.get('http://localhost:3001/user')
            .then(response => {this.setState({
              firstname: response.data.firstname,
              username: response.data.username,
              amountowed: response.data.amountowed
            })})
            .catch(e => {
                console.log(e);
            });
      }
    
      getBook() {
        console.log("fetching now");
        axios.get('http://localhost:3001/library')
            .then(response => {
              this.setState({
                books: response.data.books,
                bookName: response.data.books[0].bookName,
                bookISBN: response.data.books[0].bookISBN,
                bookAuthor: response.data.books[0].bookAuthor
              })
              console.log(this.state.books);
            })
            // .then(response => {this.setState({
            //   bookName: response.data.bookName,
            //   bookTitle: response.data.bookTitle,
            //   bookAuthor: response.data.bookAuthor
            // })})
            .catch(e => {
                console.log(e);
            });
      }

     // async getBook(){
    //   let res  = await fetch('http://localhost:3001/library');
    //   res = await res.json();
    //   console.log(res);
    //   this.setState({
    //     bookName: res.body.bookName,
    //     booktitle: res.body.bookTitle,
    //     bookAuthor: res.body.bookAuthor
    //   });
    // }
    gotobook(){
      window.location.replace('/book');
    }

    //create an array of all objects and then map it inside the render
    render() {
      return (
        <div className="base">
          <div className="top-container">
            <div className="left-info">
            <div className="form"><p>{this.state.firstname}</p></div>
            <div className="form"><p>{this.state.username}</p></div>

            </div>
            <div className="right-info"> 
              <button onClick= {() => this.gotobook()} name="books" id="books" className="btn">All Borrowed Books</button> 
              <div className="form"><p>Amount Owed: {this.state.amountowed}</p></div>              
            </div>  
          </div>
          <div className="bottom-container">
            <div className="bottom-nav"><h2>List of Books</h2></div>
          
          {this.state.books?.map((book, index) => (
          //<form onSubmit = {this.handleSubmit}>
          <div className="book-data">
            <div className="bookName">Name: &ensp; {book.bookName}</div>
            <div name="bookisbn" className="bookisbn">ISBN: &ensp; {book.bookISBN}</div>
            <div className="author">Author: &ensp; {book.bookAuthor}</div>
            <button onClick={() => this.handleSubmit(book.bookISBN)} className="btn" name="borrow"> Borrow </button>
          </div>
          //</form>
          ))}

        </div>
        </div>
      );
    }
  }