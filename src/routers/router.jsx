import { createHashRouter } from 'react-router-dom'
import Root from './root.jsx'
import Landing from '../components/LandingPage.jsx'
import App from '../components/advanceAnnotation.jsx'
import Web from '../components/advanceWeb.jsx'
import Cirrus from '../components/advanceCirrus.jsx'

const router = createHashRouter([
	{
		path: "/",

		element: <Root />,

		children: [
			{
                path: '/',
                element: <Landing />
            },
			{
				path: '/advance',
				element: <App />
			},
			{
				path: '/advanceWeb',
				element: <Web />
			},
			{
				path: '/advanceCirrus',
				element: <Cirrus />

			}
			
		]
	},
	
]);

export default router;
