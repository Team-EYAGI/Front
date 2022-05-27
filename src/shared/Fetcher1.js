import { getToken } from "../shared/Token";


const Fetcher1 = async (...args) => {
  let Token = getToken("Authorization");
  const response = await fetch(...args, {
    headers: { 'Authorization': `${Token}` }
  })
  return response.json()
}

export default Fetcher1;