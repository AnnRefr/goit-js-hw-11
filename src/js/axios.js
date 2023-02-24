import axios from 'axios';

const ENDPOINT = 'https://pixabay.com/api/';
const KEY = '33821290-d9b9dca8705f81d21105eca87';

export const fetchPhotos = async (input, page = "1") => {
    const response = await axios.get(`${ENDPOINT}?key=${KEY}&q=${input}&orientation=horizontal&safesearch=true&image_type=photo&per_page=40&page=${page}`)
    return response.data
  };

// const searchOptions = 'image_type=photo&orientation=horizontal&safesearch=true';

// export default async function fetchPhotos(query, page) {
//     const URL = `${ENDPOINT}/?key=${KEY}&q=${query}&${searchOptions}&page=${page}&per_page=40`;
//     return axios.get(URL)
// }

// https://pixabay.com/api/?key=33821290-d9b9dca8705f81d21105eca87&q=yellow+flowers&image_type=photo&pretty=true