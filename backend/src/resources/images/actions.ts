// import axios from 'axios';
// import { requireEnvVar } from '../../db/utils';
// import { Readable } from 'stream';
//
// import { FormDataEncoder } from 'form-data-encoder';
// import { FormData } from 'formdata-node';
// import fetch from "node-fetch"

export const uploadImage = async (file: any) => {
  // const formData = new FormData();
  // formData.append('file', file);
  // formData.append('upload_preset', requireEnvVar('CLOUDINARY_UPLOAD_PRESET'));
  //
  // const encoder = new FormDataEncoder(formData);
  //
  // const options = {
  //   method: 'post',
  //   headers: encoder.headers,
  //   body: Readable.from(encoder),
  // };
  //
  // return await fetch(requireEnvVar('CLOUDINARY_URL'), options);
  // const res = axios
  //   .post(, formData)
  //   .then((res) => {
  //     return res;
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
  //
  // return res;
};
