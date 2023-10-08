import React, { useState } from 'react';
import axios from 'axios';

function UploadComponent() {
  const [file, setFile] = useState(null);
  const [mediaUrl, setMediaUrl] = useState('');

  const handleFileChange = e => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;

    try {
      const response = await fetch('http://localhost:5000/upload', {
        method: 'POST',
        headers: {
          'Content-Type': file.type, // e.g., 'image/jpeg' or 'application/pdf'
          'X-File-Name': file.name,
        },
        body: file,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setMediaUrl(data.mediaUrl);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {mediaUrl && <div>Media URL: {mediaUrl}</div>}
    </div>
  );
}

export default UploadComponent;
