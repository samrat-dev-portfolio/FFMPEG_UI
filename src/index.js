import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import axios from 'axios';

//#region Demo
// axios.defaults.baseURL = "https://jsonplaceholder.typicode.com";
// axios.defaults.headers.common['Auth'] = 'AUTH 56';
// axios.defaults.headers.post['content'] = 'CONTENT XX'

// axios.interceptors.request.use(req => {
//     // console.log({req});
//     return req;
// }, error => {
//     console.log(error);
//     return Promise.reject(error);
// });

// axios.interceptors.response.use(res => {
//     // console.log({res});
//     return res;
// });
//#endregion
console.clear();
let publish = window.publish || false;
if(publish == true){
    window.ffmpeg_baseurl = window.location.origin + "/";
} else {
    window.ffmpeg_baseurl = "http://localhost:50017/";
}

ReactDOM.render(<App />, document.getElementById('root'));
