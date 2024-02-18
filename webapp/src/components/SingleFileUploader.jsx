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

  const handleUpload = async () => {
      if (file) {
        console.log(file)
        setStatus("uploading");
  
        const formData = new FormData();
        formData.append("file", file);
  
        try {
          const result = await fetch(`${serverHost}/api/storage/geturl?` + new URLSearchParams({ file: file.name }));
          const data = await result.json();
          const { presignedURL } = data;
          console.log(presignedURL)
          const result2 = await fetch(presignedURL, 
            {
              headers: {
                'x-amz-acl': 'bucket-owner-full-control'
              },
              method: "PUT",
              body: formData,
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