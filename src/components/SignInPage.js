import React from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { getAuth, EmailAuthProvider } from "firebase/auth";
import { Redirect } from "react-router";

export function SignInPage(props) {

    const auth = getAuth();

    const firebaseUIConfig = {
        signInOptions: [
            { provider: EmailAuthProvider.PROVIDER_ID, requiredDisplayName: true }
        ],
        signInFlow: 'popup',
        credentialHelper: 'none',
        callbacks: {
            signInSuccessWithAuthResult: () => {
                return false;
            }
        }
    }

    if (props.user) {
        return <Redirect to="/" />
    }

    return (
        <div className="sign-in-page">
            <div className="container">
                <div className="sign-in-message mt-3 fs-4 bg-warning text-dark opacity-75">
                    <p className="ms-5 me-2" >Note: This sign in function is meant to be only used by Registered Student Organization at the University of Washington. However, for testing purpose, you can now sign up using your own email account (or a fake email account) to create you own imaginary organization and upload your own imaginary event to the website!</p>
                </div>
            </div>
            <StyledFirebaseAuth className="mt-5" uiConfig={firebaseUIConfig} firebaseAuth={auth} />
        </div>
    )
}