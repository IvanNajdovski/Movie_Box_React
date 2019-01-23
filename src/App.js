import React, {Component} from 'react';
import {Route, Redirect, Switch} from 'react-router-dom';
import './App.css';


import NavigationBar from './components/navigation/NavigationBar';
import MainContent from './containers/MainContent/MainContent';
import Movie from "./containers/Movie/Movie";
import Footer from './components/Footer/Footer';

class App extends Component {
    componentWillUnmount(){
        localStorage.removeItem("genders");
    }

    render() {
        return (
            <div>
                <NavigationBar/>
                <Switch>
                    <Route path={"/"} exact component={MainContent}/>
                    <Route path={"/:type/:id"} component={Movie}/>
                    <Redirect to={"/"}/>
                </Switch>
                <Footer/>
            </div>
        );
    }
}

export default App;
