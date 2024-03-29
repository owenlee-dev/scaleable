import axios from 'axios';

const API_KEY = 'e2abee7c6f14b79808482f89ca4d534e';
const SEARCH_URL = 'https://api.getsongbpm.com/search/';
const SONG_URL = 'https://api.getsongbpm.com/song/';

const getSearchResults = async (songTitle) => {
  const config = `${SEARCH_URL}?api_key=${API_KEY}&type=song&lookup=${songTitle}`;
  const response = await axios(config);
  return response.data.search;
};

//get song details for selected search result
const getSongDetails = async (id) => {
  const config = `${SONG_URL}?api_key=${API_KEY}&id=${id}`;
  const response = await axios(config);
  return response.data.song;
};

export default {getSearchResults, getSongDetails};
