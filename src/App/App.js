import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Nav from '../Nav/Nav';
import Pantry from '../Pantry/Pantry'
import Context from '../Context'
import SignUp from '../SignUp/SignUp'
import Cookbook from '../Cookbook/Cookbook'
import Home from '../Home/Home'
import Login from '../Login/Login'
import UserProfile from '../UserProfile/UserProfile'
import CookieService from '../CookieService'
import { GlobalStyles } from '../elements/global.js'
import { ThemeProvider } from 'styled-components';
import { theme } from '../elements/theme';
import * as API from '../apiCalls';



export default class App extends Component {
    state = {
        error: null,
        user: null,
        token: null,
        savedIDs: [],
    }


    componentDidMount() {
        const { user, token } = CookieService.getLoginInfo();
        this.setUser(user, token)
        if (this.state.token)
            this.initialSaved();
    }

    setUser = (user, token) => {
        this.setState({ user, token })
    }

    logout = () => {
        this.setUser(null, null);
        CookieService.deleteLoginInfo();
    }

    initialSaved = () => {
        API.getSavedRecipes(this.state.token)
            .then(results => {
                results.forEach((recipe) => {
                    //Alvaro, why does this need to be ...new Set as opposed to just {savedIDs: new Set([...this.state.savedIDs, recipe.id])}
                    this.setState({ savedIDs: [...new Set([...this.state.savedIDs, recipe.id])] })
                })
            })
    }

    
    save = (id) => {
        console.log('Save is being called with recipe id '+ id);
        API.saveRecipe(id, this.state.token)
            .then(res => {
                if(res === 201)
                    this.setState({savedIDs: [...this.state.savedIDs, id]})
            })
            .catch(err => console.log(err))
    }

    removeRecipe = (id) => {
        console.log('Remove recipe is being called on id' + id)
        API.deleteSavedRecipe(id, this.state.token)
            .then((res) => {
                if (res === 200)
                    this.setState({ savedIDs: this.state.savedIDs.filter(i => i !== id) })
            })
    }

    isLoggedIn = () => !!this.state.token && !!this.state.user

    userLoggedIn = (user, token) => { this.setUser(user, token); CookieService.setLoginInfo(user, token); }

    updateUser = (fields) => {
        this.setState({ user: {
            ...this.state.user,
            ...fields,
        }})
    }

    render() {
        const value = {
            error: this.state.error,
            user: this.state.user,
            token: this.state.token,
            setUser: this.userLoggedIn,
            isLoggedIn: this.isLoggedIn,
            save: this.save,
            savedIDs: this.state.savedIDs,
            logout: this.logout,
            removeRecipe: this.removeRecipe,
            updateUser: this.updateUser,
            initialSaved: this.initialSaved,
            setSaved: this.setSaved
        }

        return (
            <ThemeProvider theme={theme}>
              <>
              <GlobalStyles />
                <Context.Provider value={ value }>
                    <Nav />
                    <main className='App'>
                        <Route exact path='/' component = {Home} />
                        <Route path='/find-recipes' component={Pantry} />
                        <Route path='/sign-up' component={SignUp} />
                        <Route path='/login' component={Login} />
                        <Route path='/cookbook' component={Cookbook}/>
                        <Route path='/account' component={UserProfile} />
                    </main>
                </Context.Provider>
            </>
        </ThemeProvider>
      );
  }
}
