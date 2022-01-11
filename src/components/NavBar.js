import React, { useEffect, useState } from "react";
import { getAuth, signOut } from 'firebase/auth';
import { Link, NavLink } from 'react-router-dom';
import { getDatabase, ref, onValue } from 'firebase/database'

export function NavBar(props) {
    const [rsosList, setRsoList] = useState([]);
    const db = getDatabase();
    let tempList = [];
    useEffect(() => {

        const currentRSORef = ref(db, 'rsos')
        const offFunction = onValue(currentRSORef, (snapshot) => {
            const newValue = snapshot.val();
            for (const rso in newValue) {
                tempList.push(rso);
            }
            setRsoList(tempList);

        })

        return () => {
            offFunction();
        }

    }, [])

    const handleSignOut = () => {
        signOut(getAuth());
    }

    return (
        <nav className="navbar navbar-expand-sm navbar-light">
            <div className="container-fluid ">
                <Link to="/" className="navbar-brand text-light" >UW RSO Events</Link>
                <div>
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <NavLink to="/about" className="nav-link text-light rounded-pill" aria-current="page">About Us</NavLink>
                        </li>
                        <li className="nav-item">
                            {props.user && !rsosList.includes(props.user.displayName) &&
                                <Link to="/createProfile" className="nav-link text-light rounded-pill"> Create Profile</Link>
                            }
                            {props.isSignedIn && props.user && rsosList.includes(props.user.displayName) &&
                                <Link to={"/RSO/" + props.user.displayName} className="nav-link text-light rounded-pill">Profile</Link>
                            }
                            {!props.user &&
                                <Link to={"/"} className="nav-link text-light rounded-pill">Guest</Link>
                            }
                        </li>
                        <li className="nav-item">
                            {!props.isSignedIn &&
                                <NavLink to="/login" className="nav-link text-light rounded-pill">Sign In</NavLink>
                            }
                            {props.isSignedIn &&
                                <Link to="/" className="nav-link text-light rounded-pill" onClick={handleSignOut}>Sign Out</Link>
                            }
                        </li>

                    </ul>
                </div>
            </div>
        </nav>
    );
}