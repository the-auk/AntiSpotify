import React, {Component} from 'react';
import './Tattoo.scss';
import { Login, Register } from "./login/index";

export default class Tattoo extends React.Component {
    
    render(){
        return(
            <div className="tatcontainer">
                <div className="tatboxwrap">
                    <div className="tattop">
                        <h1>Oni</h1>
                    </div>
                    <div className="tatmiddle">
                        <p>Login</p>
                        <form className='tatform'>
                            <label for="username">Username</label>
                            <input type="text" id="username" placeholder="username" required />
                            <label for="password">Password</label>
                            <input type="password" id="password" placeholder="password" required />
                            <button className="btn" type="submit">Login</button>
                            </form>
                    </div>
                    <div className="tatbottom">
                    <p>For the people who love tattoos<br />
                           made by people who love tattoos</p>
                    </div>
                    </div>
                    
            </div>

        );
            

    }
}