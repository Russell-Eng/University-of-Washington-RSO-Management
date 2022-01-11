import React, { useEffect, useState } from 'react';
import { getDatabase, ref, onValue } from 'firebase/database'
import { Footer } from './Footer';
import { MainPageBanner } from './MainPageBanner';
import { SearchBar } from './SearchBar';
import { CardList } from './MainPageCards';

export function HomePage() {
  const [card, setCard] = useState([]);
  const [data, setData] = useState([{}]);
  const [keyWord, setKeyWord] = useState('');

  const db = getDatabase();

  useEffect(() => {
    const bannerImgRef = ref(db, 'rsos')

    const offFunction = onValue(bannerImgRef, (snapshot) => {

      const newValue = snapshot.val();
      let allRsosArray = [];
      for (const rso in newValue) {
        allRsosArray.push(newValue[rso]);
      }
      const eventsArray = allRsosArray.map((element) => {
        return element.events;
      })
      let compiledEventsArray = [];
      for (let i = 0; i < eventsArray.length; i++) {
        for (const property in eventsArray[i]) {
          compiledEventsArray.push(eventsArray[i][property]);
        }
      }
      const imagesArray = compiledEventsArray.map((element) => {
        let obj = {};
        obj['image'] = element.image
        return obj
      })

      setCard(compiledEventsArray);
      setData(imagesArray);

    });

    function cleanUp() {
      offFunction();
    }
    return cleanUp;

  }, []);

  const toDisplay = (searchTerm) => {
    setKeyWord(searchTerm);
  }


  return (
    <div>
      <MainPageBanner bannerImgs={data} />
      <SearchBar whatToDoOnSubmit={toDisplay} />
      <CardList cardInfo={card} keyWord={keyWord} />
      <Footer />
    </div>
  );
}