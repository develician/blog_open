import axios from 'axios';

type S3ThumbnailImageUploadPayload = { file: File };

export const s3ImageUpload = (payload: S3ThumbnailImageUploadPayload) => {
  const data = new FormData();
  data.append('image', payload.file);
  return axios.post(`/api/s3/images`, data, {
    onUploadProgress: e => {
      (window as any).nanobar.go((e.loaded / e.total) * 100);
    },
  });
};

type S3MarkdownImageUploadPayload = { file: File };

export const s3MarkdownImageUpload = (payload: S3MarkdownImageUploadPayload) => {
  const data = new FormData();
  data.append('image', payload.file);
  return axios.post(`/api/s3/markdownImages`, data, {
    onUploadProgress: e => {
      (window as any).nanobar.go((e.loaded / e.total) * 100);
    },
  });
};
