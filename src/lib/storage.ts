import { nanoid } from 'nanoid';

interface UploadResponse {
  url: string;
  path: string;
}

export async function uploadFile(file: File, folder: string = 'uploads'): Promise<UploadResponse> {
  try {
    const fileExtension = file.name.split('.').pop();
    const uniqueFilename = `${nanoid()}.${fileExtension}`;
    const path = `/assets/${folder}/${uniqueFilename}`;
    
    // Create a URL for the file
    const url = URL.createObjectURL(file);
    
    return {
      url,
      path
    };
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
}

export async function deleteFile(path: string): Promise<void> {
  try {
    // In a local storage setup, we don't need to do anything here
    // The files will be managed by the build system
    console.log('File deletion not implemented for local storage:', path);
  } catch (error) {
    console.error('Error deleting file:', error);
    throw error;
  }
}