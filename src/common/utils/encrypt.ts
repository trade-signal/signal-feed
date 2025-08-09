import { createHash } from 'crypto';

export const sha256Hash = (str: string) => {
  return createHash('sha256').update(str).digest('hex');
};
export const md5Hash = (str: string) => {
  return createHash('md5').update(str).digest('hex');
};

export const sha1Encrypt = (str: string) => {
  return createHash('sha1').update(str).digest('hex');
};

export const sha256Encrypt = (str: string) => {
  return createHash('sha256').update(str).digest('hex');
};

export const md5Encrypt = (str: string) => {
  return createHash('md5').update(str).digest('hex');
};
