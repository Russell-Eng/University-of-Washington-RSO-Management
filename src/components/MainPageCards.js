import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';


function SingleCard(props) {

    const [redirectTo, setRedirectTo] = useState(undefined);
    let eventName = props.singleEvent.title;
    let rso = props.singleEvent.responsibleRSO
    let fullParam = 'event/' + rso + "/" + eventName;


    const handleClick = () => {
        setRedirectTo(fullParam);
    }

    if (redirectTo) {
        return <Redirect push to={redirectTo} />
    }

    return (
        <div className="whole-card col-md-12 col-lg-6 col-xl-3 d-flex text-decoration-none" onClick={handleClick}>
            <div className="card mb-4 shadow">
                <div className="card-body">
                    <div className="row">
                        <div className="col-sm">
                            <img className='card-img' src={props.singleEvent.image} alt={props.singleEvent.title} />
                            <h2 className="card-title">{props.singleEvent.title}</h2>
                            <h3 className='event-time'>{props.singleEvent.startDate}</h3>
                            <p className="card-text">{props.singleEvent.description}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export function CardList(props) {
    const allCards = props.cardInfo;
    let filteredCards = allCards.filter((element) => {
        return element.title.toLowerCase().includes(props.keyWord.toLowerCase());
    })
    let cardToDisplay = '';

    if (props.keyWord === '') {
        cardToDisplay = allCards.map((element) => {
            return (
                <SingleCard singleEvent={element} key={element.title} />
            )
        })
    } else if (filteredCards.length !== 0) {
        cardToDisplay = filteredCards.map((element) => {
            return (
                <SingleCard singleEvent={element} key={element.title} />
            )
        })
    } else {
        return (<h2 className="text-danger text-center mt-5 mb-5">No Results Found</h2>);
    }

    return (
        <div className="container">
            <div className="row">
                {cardToDisplay}
            </div>
        </div>
    );
}