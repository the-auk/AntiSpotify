import React, {Component} from 'react';
import './Spotify.scss';
import axios from 'axios';

export default class First extends React.Component {

    
    handlelogin(){
        axios
        .get('http://localhost:8888/login', {
            headers: {
                'Access-Control-Allow-Origin': '*',
              }   
        })
        .then()
        .catch(err => {
          console.error(err);
        });
    }
    
    render(){
        return(

            <div className="container">
            <div className="info">   
                <div className="logo"><p>Anti-Spotify</p></div>
                <button className="btn" name="login" onClick= {() => this.handlelogin()}> Log-in to Spotify </button>
            </div> 
            </div>

        );
            

    }
}