import React, {useEffect} from 'react';
import './styles/styles.css';
import {Provider, useDispatch, useSelector} from "react-redux";
import {login} from "./redux/auth/AuthSlice";
import {store, RootState} from "./redux/Store";
import RoutesComponent from "./routes/RoutesComponent";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import LoginPage from "./pages/LoginPage";


// ===================================================

const RootApp: React.FC = () => {
    const dispatch = useDispatch();
    const {user} = useSelector((state: RootState) => state.auth);

    // let testUser = {name: "Nimal", "email": 'nimal@gmail.com'}
    console.log(user)

    if (user) {
        return <RoutesComponent/>;
    } else {
        return (
            <div className="container">
                <RouterProvider
                    router={createBrowserRouter([
                        {
                            path: "/",
                            element: <LoginPage/>,
                            children: [
                                {path: "", element: <LoginPage/>},
                                {path: "login", element: <LoginPage/>}
                            ]
                        },
                    ])}
                />
            </div>
        );
    }

    // Check if a user is stored in localStorage on app load
    // useEffect(() => {
    //     const user = getAuthUser();
    //     if (user) {
    //         dispatch(login(user)); // If user exists in localStorage, log them in automatically
    //     }
    // }, [dispatch]);
    //
    // return (
    //     <RoutesComponent/>
    // );
}

const App = () => (<RootApp/>);

export default App;