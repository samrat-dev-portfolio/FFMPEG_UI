import axios from 'axios';
import moment from 'moment';
import { PutFFMPEGLocalData, GetFFMPEGLocalDataByKey } from './LocalStorage';

export const IsActivated = async (baseurl) => {
    try {
        const res = await axios.post(`${baseurl}api/mpeg/IsActivated`);
        return res;
        // console.log(res.data);
    } catch (err) {
        console.log(err);
    }
};
export const LocalStorage_IsActivated = async (val) => {
    if (val) {
        await PutFFMPEGLocalData('IsActivate', val);
    } else {
        let data = await GetFFMPEGLocalDataByKey('IsActivate');
        // console.log('IsActivate', data);
        return data;
    }
};
export const LocalStorage_ActivationExpired = async (val) => {
    if (val) {
        await PutFFMPEGLocalData('ActivationExp', val);
    } else {
        let data = await GetFFMPEGLocalDataByKey('ActivationExp');
        // console.log('ActivationExp', data);
        return data;
    }
};
export const Today = () => {
    return moment().local().format('YYYY-MM-DD HH:mm:ss');
};
export const ActivationExpiredDay = () => {
    return moment().local().add(12, 'hours').format('YYYY-MM-DD HH:mm:ss'); // days hours minutes
};
export const WillActivationExpired = (ActivationExpiredDayStr) => {
    if (ActivationExpiredDayStr === null) return true;
    const _from = moment(ActivationExpiredDayStr, 'YYYY-MM-DD HH:mm:ss');
    const _today = moment(Today(), 'YYYY-MM-DD HH:mm:ss');
    let diff = _from.diff(_today, 'hours'); // _nextday > _today = +ve
    // console.log(_from, _today, diff)
    return diff <= 0;
};
