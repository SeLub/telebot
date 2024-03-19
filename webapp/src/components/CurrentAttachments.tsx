import { Flex, Image } from '@mantine/core';
import React, { Fragment } from 'react';

import { getImageUrl, isArrayEmpty } from '../utils';

const serverHost = import.meta.env.VITE_REACT_APP_SERVER_HOST;

function CurrentAttachments(props) {
    const { attachments, setAttachments } = props;

    const handleDelete = async (attachment) => {
        const fetchDeleteFile = async (post_id, filename) => {
            await fetch(`${serverHost}/api/posts/photos/${post_id}`, {
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'DELETE',
                body: JSON.stringify({
                    photo_filename: filename,
                }),
            });
        };
        try {
            let actualAttachment = [...attachments];
            const deleteFileFromAttachments = (fileToDelete) =>
                actualAttachment.filter((att) => att.photo_filename !== fileToDelete);
            await fetchDeleteFile(attachment.post_id_photo, attachment.photo_filename);
            const newAttachmentsState = deleteFileFromAttachments(attachment.photo_filename);
            setAttachments(newAttachmentsState);
        } catch (error) {
            console.log(error);
        }
    };

    const showImages = () => {
        console.log(attachments);

        return attachments.map((attachment, index) => {
            const imageURL = getImageUrl(attachment);
            return (
                <Image
                    src={imageURL}
                    h={200}
                    w="auto"
                    fit="contain"
                    key={index}
                    onDoubleClick={() => handleDelete(attachment)}
                />
            );
        });
    };

    return (
        <Fragment>
            <Flex mih={50} gap="md" justify="flex-start" align="flex-start" direction="row" wrap="wrap">
                {!isArrayEmpty(attachments) ? showImages() : null}
            </Flex>
        </Fragment>
    );
}
export default CurrentAttachments;
