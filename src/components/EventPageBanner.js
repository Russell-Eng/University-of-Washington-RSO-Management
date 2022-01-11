import React from 'react';
// npm i react-carousel-minimal
import { Carousel } from 'react-carousel-minimal';

export function EventPageBanner(props) {

  const slideNumberStyle = {
    fontSize: '20px',
    fontWeight: 'bold',
  }
  return (
    <div className="App">
      <div style={{ textAlign: "center" }}>
        <h1>Event Exhibition</h1>
        <div style={{
          padding: "0 20px"
        }}>
          <Carousel
            data={props.eventsBanner}
            time={1500}
            width="850px"
            height="400px"
            radius="10px"
            slideNumber={true}
            slideNumberStyle={slideNumberStyle}
            captionPosition="bottom"
            automatic={true}
            dots={true}
            pauseIconColor="white"
            pauseIconSize="40px"
            slideBackgroundColor="darkgrey"
            slideImageFit="cover"
            thumbnails={true}
            thumbnailWidth="100px"
            style={{
              textAlign: "center",
              maxWidth: "850px",
              maxHeight: "500px",
              margin: "40px auto",
            }}
          />
        </div>
      </div>
    </div>
  );
}