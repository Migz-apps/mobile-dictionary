import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.dictionaryapi.dev/api/v2/entries/en/',
  timeout: 10000,
});

export async function fetchWord(word) {
  const response = await api.get(`/${encodeURIComponent(word)}`);
  return response.data;
}
