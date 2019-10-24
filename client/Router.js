import React, { Component } from 'react';
import axios from 'axios'
import {
  BrowserRouter,
  Switch,
  Route,
} from 'react-router-dom';
import Home from './components/home/Home.js';

const fetchUser = async ()=> {
  console.log((await axios.get('/api/session')).data);

}

class Router extends Component {
  componentDidMount(){
    fetchUser();
      }
  render() {
    return (
      <BrowserRouter>
        <Switch>
          {/* TODO: This should lead to an authenticated page... */}
          <Route path={"/user"} exact>
            Hello There!
          </Route>
          <Route>
            <Home />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default Router;
