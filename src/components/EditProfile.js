import React, { useState } from 'react';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getDatabase, ref as dbref, update } from 'firebase/database'
import { Link } from 'react-router-dom'

export function EditProfile(props) {
  const [imageFile, setImageFile] = useState(undefined);
  const [imageUrl, setImageUrl] = useState('img/null.png');
  const [RSOName, setRSOName] = useState('');
  const [description, setDescription] = useState('');

  const storage = getStorage();
  const db = getDatabase();

  let image = '';

  const handleRSOName = (event) => {
    setRSOName(event.target.value);
  }

  const handleDescription = (event) => {
    setDescription(event.target.value);
  }

  const handleSubmit = () => {
    props.whatToDoOnSubmit(RSOName, description)

    if (imageFile !== undefined) {
      const imageRef = ref(storage, props.user.displayName + ".png");
      uploadBytes(imageRef, imageFile).then((snapshot) => {
        getDownloadURL(imageRef).then((downloadURL) => {
          const imgRef = dbref(db, "rsos/" + props.user.displayName);
          update(imgRef, { logo: downloadURL });
          image = downloadURL;
        });
      });
    }

    setRSOName('');
    setDescription('');
    setImageUrl('img/null.png');
  }

  const handleImg = (event) => {
    if (event.target.files.length > 0 && event.target.files[0]) {
      const imageFile = event.target.files[event.target.files.length - 1]
      setImageFile(imageFile);
      setImageUrl(URL.createObjectURL(imageFile));
    }
  }


  return (
    <div>
      <form className="my-2">
        <h2>Create RSO profile</h2>
        <div className="col">

          <div className="col d-flex justify-content-center">
            <div className="container">
              <div className="mb-5 image-upload-form">
                <div className='row'>
                  <img src={imageUrl} alt="preview" className="mb-2" width="300" height="300" />
                  <label htmlFor="imageUploadInput1" className="btn btn-sm btn-outline-secondary me-2">Upload RSO Logo</label>
                  <input type="file" name="image" id="imageUploadInput1" className="d-none" onChange={handleImg} />
                </div>

              </div>
            </div>

          </div>
          <div>
            <textarea
              className="form-control" rows="2" placeholder="RSO Name"
              value={RSOName}
              onChange={handleRSOName}
            ></textarea>
          </div>
          <div className="mt-3">
            <textarea
              className="form-control" rows="2" placeholder="Description"
              value={description}
              onChange={handleDescription}
            ></textarea>
          </div>
          <br />

          <Link to={"/RSO/" + props.user.displayName} className="submit-button d-block btn btn-outline-primary" type="button" onClick={handleSubmit}>
            Save Profile
          </Link>

          <Link to={"/"} className="cancel-button d-block btn btn btn-outline-danger mt-5" type="button">
            Cancel
          </Link>

        </div>
        <br /><br /><br /><br /><br /><br />
      </form>
    </div>
  );
}