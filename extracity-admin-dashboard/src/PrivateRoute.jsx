import React from 'react'
import { Redirect, Route } from 'react-router'
import { useAuth } from './contexts/AuthContext'

export default function PrivateRoute({ component: component, ...rest }) {
    const { currentUser } = useAuth()

    return (
        <Route
            {...rest}
            render={(props) => {
                return currentUser ? (
                    <Component {...props} />
                ) : (
                    <Redirect to='/login' />
                );
            }}
        ></Route>
    )
}
