export const removeFileExtension = fileName => {
  return fileName.replace(/\.(mp4|avi|mov|mkv|flv|wmv|webm)$/i, '');
};
