import React from 'react'

const Context = React.createContext({
    user: {},
    isLoggedIn: () => {},
    token: 'string',
    setUser: () => {},
    logOut: () => {},
    updateUser: () => {}
})

export default Context;
