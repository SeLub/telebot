import { notifications } from '@mantine/notifications';
import { IconSend } from '@tabler/icons-react';
import { Fragment } from 'react';

import DCButton from '../ui/DCButton';

const serverHost = import.meta.env.VITE_REACT_APP_SERVER_HOST;

const PublishPost = (props: { post_id: string | undefined }) => {
    const { post_id } = props;

    const publishPost = async (post_id: string): Promise<void> => {
        try {
            const result = await fetch(`${serverHost}/api/posts/publish/${post_id}`, { method: 'POST' });
            console.log(result.status);
            if (result.ok) {
                notifications.show({
                    title: 'Success',
                    message: `Post published successfully.`,
                    color: 'green',
                });
            }
        } catch (error) {
            console.log('Error while try to publish post: ', error);
            notifications.show({
                title: 'Error',
                message: 'Error while try to publish post.',
                color: 'red',
            });
        }
    };
    return (
        <Fragment>
            {post_id && (
                <DCButton
                    rightSection={<IconSend size={18} />}
                    handleOnClick={async (): Promise<void> => await publishPost(post_id)}
                    buttonText="Publish Post"
                    buttonId={undefined}
                    buttonClassName={undefined}
                />
            )}
        </Fragment>
    );
};
export default PublishPost;
