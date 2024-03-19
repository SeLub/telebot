import { Flex, Image } from '@mantine/core';
import { Dropzone, FileWithPath } from '@mantine/dropzone';
import { notifications } from '@mantine/notifications';
import { Fragment, useState } from 'react';

import addFilesImage from '../assets/add_files.png';
import saveFileImage from '../assets/save_files.png';
import { generateUniqueFileName, getImageContentType, isArrayEmpty } from '../utils';

const serverHost = import.meta.env.VITE_REACT_APP_SERVER_HOST;

interface IAttachProps {
    post_id: string;
    attachments: string;
    setAttachments: () => void;
}

function Attach(props: IAttachProps) {
    const { post_id, attachments, setAttachments } = props;
    const [files, setFiles] = useState<FileWithPath[] | []>([]);

    const previews = files.map((file, index) => {
        const imageUrl = URL.createObjectURL(file);
        console.log('imageUrl ', imageUrl);
        return (
            <Image
                key={index}
                src={imageUrl}
                onLoad={() => URL.revokeObjectURL(imageUrl)}
                h={200}
                w="auto"
                onDoubleClick={() => removeFile(index)}
            />
        );
    });

    const removeFile = (index) => {
        const newFilesList = [...files];
        newFilesList.splice(index, 1);
        setFiles(newFilesList);
    };

    const handleUpload = async () => {
        try {
            let newFiles = [...files];

            for (const file of newFiles) {
                await saveFile(file);
                newFiles = newFiles.filter((item) => item.name !== file.name);
                setFiles(newFiles);
            }

            console.log('All files processed successfully');
        } catch (error) {
            console.error('Error processing files:', error);
        }
    };

    const saveFile = async (file) => {
        const contentType = getImageContentType(file.name);

        try {
            //Generate unique file name
            const { UUID, uniqueFileName } = generateUniqueFileName(file.name);
            //Make a request to get signedURL
            const getPresignedURL = await fetch(
                `${serverHost}/api/storage/geturl?` + new URLSearchParams({ file: uniqueFileName }),
            );
            const { presignedURL } = await getPresignedURL.json();
            await fetch(presignedURL, {
                headers: {
                    'Content-Type': contentType,
                    'x-amz-acl': 'public-read',
                },
                method: 'PUT',
                body: file,
            });

            await fetch(`${serverHost}/api/posts/photos/${post_id}`, {
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'POST',
                body: JSON.stringify({
                    photo_id: UUID,
                    photo_filename: uniqueFileName,
                }),
            });
            setAttachments([
                ...attachments,
                {
                    photo_id: UUID,
                    photo_id_post: post_id,
                    photo_filename: uniqueFileName,
                },
            ]);
            notifications.show({
                title: 'Success',
                message: `File ${file.name} uploaded successfully`,
                color: 'green',
            });
        } catch (error) {
            console.error(error);
            notifications.show({
                title: 'Error',
                message: `File ${file.name} upload failed`,
                color: 'red',
            });
        }
    };

    return (
        <Fragment>
            <Flex mih={50} gap="md" justify="flex-start" align="flex-start" direction="row" wrap="nowrap">
                <Dropzone onDrop={setFiles}>
                    <Image src={addFilesImage} h={200} w="auto" />
                </Dropzone>
                {previews}
                {!isArrayEmpty(files) && <Image src={saveFileImage} h={200} w="auto" onClick={handleUpload} />}
            </Flex>
        </Fragment>
    );
}
export default Attach;
