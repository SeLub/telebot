import { ActionIcon, FileInput, Flex } from '@mantine/core';
import { IconFileArrowLeft, IconRefresh } from '@tabler/icons-react';
import { useState } from 'react';

import * as message from '../../common/notification';
import { getImageContentType } from '../../utils';

const serverHost = import.meta.env.VITE_REACT_APP_SERVER_HOST;

const ImportFileForm = ({ database_id }) => {
    const [file, setFile] = useState<File | null>(null);
    const [refreshDisabled, setRefresh] = useState(true);
    const [importButton, setImportButton] = useState(true);

    const triggerParsing = async (fileName: string) => {
        try {
            await fetch(`${serverHost}/api/posts/import`, {
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'POST',
                body: JSON.stringify({
                    database_id,
                    import_file: fileName,
                }),
            });
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    };

    const saveImportedFileToStorage = async (props) => {
        const { id, file } = props;
        const contentType = getImageContentType(file.name);
        try {
            //Make a request to get signedURL
            const getPresignedURL = await fetch(
                `${serverHost}/api/storage/puturl?` + new URLSearchParams({ file: file.name, folder: 'import' }),
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
            message.success({ id, message: 'File uploaded to storage successfully' });
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    };

    const importFile = async () => {
        if (file) {
            try {
                const id = message.start('Import file started...');
                await saveImportedFileToStorage({ id, file });
                await triggerParsing(file.name);
                setRefresh(false);
                setImportButton(true);
            } catch (error) {
                console.error(error);
                setRefresh(true);
            }
        }
    };

    const reloadPage = () => {
        window.location.reload();
    };

    const handleFileChange = (event) => {
        const file = event;
        setFile(file);
        setImportButton(!file);
    };

    return (
        <Flex mih={50} gap="md" justify="flex-start" align="center" direction="row" wrap="wrap">
            <FileInput
                value={file}
                onChange={handleFileChange}
                clearable
                w={300}
                accept="text/csv"
                leftSection={<IconFileArrowLeft size={18} />}
                placeholder="Import File"
            />
            <ActionIcon component="button" disabled={importButton} onClick={importFile}>
                <IconFileArrowLeft size={18} />
            </ActionIcon>
            <ActionIcon component="button" disabled={refreshDisabled} onClick={reloadPage}>
                <IconRefresh size={18} />
            </ActionIcon>
        </Flex>
    );
};
export default ImportFileForm;
