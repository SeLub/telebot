import { useState, useEffect } from "react";
import StatusForm from "./StatusForm";
const serverHost = import.meta.env.VITE_REACT_APP_SERVER_HOST;

const AttachmentsForm = (params) => {
      const { attachments, setAttachments, post_id } = params;
      const [file, setFile] = useState(null);
      const [status, setStatus] = useState("initial");
      const [toDelete, setToDelete] = useState([]);

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
            const contentType = await getImageContentType(file.name);
            setStatus("uploading");
      
            try {
              //Generate unique file name
              const { UUID, uniqueFileName } = generateUniqueFileName(file.name);
              //Make a request to get signedURL
              const getPresignedURL = await fetch(`${serverHost}/api/storage/geturl?` + new URLSearchParams({ file: uniqueFileName }));
              const { presignedURL } = await getPresignedURL.json();
              await fetch(presignedURL, 
                {
                  headers: {
                    //'x-amz-acl': 'bucket-owner-full-control',
                    'Content-Type': contentType,
                    'x-amz-acl': 'public-read'
                  },
                  method: "PUT",
                  body: file
                });

                await fetch(`${serverHost}/api/posts/photos/${post_id}`, {
                  headers: {
                    "Content-Type": "application/json",
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

              setStatus("success");
            } catch (error) {
              console.error(error);
              setStatus("fail");
            }
          }
        };

      const displayFile = (file) => (
        <div id="grid-80">
          <div>{file.photo_filename}</div>
          <div key={file.photo_filename}><input type="checkbox" value={file.photo_filename} onClick={addFileToDelete}/></div>
        </div>)

      const addFileToDelete = (e) => {
        if(e.target.checked) {
          setToDelete([ ...toDelete, e.target.value]);
        } else {
          setToDelete(toDelete.filter(el => el !== e.target.value))
        }
      }
      
      const isArrayEmpty = (arr) => Array.isArray(arr) && arr.length === 0 ? true : false;

      const handleDelete = () => {
        const fetchDeleteFile = async (post_id, filename) => {
          await fetch(`${serverHost}/api/posts/photos/${post_id}`, {
            headers: {
              "Content-Type": "application/json",
            },
            method: 'DELETE',
            body: JSON.stringify({
                photo_filename: filename
            })
          });
        }
        console.log('toDelete', toDelete);
        toDelete.map(filename => fetchDeleteFile(post_id, filename));
        //promises.allSettled(promises).then((results) => results.forEach((result) => console.log(result.status)));
      }

      const filesWillBeDeleted = () => toDelete.map(file => <li key={file}>{file}</li>)

      return(
            <>
            <div>
            <fieldset className="checkboxgroup">
              <p>Current attachments:</p>
              <ul> { attachments.map(file => displayFile(file)) } </ul>
            </fieldset>
            </div>
            
            <fieldset className="checkboxgroup">
            <div id="grid-80">
              <div>
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
            </div>
            <div>
              {
                !isArrayEmpty(toDelete) &&
                <>
                <button onClick={handleDelete} className="submit">
                Delete file
              </button>
                          <section>File will be deleted:
                          <ul>
                            { filesWillBeDeleted() }
                          </ul>
                        </section>
                </>
              }
            </div>
            </div>
            </fieldset>
      <StatusForm status={status} />
            </>
      )
}

// eslint-disable-next-line react/prop-types


export default AttachmentsForm