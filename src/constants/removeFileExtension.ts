// 파일 확장자 제거 로직
export const removeFileExtension = (fileName: string) => {
  return fileName.replace(/\.(mp4|avi|mov|mkv|flv|wmv|webm)$/i, "");
};
