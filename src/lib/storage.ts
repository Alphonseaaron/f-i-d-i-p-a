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
    
    // Create form data
    const formData = new FormData();
    formData.append('file', file);
    formData.append('filename', uniqueFilename);

    // Upload to Netlify Function
    const response = await fetch('/.netlify/functions/upload', {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      throw new Error('Upload failed');
    }

    const data = await response.json();
    return {
      url: data.url,
      key: uniqueFilename
    };
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
}