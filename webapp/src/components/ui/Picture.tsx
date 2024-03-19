import { Image } from '@mantine/core';

type Props = {
    imageName: string;
};

const Picture = (props: Props) => {
    const { imageName } = props;
    return <Image radius="md" src={`https://s3.tebi.io/telegram.backet/images/${imageName}`} />;
};

export default Picture;
