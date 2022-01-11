import React, { useState, useEffect } from 'react';
import { useParams, Link, Redirect } from 'react-router-dom';
import { getDatabase, ref, onValue } from 'firebase/database'


export function AddEvent(props) {
    const urlParams = useParams();
    return (
        <section>
            <div className="rsoPage addEvent">
                <h2 className="rsoPage"><strong>{"Events"}</strong></h2>
                {props.user && (props.user.displayName === urlParams.rsoName) &&
                    <Link to='/addEvent'>
                        <button aria-label="add a new event" type="button" className="btn btn-dark btn-sm rsoPage">+</button>
                    </Link>
                }
            </div>
        </section>
    );
}

function RSOEventCard(props) {

    const urlParams = useParams();
    const [redirectTo, setRedirectTo] = useState(undefined);

    const handleClick = () => {
        setRedirectTo("/event/" + urlParams.rsoName + "/" + props.title);
    }

    if (redirectTo) {
        return <Redirect push to={redirectTo} />
    }

    return (
        <div className="card rsoPage" onClick={handleClick}>
            <div className="img_container">
                <img src={props.img} alt="A photo of the event"></img>
            </div>
            <h3 className="rsoPage"><strong>{props.title}</strong></h3>
            <h4 className="rsoPage"><time dateTime={props.startDate}>{props.startDate}
            </time></h4>
            <p>{props.description}</p>
        </div>
    );
}

export function RSOEventList() {
    const [cardArray, setCardArray] = useState([]) //store prop as state
    const urlParams = useParams();
    const db = getDatabase();

    useEffect(() => { //function when component first loads
        const exampleRef = ref(db, "rsos/" + urlParams.rsoName + "/events");

        const offFunction = onValue(exampleRef, (snapshot) => {
            const allCards = snapshot.val(); //extract the value from the snapshot
            if (allCards) {
                const keyArray = Object.keys(allCards); //[MpsA2, MpsA4, MpsA6, MpsBs]
                const cardsArray = keyArray.map((cardKey) => {
                    const theCardCopy = { ...allCards[cardKey], firebaseKey: cardKey };
                    return theCardCopy;
                })

                setCardArray(cardsArray);
            }
        })

        //instructions on how to leave will be called by React when component unmounts
        function cleanup() {
            offFunction(); //turn the listener off
        }
        return cleanup; //leave the instructions behind
    }, [db]);

    const cards = cardArray.map((event) => {
        return <RSOEventCard title={event.title} img={event.image} startDate={event.startDate} description={event.description} key={event.title} />
    });

    return (
        <section className="eventCard">
            <div className="container rsoPage">
                {cards}
            </div>
        </section>
    );
}

export function RSOIntro() {
    const [rsoArray, setRSOArray] = useState({}) //store prop as state
    const urlParams = useParams();
    const db = getDatabase();

    useEffect(() => { //function when component first loads
        const exampleRef = ref(db, "rsos/");

        //addEventListener('databaseValueChange', () => {})
        const offFunction = onValue(exampleRef, (snapshot) => {

            const allInfo = snapshot.val(); //extract the value from the snapshot

            const keyArray = Object.keys(allInfo); //[MpsA2, MpsA4, MpsA6, MpsBs]
            const infoArray = keyArray.map((infoKey) => {
                const theInfoCopy = { ...allInfo[infoKey], firebaseKey: infoKey };
                return theInfoCopy;
            })


            const filteredRSO = infoArray.filter((rso) => {
                return rso.firebaseKey === urlParams.rsoName //replace this string
            });

            setRSOArray(filteredRSO[0]);

        })


        //instructions on how to leave will be called by React when component unmounts
        function cleanup() {
            offFunction(); //turn the listener off
        }
        return cleanup; //leave the instructions behind
    }, [db]); //when to re-run (never)
    return (
        <section className="intro">
            <div className="rsoPage row">
                <div className="column rsoPage logo">
                    <img src={rsoArray.logo} alt="Logo"></img>
                </div>

                <div className="column rsoPage rsoInfo center">
                    <h1 className="rsoPage"><strong>{rsoArray.name}</strong></h1>
                    <p>{rsoArray.description}</p>
                </div>

            </div>
        </section>
    );

}