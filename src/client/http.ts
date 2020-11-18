/* eslint-disable import/prefer-default-export */
import axios from 'axios';

export const getLocale = () => axios.get('http://localhost:3001/locale');
