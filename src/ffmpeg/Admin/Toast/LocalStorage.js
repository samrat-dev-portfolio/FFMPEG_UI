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
    return await ffmpegLocalStorageDb().ffmpegLocalStorage.where('ffmpeg_key').equals(key).toArray();
};
export const SetFFMPEGLocalData = async (key, value) => {
    let data = {
        ffmpeg_key: key,
        value
    };
    return await ffmpegLocalStorageDb().ffmpegLocalStorage.add(data);
};
export const PutFFMPEGLocalData = async (key, value) => {
    let data = {
        value
    };
    return await ffmpegLocalStorageDb().ffmpegLocalStorage.where('ffmpeg_key').equals(key).modify(data);
};
export const DeleteFFMPEGLocalData = async (key) => {
    return await ffmpegLocalStorageDb().ffmpegLocalStorage.where('ffmpeg_key').equals(key).delete();
};

export default ffmpegLocalStorageDb;