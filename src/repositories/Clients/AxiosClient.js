import axios from 'axios';

// export const baseDomain = 'https://pikada-server.herokuapp.com'
export const baseDomain = 'http://localhost:5000';

const baseURL = `${baseDomain}/`;

export default axios.create({
  baseURL,
});
