import axios from 'axios';
import { API_ADDRESS } from 'config';

export default function get(path, params) {
  const url = `${API_ADDRESS}${path}`;

  return axios({
    method: 'get',
    url,
    params,
  }).then(resp => resp.data);
}
