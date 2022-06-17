import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { firebaseStorage } from '../thirdParty/fireBase';


export const uploadFile = (pathToFile: string, fileName: string, fileType: string, file: File) => {
    const fileRef = ref(firebaseStorage, `${pathToFile}/${fileName}.${fileType}`);

    return uploadBytes(fileRef, file);
}


export const getFileUrl = (pathToFile: string, fileName: string, fileType: string) => {
    const fileRef = ref(firebaseStorage, `${pathToFile}/${fileName}.${fileType}`);
    return getDownloadURL(fileRef);
}