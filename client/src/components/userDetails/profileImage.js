import React, { useState } from 'react';
import imagemagick from 'imagemagick';

const ImageUploader = () => {
  const [imageData, setImageData] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = () => {
      const imgData = reader.result;

      imagemagick.resize({
        srcData: imgData,
        width: 200,
      }, (err, stdout) => {
        if (err) throw err;
        const resizedData = `data:image/jpeg;base64,${stdout.toString('base64')}`;
        setImageData(resizedData);
      });
    };
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      {imageData && (
        <img src={imageData} alt="Uploaded" />
      )}
    </div>
  );
};

export default ImageUploader;
