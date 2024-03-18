import React from "react";
import { isArrayEmpty } from '../utils';
import { Image } from '@mantine/core';
const serverHost = import.meta.env.VITE_REACT_APP_SERVER_HOST;

function CurrentAttachments(props){
      const { attachments, setAttachments } = props;

      const handleDelete = async(attachment) => {
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
            try {
                  let actualAttachment = [...attachments];
                  const deleteFileFromAttachments = (fileToDelete) => actualAttachment.filter((att) => att.photo_filename !== fileToDelete);
                  await fetchDeleteFile(attachment.post_id_photo, attachment.photo_filename);
                  const newAttachmentsState = deleteFileFromAttachments(attachment.photo_filename);
                  setAttachments(actualAttachment);
            } catch (error) {
                  console.log(error);
            }
          }
      
            const showImages = () => {
                  console.log(attachments);
      
                 return attachments.map((attachment, index) => {
                                 const imageURL = 'https://s3.tebi.io/telegram.backet/images/' + attachment.photo_filename;
                        return (
                              <Image
                                    src={imageURL}
                                    h={200}
                                    w="auto"
                                    fit="contain"
                                    key={index}
                                    onDoubleClick={() => handleDelete(attachment)}
                              />
                        )
                  })
            }

      return(<>
                  { !isArrayEmpty(attachments) ? showImages() : null }
            </>
            )

}
export default CurrentAttachments;