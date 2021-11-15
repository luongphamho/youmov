import AsyncStorage from "@react-native-async-storage/async-storage";

const api = 'https://api.themoviedb.org/3';
const key = '0364086005fd007ac1e75657c3673c08';

// const languageStorage = async () => {
//   const languageStorage = await AsyncStorage.getItem('@LanguageKey');
//   return languageStorage === 'vi' ? 'vi-VN' : 'en-EN';
// };
// const defaultContent = {
//   api_key: key,
//   language: async ()=> {
//     const languageStorage = await AsyncStorage.getItem('@LanguageKey');
//     return 1;
//   }
// };
function queryString(obj) {
  return Object.entries(obj)
    .map(([index, val]) => `${index}=${val}`)
    .join('&');
}

export default async function request(url, content = {}, debug = false) {
  const Storage = await AsyncStorage.multiGet([
    '@hasAdultContent',
    '@LanguageKey'
  ]);
  const hasAdultContent = JSON.parse(Storage[0][1])
  const LanguageKey = Storage[1][1] ==='vi' ? 'vi-VN' : 'en-EN';
  const defaultContent = {
    api_key: key,
    include_adult: hasAdultContent,
    language: LanguageKey
  };
  const obj = {...defaultContent, ...content };

  const response = await fetch(`${api}/${url}?${queryString(obj)}`);
  const data = await (debug ? response.status : response.json());
  // console.log(data)
  return data;
}