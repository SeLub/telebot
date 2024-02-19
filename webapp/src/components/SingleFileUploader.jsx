import { useState } from "react";
const serverHost = import.meta.env.VITE_REACT_APP_SERVER_HOST;

const SingleFileUploader = () => {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("initial");

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
      setStatus("initial");
    }
  };

  const getImageContentType = (filePath) => {
    const ext = '.' + filePath.toLowerCase().split('.').pop();
    switch (ext) {
    case '.jpg':
    case '.jpeg':
          return 'image/jpeg';
    case '.png':
          return 'image/png';
    case '.csv': 
          return 'text/csv';
    case '.txt':
          return 'text/plain';
    case '.doc':
          return 'application/msword';
    case '.pdf':
          return 'application/pdf';
    case '.avi':
          return 'video/x-msvideo';
    case '.mp3':
          return 'audio/mpeg';
    case '.mp4':
          return 'video/mp4';
    case '.mpeg':
          return 'video/mpeg';
    case '.webp':
          return 'image/webp';
    case '.webm':
          return 'video/webm';
    case '.xls':
          return 'application/vnd.ms-excel';
    default:
          throw new Error('Unsupported file type');
    }
}

  const handleUpload = async () => {
      if (file) {
        console.log(file)
        const contentType = await getImageContentType(file.name);
        setStatus("uploading");
  
        try {
          const result = await fetch(`${serverHost}/api/storage/geturl?` + new URLSearchParams({ file: file.name }));
          const data = await result.json();
          const { presignedURL } = data;
          console.log(presignedURL)
          const result2 = await fetch(presignedURL, 
            {
              headers: {
                //'x-amz-acl': 'bucket-owner-full-control',
                'Content-Type': contentType,
                'x-amz-acl': 'public-read'
              },
              method: "PUT",
              body: file
            });

            console.log('result2 ', result2)
  
          const data2 = await result2//.json();
  
          console.log('data2 ', data2);
          setStatus("success");
        } catch (error) {
          console.error(error);
          setStatus("fail");
        }
      }
    };

  return (
      <>
      <div className="input-group">
        <label htmlFor="file" className="sr-only">
          Choose a file
        </label>
        <input id="file" type="file" onChange={handleFileChange} />
      </div>
      {file && (
        <section>
          File details:
          <ul>
            <li>Name: {file.name}</li>
            <li>Type: {file.type}</li>
            <li>Size: {file.size} bytes</li>
          </ul>
        </section>
      )}

      {file && (
        <button onClick={handleUpload} className="submit">
          Upload a file
        </button>
      )}

      <Result status={status} />
    </>
  );
};

// eslint-disable-next-line react/prop-types
const Result = ({ status }) => {
      if (status === "success") {
        return <p>✅ File uploaded successfully!</p>;
      } else if (status === "fail") {
        return <p>❌ File upload failed!</p>;
      } else if (status === "uploading") {
        return <p>⏳ Uploading selected file...</p>;
      } else {
        return null;
      }
    };

export default SingleFileUploader;