import Dexie from 'dexie';

const ffmpegLocalStorageDb = () => {
    const ffmpegLocalStorageDb = new Dexie('ffmpegLocalStorageDb');
    ffmpegLocalStorageDb.version(2).stores({ ffmpegLocalStorage: "ffmpeg_key, value" });
    ffmpegLocalStorageDb.open().catch(err => {
        console.log(err);
    });
    return ffmpegLocalStorageDb;
}

export const GetFFMPEGLocalStorageData = async () => {
    return await ffmpegLocalStorageDb().ffmpegLocalStorage.toArray();
};

export const SetFFMPEGLocalStorageData = async (ffmpeg_key, value) => {
    console.log('SetFFMPEGLocalStorageData');
    let data = {
        ffmpeg_key,
        value
    };
    return await ffmpegLocalStorageDb().ffmpegLocalStorage.add(data);
}


export default ffmpegLocalStorageDb;