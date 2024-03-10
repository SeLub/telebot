export const isArrayEmpty = (arr: Array<T>): boolean => {
    return Array.isArray(arr) && arr.length === 0 ? true : false }

export const getImageContentType = (filePath) => {
      const ext = '.' + filePath.toLowerCase().split('.').pop();
      switch (ext) {
      case '.jpg':
      case '.jpeg':
            return 'image/jpeg';
      case '.png':
            return 'image/png';
      case '.csv': 
            return 'text/csv';
      case '.txt':
            return 'text/plain';
      case '.doc':
            return 'application/msword';
      case '.pdf':
            return 'application/pdf';
      case '.avi':
            return 'video/x-msvideo';
      case '.mp3':
            return 'audio/mpeg';
      case '.mp4':
            return 'video/mp4';
      case '.mpeg':
            return 'video/mpeg';
      case '.webp':
            return 'image/webp';
      case '.webm':
            return 'video/webm';
      case '.xls':
            return 'application/vnd.ms-excel';
      default:
            throw new Error('Unsupported file type');
      }
  }
  
export const generateUniqueFileName = (filename) => {
      const fileName = filename;
      const url = URL.createObjectURL(new Blob());
      const UUID = url.substring(url.lastIndexOf('/') + 1);
      const fileNameWithoutExtension = fileName.split('.');
      const fileExtension = fileNameWithoutExtension.pop();
      const uniqueFileName = `${fileNameWithoutExtension.join('-')}-${UUID}.${fileExtension}`;
      return { UUID, uniqueFileName };
    }