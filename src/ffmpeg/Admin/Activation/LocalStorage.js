import Dexie from 'dexie';

const ffmpegLocalStorageDb = () => {
    const ffmpegLocalStorageDb = new Dexie('ffmpegLocalStorageDb');
    ffmpegLocalStorageDb.version(2).stores({ ffmpegLocalStorage: "ffmpeg_key, value" });
    ffmpegLocalStorageDb.open().catch(err => {
        console.log(err);
    });
    return ffmpegLocalStorageDb;
};
export const GetFFMPEGLocalData = async () => {
    return await ffmpegLocalStorageDb().ffmpegLocalStorage.toArray();
};
export const GetFFMPEGLocalDataByKey = async (key) => {
    const data = await ffmpegLocalStorageDb().ffmpegLocalStorage.where('ffmpeg_key').equals(key).first();
    const value = (data || {}).value || null;
    return value;
    // https://dexie.org/docs/Collection/Collection.first()
};

export const SetFFMPEGLocalData = async (key, value) => {
    let data = {
        ffmpeg_key: key,
        value
    };
    return await ffmpegLocalStorageDb().ffmpegLocalStorage.add(data);
};
export const PutFFMPEGLocalData = async (key, val) => {
    const data = await ffmpegLocalStorageDb().ffmpegLocalStorage.where('ffmpeg_key').equals(key).first();
    const _value = (data || {}).value || null;
    if (_value) {
        return await ffmpegLocalStorageDb().ffmpegLocalStorage.where('ffmpeg_key').equals(key).modify({ value: val });
    }
    else {
        return await ffmpegLocalStorageDb().ffmpegLocalStorage.add({
            ffmpeg_key: key,
            value: val
        });
    }
};
export const DeleteFFMPEGLocalData = async (key) => {
    return await ffmpegLocalStorageDb().ffmpegLocalStorage.where('ffmpeg_key').equals(key).delete();
};

export default ffmpegLocalStorageDb;