import React, { useEffect, useState } from 'react';
import { getDatabase, ref, onValue } from 'firebase/database'
import { useParams } from 'react-router-dom';


export function EventRso(props) {

    const db = getDatabase();
    const [name, setName] = useState('');
    const [logo, setLogo] = useState({})
    const urlParams = useParams();

    useEffect(() => {
        const nameRef = ref(db, "rsos/" + urlParams.rsoName)

        const offFunction = onValue(nameRef, (snapshot) => {

            const newValue = snapshot.val();

            let RSOName = newValue.name;
            let RSOLogo = newValue.logo;

            setName(RSOName);
            setLogo(RSOLogo);


        });

        function cleanUp() {
            offFunction();
        }
        return cleanUp;

    }, []);

    return (
        <div className="responsibleRSO">
            <div>
                <h1 className="rs"><strong>Responsible RSO:</strong></h1>
                <a href={"/RSO/" + urlParams.rsoName}>
                    <img className="event_logo" src={logo} alt="Logo"></img>
                    <button className="btn btn-outline-primary me-5" type="submit" >Click For More RSO Infomation</button>
                </a>
            </div>
            <h2 className="rs_name"><strong>{name}</strong></h2>
        </div>

    )
}