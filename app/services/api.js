const api = 'https://api.themoviedb.org/3';
const key = '0364086005fd007ac1e75657c3673c08';

const defaultContent = {
  api_key: key,
  language: 'en-EN'
};
function setDefaultContent(){
  
}
function queryString(obj) {
  return Object.entries(obj)
    .map(([index, val]) => `${index}=${val}`)
    .join('&');
}

export default async function request(url, content = {}, debug = false) {
  const obj = { ...defaultContent, ...content };

  const response = await fetch(`${api}/${url}?${queryString(obj)}`);
  const data = await (debug ? response.status : response.json());
  // console.log(data)
  return data;
}
