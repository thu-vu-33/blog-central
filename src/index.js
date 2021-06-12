import React from 'react';
import ReactDOM from 'react-dom';
import 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';
import './styles/index.scss'
// import * as Sentry from "@sentry/react";
// import { Integrations } from "@sentry/tracing";

import Routes from './routes';

// Sentry.init({
//     dsn: "https://c061d9f8ab57413498f9975f287eb193@o833719.ingest.sentry.io/5812965",
//     integrations: [new Integrations.BrowserTracing()],
  
//     // Set tracesSampleRate to 1.0 to capture 100%
//     // of transactions for performance monitoring.
//     // We recommend adjusting this value in production
//     tracesSampleRate: 1.0,
//   });
  
ReactDOM.render(<Routes />, document.getElementById('root'));
