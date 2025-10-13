import { getSignature } from '../utils/signature'
import axios from 'axios'


export default async (config = {}) => {
  const time = Date.now()
  const instance = axios.request(Object.assign({
    timeout: 0, headers: {
      'Content-Type': 'application/json', 's-t': time, 's-sign': getSignature(time)
    },
  }, config))

  try {
    const res = await instance
    return Promise.resolve(res.data)
  } catch (e) {
    return Promise.reject(e)
  }
}