import React, { useEffect } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { useNavigate } from 'react-router-dom'
import send from '../functions/sendRequest';

const Container = ({ children }) => {

    const [pageStack, setPageStack] = React.useState(null)
    const navigate = useNavigate()

    const { loginWithRedirect, logout, isAuthenticated, isLoading, user } = useAuth0();

    // define style
    const style = {
        fontFamily: 'system-ui, sans-serif',
        textAlign: 'center',
        position: 'relative',
        color: 'white',
        height: '97vh',
        backgroundColor: '#282c34',
        padding: '10px',
        margin: "10px 10px 10px 10px",
        borderRadius: '10px',
        overflow: 'hidden',

        div: {
            height: '80%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
        },

    };

    useEffect(() => {
        // get page stack from local storage
        const pageStack = JSON.parse(localStorage.getItem('pageStack'))
        // if page stack is not null
        if (pageStack) {
            // if page stack is not empty
            if (pageStack.length > 0) {
                // if current page is in the stack, remove until that index
                if (pageStack.includes(window.location.pathname)) {
                    // get index of current page
                    const index = pageStack.indexOf(window.location.pathname)
                    // remove all pages after current page
                    pageStack.splice(index + 1, pageStack.length - index)
                    // set page stack to local storage
                    localStorage.setItem('pageStack', JSON.stringify(pageStack))
                }

                // if current page is not the same as the last page in the stack
                else if (pageStack[pageStack.length - 1] !== window.location.pathname) {
                    // add current page to the stack
                    pageStack.push(window.location.pathname)
                    // set page stack to local storage
                    localStorage.setItem('pageStack', JSON.stringify(pageStack))
                }
            }
            // if page stack is empty
            else {
                // add current page to the stack
                pageStack.push(window.location.pathname)
                // set page stack to local storage
                localStorage.setItem('pageStack', JSON.stringify(pageStack))
            }
        }
        // if page stack is null
        else {
            // create new page stack
            const pageStack = []
            // add current page to the stack
            pageStack.push(window.location.pathname)
            // set page stack to local storage
            localStorage.setItem('pageStack', JSON.stringify(pageStack))
        }
        // set page stack to state
        setPageStack(JSON.parse(localStorage.getItem('pageStack')))

    }, [window.location.pathname])


    // useEffect(() => {
    //     if(isAuthenticated && user && user.sub){
    //         send('/api/burgers', {}, 'GET', user.sub)
    //         .then((data) => {
    //             if (!data.ok) {
    //                 send('/api/burgers', null, 'POST', user.sub)
    //             }
    //         })
    //         .catch((err) => console.log(err));
    //     }
    // }, [isAuthenticated, user])

    return (
        <div style={style}>
            <header>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}>
                    <h1 style={{
                        textAlign: 'center'
                    }}>Restaurant App</h1>
                    <div style={{
                        textAlign: 'right',
                    }}>
                        {
                            !isLoading && !isAuthenticated && (
                                <button onClick={() => loginWithRedirect()} className="ui button">Log in</button>
                            )
                        }
                        {
                            // profile button
                            !isLoading && isAuthenticated && (
                                <button onClick={() => navigate('/profile')} className="ui button">Profile</button>
                            )
                        }
                        {

                            !isLoading && isAuthenticated && (
                                <button onClick={() => logout(
                                    {
                                        returnTo: window.location.origin,
                                    }
                                )} className="ui button">Log out</button>
                            )
                        }

                    </div>
                </div>
                {
                    pageStack &&
                    <div style={{
                        display: 'flex',
                        justifyContent: 'left',
                    }}>
                        {
                            // side by side 
                            pageStack.map((page, index) => (
                                index == 0 ?
                                    <span key={index}>
                                        <a href={page}>{"Home"}</a>
                                    </span>
                                    :

                                    index !== pageStack.length - 1 ?
                                        <span key={index}>
                                            <a href={page}>{page}</a>
                                            <span> {'>'} </span>
                                        </span>
                                        :
                                        <span key={index}>
                                            {page}
                                        </span>
                            ))

                        }
                    </div>
                }
            </header>

            <div style={style.div} className="container">
                {children}
            </div>
        </div>

    )
}

export default Container