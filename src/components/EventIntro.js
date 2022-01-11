import React from "react";

export function EventIntro(props) {
    return (
        <div className="event_container p-3 mb-2 bg-light text-dark">
            <div className="eventInfo">
                <h1 className="event_h1"><strong>{props.title}:</strong></h1>
                <p>
                    {props.description}
                </p>
            </div>
        </div>
    )
}