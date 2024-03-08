import MyButton from "./ui/MyButton";
import DCButton from "./ui/DCButton";
import { notifications } from '@mantine/notifications';
const Home = () => {
      notifications.show({ message: 'Hello' });
      return(
      <>
            <h1>Home</h1>
            <MyButton buttonText="Simple Button"/>
            <DCButton buttonText="Simple DC Button"/>
      </>
      )
}
export default Home