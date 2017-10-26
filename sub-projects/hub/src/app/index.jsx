import React from 'react';
import { render } from 'react-dom';
import 'semantic-ui-css/semantic.min.css';
import AppConfig from './config.jsx';

const element = document.getElementById('app');
render(<AppConfig />, element);