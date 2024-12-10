import { createHashRouter } from 'react-router-dom';
import Root from './root.jsx';
import Landing from '../components/LandingPage.jsx';
// import App from '../components/advanceAnnotation.jsx';
// import Web from '../components/advanceWeb.jsx';
// import Cirrus from '../components/advanceCirrus.jsx';

const router = createHashRouter(
  [
    {
      path: "/",
      element: <Root />,
      children: [
        {
          path: '/',
          element: <Landing />
        },
        // {
        //   path: '/advance',
        //   element: <App />
        // },
        // {
        //   path: '/advanceWeb',
        //   element: <Web />
        // },
        // {
        //   path: '/advanceCirrus',
        //   element: <Cirrus />
        // }
      ]
    }
  ],
  {
    future: {
	v7_startTransition: true,
	v7_startTransition: true,
	v7_relativeSplatPath: true,
	v7_fetcherPersist: true,
	v7_normalizeFormMethod: true,
	v7_partialHydration: true,
	v7_skipActionErrorRevalidation: true
    }
  }
);

export default router;
