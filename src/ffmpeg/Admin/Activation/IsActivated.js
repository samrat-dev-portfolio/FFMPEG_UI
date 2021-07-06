import axios from 'axios';

export const IsActivated = async (baseurl) => {
    try {
        const res = await axios.post(`${baseurl}api/mpeg/IsActivated`);
        return res;
        // console.log(res.data);
    } catch (err) {
        console.log(err);
    }
}

export default IsActivated;