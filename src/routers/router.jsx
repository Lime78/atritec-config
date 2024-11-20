import { createHashRouter } from 'react-router-dom'
import Root from './root.jsx'
import LandingPage from '../components/LandingPage.jsx'
import App from '../components/advance.jsx'

const router = createHashRouter([
	{
		path: "/",


		element: <Root />,

		children: [
			{
                path: '/',
                element: <LandingPage />
            },
			{
				path: '/advance',
				element: <App />
			}
			
		]
	},
	
]);

export default router;
