import axios from 'axios';

const fetcher1 = (url, Token) =>
  axios.get(url, {
    headers: { 'Authorization': `${Token}` }
  })
    .then(res => res.data);

export default fetcher1;
