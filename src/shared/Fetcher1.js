import { getToken } from "../shared/Token";
import axios from 'axios';
let Token = getToken("Authorization");

const fetcher1 = url => axios.get(url, {
  headers: { 'Authorization': `${Token}` }
})
  .then(res => res.data);

export default fetcher1;
