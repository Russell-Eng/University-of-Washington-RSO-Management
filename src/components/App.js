import React, { useState, useEffect } from 'react';
import { NavBar } from './NavBar';
import { Footer } from './Footer';
import { AddEvent, RSOEventList, RSOIntro } from './RSOPage';
import { EventInfo } from './EventInfo';
import { Route, Switch, Redirect } from 'react-router-dom';
import { SignInPage } from './SignInPage';
import { AboutUsPage } from './AboutUsPage';
import { HomePage } from './HomePage';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, set as firebaseSet, child, } from 'firebase/database'
import { EventForm } from './Form';
import { EditProfile } from './EditProfile';


function App(props) {
    const [currentUser, setCurrentUser] = useState({});
    const [isSignedIn, setIsSignedIn] = useState(false);
    const db = getDatabase();

    useEffect(() => {

        const auth = getAuth();
        const unregisterAuthListener = onAuthStateChanged(auth, (firebaseUser) => {
            if (firebaseUser) {


                setCurrentUser(firebaseUser);
                setIsSignedIn(true);
            } else {
                setCurrentUser(null);
                setIsSignedIn(false);
            }
        })

        return () => {
            unregisterAuthListener();
        }
    }, []);

    const pushEvent = (eventDes, eventDate, eventTitle) => {

        const newEventObj = {
            description: eventDes,
            eventImages: [],
            image: null,
            startDate: eventDate,
            responsibleRSO: currentUser.displayName,
            title: eventTitle
        }

        const eventRef = ref(db, "rsos/" + currentUser.displayName + "/events");
        firebaseSet(child(eventRef, eventTitle), newEventObj)//change the database
            .catch((err) => {
                console.log(err.message)
            }) //handle errors in firebase
    }

    const createRSOProfile = (RSOName, RSOdescription) => {
        const newProfileObj = {
            description: RSOdescription,
            logo: "https://firebasestorage.googleapis.com/v0/b/info-340-rso-page.appspot.com/o/no-image.png?alt=media&token=d1349fb1-0785-4bd7-bca4-d0fa7f6a0929",
            name: RSOName
        }
        const RSORef = ref(db, "rsos/" + currentUser.displayName);
        firebaseSet(RSORef, newProfileObj)//change the database
            .catch((err) => {
                console.log(err.message)
            }) //handle errors in firebase
        //   window.location.reload();
    }


    return (
        <div>

            <Switch>
                <Route exact path='/'>
                    <NavBar isSignedIn={isSignedIn} user={currentUser} />
                    <HomePage user={currentUser} />
                </Route>

                <Route path='/login'>
                    <NavBar isSignedIn={isSignedIn} user={currentUser} />
                    <SignInPage user={currentUser} />

                </Route>

                <Route path='/about'>
                    <NavBar isSignedIn={isSignedIn} user={currentUser} />
                    <AboutUsPage />
                    <Footer />
                </Route>

                <Route path='/addEvent'>
                    <NavBar isSignedIn={isSignedIn} user={currentUser} />
                    <EventForm user={currentUser} whatToDoOnSubmit={pushEvent} />
                    <Footer />
                </Route>

                <Route path='/createProfile'>
                    <NavBar isSignedIn={isSignedIn} user={currentUser} />
                    <EditProfile whatToDoOnSubmit={createRSOProfile} user={currentUser} />
                    <Footer />
                </Route>

                <Route path='/RSO/:rsoName'>
                    <NavBar isSignedIn={isSignedIn} user={currentUser} />
                    <RSOIntro />
                    <AddEvent user={currentUser} />
                    <RSOEventList />
                    <Footer />
                </Route>

                <Route path='/event/:rsoName/:eventName'>
                    <NavBar isSignedIn={isSignedIn} user={currentUser} />
                    <EventInfo user={currentUser} />
                </Route>

                <Redirect to="/"></Redirect>

            </Switch>
        </div>
    );
}

export default App;