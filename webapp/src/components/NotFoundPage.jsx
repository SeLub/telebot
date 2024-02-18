import { Link } from 'react-router-dom'
import Navigation from './Navigation'
const NotFoundPage = () => {
      return(
            <>
            <Navigation />
                  <h1>404 Page Not Found</h1>
                  <Link to='/'>Home</Link>
            </>
      )
}
export default NotFoundPage