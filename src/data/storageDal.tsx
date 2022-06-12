import { ref, uploadBytes } from 'firebase/storage';
import { firebaseStorage } from '../thirdParty/fireBase';


export const uploadFile = (folderName: string, fileName: string, fileType: string, file: File) => {
    const fileRef = ref(firebaseStorage, `${folderName}/${fileName}}.${fileType}`)

    return uploadBytes(fileRef, file)
}
