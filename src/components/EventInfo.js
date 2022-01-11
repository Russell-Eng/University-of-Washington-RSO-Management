import React, { useEffect, useState } from 'react';
import { EventIntro } from "./EventIntro";
import { EventRso } from "./EventRso";
import { EventPageBanner } from "./EventPageBanner";
import { Footer } from './Footer';
import { getDatabase, ref, onValue } from 'firebase/database'
import { useParams } from 'react-router-dom';

export function EventInfo(props) {

    const [images, setImages] = useState([{}]);
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');

    const db = getDatabase();
    const urlParams = useParams();


    useEffect(() => {
        const bannerImgRef = ref(db, "rsos/" + urlParams.rsoName + "/events/" + urlParams.eventName)


        const offFunction = onValue(bannerImgRef, (snapshot) => {

            const newValue = snapshot.val();
            let eventImage = newValue.eventImages;

            eventImage = eventImage.filter((element) => {
                return element !== null;
            })

            const imageObj = eventImage.map((element) => {
                let object = {};
                object['image'] = element;
                return object;
            })

            let eventTitle = newValue.title;
            let eventText = newValue.description;


            setImages(imageObj);
            setTitle(eventTitle);
            setText(eventText);

        });

        function cleanUp() {
            offFunction();
        }
        return cleanUp;

    }, []);

    return (

        <div>
            <EventPageBanner eventsBanner={images} />
            <section className="name">
                <EventIntro title={title} description={text} />
                <EventRso />
            </section>
            <Footer />
        </div>

    )
}

