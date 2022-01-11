import React, { useState } from 'react';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getDatabase, ref as dbref, update } from 'firebase/database'
import { Link } from 'react-router-dom';

export function EventForm(props) {
  const [eventDes, seteventDes] = useState('');
  const [eventDate, seteventDate] = useState('');
  const [eventTitle, seteventTitle] = useState('');

  const [imageFile1, setImageFile1] = useState(undefined);
  const [imageUrl1, setImageUrl1] = useState('/img/null.png');

  const [imageFile2, setImageFile2] = useState(undefined);
  const [imageUrl2, setImageUrl2] = useState('/img/null.png');

  const [imageFile3, setImageFile3] = useState(undefined);
  const [imageUrl3, setImageUrl3] = useState('/img/null.png');


  const storage = getStorage();
  const db = getDatabase();

  const handleChange1 = (event) => {
    if (event.target.files.length > 0 && event.target.files[0]) {
      const imageFile1 = event.target.files[event.target.files.length - 1]
      setImageFile1(imageFile1);
      setImageUrl1(URL.createObjectURL(imageFile1));
    }
  }
  const handleChange2 = (event) => {
    if (event.target.files.length > 0 && event.target.files[0]) {
      const imageFile2 = event.target.files[event.target.files.length - 1]
      setImageFile2(imageFile2);
      setImageUrl2(URL.createObjectURL(imageFile2));
    }
  }
  const handleChange3 = (event) => {
    if (event.target.files.length > 0 && event.target.files[0]) {
      const imageFile3 = event.target.files[event.target.files.length - 1]
      setImageFile3(imageFile3);
      setImageUrl3(URL.createObjectURL(imageFile3));
    }
  }

  const handleInputDes = (event) => {
    seteventDes(event.target.value);
  }
  const handleInputDate = (event) => {
    seteventDate(event.target.value);
  }
  const handleInputTitle = (event) => {
    seteventTitle(event.target.value);
  }

  const handleSubmit = (event) => {

    props.whatToDoOnSubmit(eventDes, eventDate, eventTitle);

    let imgsArray = [];

    if (imageFile1 !== undefined) {
      const imageRef1 = ref(storage, props.user.displayName + "/" + eventTitle + "img1.png");
      uploadBytes(imageRef1, imageFile1).then((snapshot) => {
        getDownloadURL(imageRef1).then((downloadURL) => {
          const imgRef = dbref(db, "rsos/" + props.user.displayName + "/events/" + eventTitle);
          update(imgRef, { image: downloadURL });
          imgsArray.push(downloadURL);
          const imgsRef = dbref(db, "rsos/" + props.user.displayName + "/events/" + eventTitle);
          update(imgsRef, { eventImages: imgsArray });
        }).catch((error) => console.error(error));
      });
    }

    if (imageFile2 !== undefined) {
      const imageRef2 = ref(storage, props.user.displayName + "/" + eventTitle + "img2.png");
      uploadBytes(imageRef2, imageFile2).then((snapshot) => {
        getDownloadURL(imageRef2).then((downloadURL) => {
          imgsArray.push(downloadURL);
          const imgsRef = dbref(db, "rsos/" + props.user.displayName + "/events/" + eventTitle);
          update(imgsRef, { eventImages: imgsArray });
        }).catch((error) => console.error(error));
      });
    }

    if (imageFile3 !== undefined) {
      const imageRef3 = ref(storage, props.user.displayName + "/" + eventTitle + "img3.png");
      uploadBytes(imageRef3, imageFile3).then((snapshot) => {
        getDownloadURL(imageRef3).then((downloadURL) => {
          imgsArray.push(downloadURL);
          const imgsRef = dbref(db, "rsos/" + props.user.displayName + "/events/" + eventTitle);
          update(imgsRef, { eventImages: imgsArray });
        }).catch((error) => console.error(error));
      });
    }


    seteventDes(''); //clear old value
    seteventDate('');
    seteventTitle('');
    setImageFile1(undefined);
    setImageUrl1('/img/null.png');

    setImageFile2(undefined);
    setImageUrl2('/img/null.png');

    setImageFile3(undefined);
    setImageUrl3('/img/null.png');

  }

  return (
    <form className="my-2">
      <h2>{'Add Event for ' + props.user.displayName}</h2>
      <div className="col">


        <div className="col d-flex justify-content-center">
          <div className="container">
            <div className="mb-5 image-upload-form">
              <div className='row'>
                <img src={imageUrl1} alt="preview" className="mb-2" id="nullimage" width="300" height="300" />
                <label htmlFor="imageUploadInput1" className="btn btn-sm btn-outline-secondary me-2">Choose Primary Image</label>
                <input type="file" name="image" id="imageUploadInput1" className="d-none" onChange={handleChange1} />
              </div>
            </div>
          </div>

          <div className="container">
            <div className='row'>
              <img src={imageUrl2} alt="preview" className="mb-2" id="nullimage" width="300" height="300" />
              <label htmlFor="imageUploadInput2" className="btn btn-sm btn-outline-secondary me-2">Choose Optional Image</label>
              <input type="file" name="image" id="imageUploadInput2" className="d-none" onChange={handleChange2} />
            </div>
          </div>

          <div className="container">
            <div className="mb-5 image-upload-form">
              <div className='row'>
                <img src={imageUrl3} alt="preview" className="mb-2" id="nullimage" width="300" height="300" />
                <label htmlFor="imageUploadInput3" className="btn btn-sm btn-outline-secondary me-2">Choose Optional Image</label>
                <input type="file" name="image" id="imageUploadInput3" className="d-none" onChange={handleChange3} />
              </div>
            </div>
          </div>

        </div>
        <div>
          <textarea
            className="form-control" rows="2" placeholder="Event Name"
            value={eventTitle}
            onChange={handleInputTitle}
          ></textarea>
        </div>
        <div>
          <textarea
            className="form-control mt-3" rows="2" placeholder="Event Time - Format Ex: May 29 4pm-8pm"
            value={eventDate}
            onChange={handleInputDate}
          ></textarea>
        </div>
        <div>
          <textarea
            className="form-control mt-3" rows="2" placeholder="Event Description"
            value={eventDes}
            onChange={handleInputDes}
          ></textarea>
        </div>
        <br />
        <Link to={"/RSO/" + props.user.displayName} className="submit-button d-block btn btn-outline-primary" type="button" onClick={handleSubmit}>
          Submit
        </Link>
        <Link to={"/RSO/" + props.user.displayName} className="cancel-button d-block btn btn-outline-danger mt-5" type="button">
          Cancel
        </Link>
      </div>
      <br /><br /><br /><br /><br /><br />
    </form>
  );
}