import { useState, useEffect } from "react";
import StatusForm from "./StatusForm";
const serverHost = import.meta.env.VITE_REACT_APP_SERVER_HOST;

const AttachmentsForm = (params) => {
      const { attachments, setAttachments, post_id } = params;
      const [file, setFile] = useState(null);
      const [status, setStatus] = useState("initial");

      const handleAddFile = (e) => {
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
    
      const generateUniqueFileName = (filename) => {
        const fileName = filename;
        const url = URL.createObjectURL(new Blob());
        const UUID = url.substring(url.lastIndexOf('/') + 1);
        const fileNameWithoutExtension = fileName.split('.');
        const fileExtension = fileNameWithoutExtension.pop();
        const uniqueFileName = `${fileNameWithoutExtension.join('-')}-${UUID}.${fileExtension}`;
        return { UUID, uniqueFileName };
      }
      const handleUpload = async () => {
          if (file) {
            console.log(file)
            const contentType = await getImageContentType(file.name);
            setStatus("uploading");
      
            try {
              //Generate unique file name
              const { UUID, uniqueFileName } = generateUniqueFileName(file.name);
              //Make a request to get signedURL
              const getPresignedURL = await fetch(`${serverHost}/api/storage/geturl?` + new URLSearchParams({ file: uniqueFileName }));
              const { presignedURL } = await getPresignedURL.json();
              //console.log(presignedURL)
              const putFileToStorage = await fetch(presignedURL, 
                {
                  headers: {
                    //'x-amz-acl': 'bucket-owner-full-control',
                    'Content-Type': contentType,
                    'x-amz-acl': 'public-read'
                  },
                  method: "PUT",
                  body: file
                });
    
                console.log('result putFileToStorage: ', putFileToStorage)

                const attachFileToPost = await fetch(`${serverHost}/api/posts/photos/${post_id}`, {
                  headers: {
                    "Content-Type": "application/json",
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                  },
                  method: 'POST',
                  body: JSON.stringify({
                      photo_id: UUID,
                      photo_filename: uniqueFileName
                  })
                })
                setAttachments(
                  [
                    ...attachments,
                    {
                    photo_id: UUID,
                    photo_id_post: post_id,
                    photo_filename: uniqueFileName
                  }]);
                console.log('attachFileToPost ', attachFileToPost);

              setStatus("success");
            } catch (error) {
              console.error(error);
              setStatus("fail");
            }
          }
        };

      const displayFile = (file) => (<li key={file.photo_id}><input type="checkbox" value={file.photo_filename}/>{file.photo_filename}</li>)

      return(
            <>
            <div>
            <fieldset className="checkboxgroup">
              <p>Current attachments:</p>
              <ul> { attachments.map(file => displayFile(file)) } </ul>
            </fieldset>
            </div>
            
            
            <fieldset className="checkboxgroup">
            <div>
              <label htmlFor="file" className="sr-only">Add file</label>
              <input id="file" type="file" onChange={handleAddFile} />
            </div>

            {file && (
            <section>File details:
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
            </fieldset>
      <StatusForm status={status} />
            </>
      )
}

// eslint-disable-next-line react/prop-types


export default AttachmentsForm