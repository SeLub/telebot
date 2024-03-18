import PropTypes from 'prop-types';
const serverHost = import.meta.env.VITE_REACT_APP_SERVER_HOST;
import { notifications } from '@mantine/notifications';
import DCButton from './ui/DCButton';
import React, {Fragment} from 'react';

const PublishPost = (props: { postId: string }) => {
      const { postId } = props;

      const publishPost = async (postId: string): Promise<void>  => {
            try {
                  const result = await fetch(`${serverHost}/api/posts/publish/${postId}`, { method: 'POST' });
                  if (result.ok) {
                        notifications.show({
                              title: 'Success',
                              message: `Post published successfully.`,
                              color: 'green',
                            });
                  }
            } catch(error) {
                  console.log('Error while try to publish post: ', error);
                  notifications.show({
                        title: 'Error',
                        message: 'Error while try to publish post.',
                        color: 'red',
                      });
            }

      }
      return(
            <Fragment>
                  <DCButton 
                        handleOnClick={async (): Promise<void> => await publishPost(postId)} 
                        buttonText="Publish Post" 
                        buttonId={undefined} 
                        buttonClassName={undefined} />
            </Fragment>
      )
}
export default PublishPost;