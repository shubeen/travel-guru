import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { SelectContext } from '../../App';


const PrivateRoute = ({children, ...rest}) => {

    const [loggedInUser, setLoggedInUser] = useContext(SelectContext);
    return (
        <Route
      {...rest}
      render={({ location }) =>
        loggedInUser.email ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
    );
};

export default PrivateRoute;