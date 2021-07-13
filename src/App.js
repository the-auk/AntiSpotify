import React, {Component} from 'react';
import "./App.scss";
import Main from "./Main";
import Library from "./Library";
import Book from "./Book";
import Spotify from "./Spotify";
import Tattoo from "./Tattoo";
import {Route, Links} from "react-router-dom";

function App() {
  return(
    <div>
    <Route exact path="/" component={Main} />
    <Route exact path="/Library" component={Library} />
    <Route exact path="/Book" component={Book} />
    <Route exact path="/Spotify" component={Spotify} />
    <Route exact path="/Tattoo" component={Tattoo} />
    </div>
  );
} 

export default App;