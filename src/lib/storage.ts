import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from './firebase';
import { nanoid } from 'nanoid';

interface UploadResponse {
  url: string;
  key: string;
}

export async function uploadFile(file: File): Promise<UploadResponse> {
  try {
    // Generate a unique filename
    const fileExtension = file.name.split('.').pop();
    const uniqueFilename = `${nanoid()}.${fileExtension}`;
    
    // Create storage reference
    const storageRef = ref(storage, `uploads/${uniqueFilename}`);
    
    // Upload file
    await uploadBytes(storageRef, file);
    
    // Get download URL
    const url = await getDownloadURL(storageRef);
    
    return {
      url,
      key: uniqueFilename
    };
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
}