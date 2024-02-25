const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '25737469-5e8bfc7bf6c680f39c339b92a';

const API = (searchQuery, page) => {
  return fetch(
    `${BASE_URL}?key=${API_KEY}&image_type=photo&orientation=horizontal&page=${page}&per_page=12&q=${searchQuery}`
  ).then(res => {
    return res.json();
  });
};

export default API;
