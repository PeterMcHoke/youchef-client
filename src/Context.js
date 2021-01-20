import React from 'react'

const Context = React.createContext({
    user: {},
    isLoggedIn: () => {},
    token: 'string',
    setUser: () => {},
    logOut: () => {},
    updateUser: () => {},
    initialSaved: () => {},
    save: () => {},
    removeRecipe: () => {},
    savedIDs: []
})

export default Context;
