// src/utils/cloudinary.js
export function getResizedCloudinaryUrl(originalUrl, width, height, crop = 'fill') {
  const insertPoint = '/upload/';
  if (!originalUrl || !originalUrl.includes(insertPoint)) return originalUrl;

  // agar width/height na diye ho to full image show kare
  if (!width && !height) {
    return originalUrl;
  }

  // transformation parts collect karo
  let transformations = [];
  if (width) transformations.push(`w_${width}`);
  if (height) transformations.push(`h_${height}`);

  // crop, format aur quality hamesha add karo
  transformations.push(`c_${crop}`, 'f_auto', 'q_auto');

  const transformation = transformations.join(',') + '/';

  return originalUrl.replace(insertPoint, `${insertPoint}${transformation}`);
}
