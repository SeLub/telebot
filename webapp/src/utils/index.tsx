const {
    VITE_STORAGE_ENDPOINT: storageEndpoint,
    VITE_STORAGE_BUCKET_NAME: storageBucket,
    VITE_STORAGE_ATTACHMENTS_FOLDER: attachmentsFolder,
    VITE_STORAGE_APP_IMAGES_FOLDER: appImagesFolder,
} = import.meta.env;

export const isArrayEmpty = (arr: Array<T>): boolean => {
    return Array.isArray(arr) && arr.length === 0 ? true : false;
};

export const getImageContentType = (fileName: string) => {
    const ext = '.' + fileName.toLowerCase().split('.').pop();
    switch (ext) {
        case '.jpg':
        case '.jpeg':
            return 'image/jpeg';
        case '.gif':
            return 'image/gif';
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
        case '.xlsx':
            return 'application/vnd.ms-excel';
        default:
            throw new Error('Unsupported file type');
    }
};

export const generateUniqueFileName = (filename: string) => {
    const fileName = filename;
    const url = URL.createObjectURL(new Blob());
    const UUID = url.substring(url.lastIndexOf('/') + 1);
    const fileNameWithoutExtension = fileName.split('.');
    const fileExtension = fileNameWithoutExtension.pop();
    const uniqueFileName = `${fileNameWithoutExtension.join('-')}-${UUID}.${fileExtension}`;
    return { UUID, uniqueFileName };
};

export const getImageUrl = (attachment) => {
    const appImagePath = storageEndpoint + '/' + storageBucket + '/' + appImagesFolder + '/fileTypes/';
    const attachmentsPath = storageEndpoint + '/' + storageBucket + '/' + attachmentsFolder + '/';
    const ext = '.' + attachment.attachment_filename.toLowerCase().split('.').pop();
    switch (ext) {
        case '.jpg':
        case '.jpeg':
        case '.png':
        case '.gif':
        case '.webp':
            return attachmentsPath + attachment.attachment_filename;
        case '.csv':
            return appImagePath + 'csv.png';
        case '.txt':
            return appImagePath + 'txt.png';
        case '.doc':
            return appImagePath + 'doc.png';
        case '.pdf':
            return appImagePath + 'pdf.png';
        case '.avi':
            return appImagePath + 'avi.png';
        case '.mp3':
            return appImagePath + 'mp3.png';
        case '.mp4':
            return appImagePath + 'mp4.png';
        case '.mpeg':
            return appImagePath + 'mpeg.png';
        case '.webm':
            return appImagePath + 'webm.png';
        case '.xls':
        case '.xlsx':
            return appImagePath + 'xls.png';
        default:
            return appImagePath + 'file.png';
    }
};

export const getUploadUrl = (file: FileWithPath) => {
    const appImagePath = storageEndpoint + '/' + storageBucket + '/' + appImagesFolder + '/fileTypes/';
    const ext = '.' + file.name.toLowerCase().split('.').pop();
    switch (ext) {
        case '.jpg':
        case '.jpeg':
        case '.png':
        case '.gif':
        case '.bmp':
        case '.webp':
            return URL.createObjectURL(file);
        case '.csv':
            return appImagePath + 'csv.png';
        case '.txt':
            return appImagePath + 'txt.png';
        case '.doc':
            return appImagePath + 'doc.png';
        case '.pdf':
            return appImagePath + 'pdf.png';
        case '.avi':
            return appImagePath + 'avi.png';
        case '.mp3':
            return appImagePath + 'mp3.png';
        case '.mp4':
            return appImagePath + 'mp4.png';
        case '.mpeg':
            return appImagePath + 'mpeg.png';
        case '.webm':
            return appImagePath + 'webm.png';
        case '.xls':
        case '.xlsx':
            return appImagePath + 'xls.png';
        default:
            return appImagePath + 'file.png';
    }
};

export const transpileHTMLtoTelegramHTML = (text: string) => {
    if (!text) return;
    const cleanTextFromUnsupportedHTMLtags = text
        .replace(/<code>/gm, '<pre>')
        .replace(/<\/code>/gm, '</pre>')
        // .replace(/<p><\/p>/gm, "\n")
        .replace(/<\/pre>[<p><\/p>n]*<pre>/gm, '\n')
        .replace(/<p>|<ol>|<\/ol>|<\/li>|<ul>|<\/ul>/gm, '')
        .replace(/<\/p>|<br>/gm, '\n')
        .replace(/<\/p>|<li>/gm, '- ')
        .replace(/<strong>/gm, '<b>')
        .replace(/<\/strong>/gm, '</b>')
        .replace(/rel="noopener noreferrer nofollow" /gm, '');
    return cleanTextFromUnsupportedHTMLtags;
};
