import { Card, Image, Avatar, Text, Group, ActionIcon, rem } from '@mantine/core';
import classes from './ArticleCardVertical.module.css';
import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { IconEdit, IconCopy, IconTrash } from '@tabler/icons-react';
const serverHost = import.meta.env.VITE_REACT_APP_SERVER_HOST;
import { isArrayEmpty } from '../../utils';

function ArticleCardVertical(props) {
      const { text, to, postId } = props;
      const [attachments, setAttachments] = useState([]);

      useEffect(() => {

            const getAttachments = async () => {
                  const response = await fetch(`${serverHost}/api/posts/photos/${postId}`);
                  const data = await response.json();
                  if (data.code == 404) { setAttachments([]) } else { setAttachments(data) }
            }
                  getAttachments();
            }, []);

      const showImages = () => {
            console.log(attachments);

           return attachments.map((attachment, index) => {
                  console.log(attachment);
                  console.log(attachment.photo_filename);
                           const imageURL = 'https://s3.tebi.io/telegram.backet/images/' + attachment.photo_filename;
                  return (
                        <Image
                              src={imageURL}
                              height={160}
                              key={index}
                        />
                  )
            })
      }
  return (
    <Card withBorder radius="md" p={0} className={classes.card}>
      <Group wrap="nowrap" gap={0}>
            { !isArrayEmpty(attachments) ? showImages() : null }
        {/* <Image
          src="https://s3.tebi.io/telegram.backet/images/9a33a9279175f390a8-e191196b-73e1-44ba-aaa6-419500af9c01.jpeg"
          height={160}
        />
        <Image
          src="https://s3.tebi.io/telegram.backet/images/9a33a9279175f390a8-e191196b-73e1-44ba-aaa6-419500af9c01.jpeg"
          height={160}
        /> */}
        <div className={classes.body}>
            <Group wrap="nowrap" gap="xs"justify="flex-end" >
                  <Text tt="uppercase" c="dimmed" fw={700} size="xs">
                        technology
                  </Text>
                  <ActionIcon size={30}>
                        <Link to={to}><IconEdit  style={{ width: rem(20), height: rem(20) }} /></Link>
                  </ActionIcon>
                  <ActionIcon >
                        <IconCopy  style={{ width: rem(20), height: rem(20) }}
                        />
                  </ActionIcon>
                  <ActionIcon >
                        <IconTrash style={{ width: rem(20), height: rem(20) }} />
                  </ActionIcon>
            </Group>
          <Text className={classes.title} mt="xs" mb="md" dangerouslySetInnerHTML={{__html: text}}>
          </Text>
          <Group wrap="nowrap" gap="xs">
            <Group gap="xs" wrap="nowrap">
              <Avatar
                size={20}
                src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-8.png"
              />
              <Text size="xs">Elsa Typechecker</Text>
            </Group>
            <Text size="xs" c="dimmed">
              •
            </Text>
            <Text size="xs" c="dimmed">
              Feb 6th
            </Text>
          </Group>
        </div>
      </Group>
    </Card>
  );
}

export default ArticleCardVertical;