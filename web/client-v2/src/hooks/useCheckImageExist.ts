import { useState } from "react";

const NO_IMAGE_URL = "/no_image.png";

export const useCheckImageExist = (src?: string) => {
  const [result, setResult] = useState(true);

  const checkImagePath = () => {
    return new Promise(function (resolve, reject) {
      if (!src) {
        return NO_IMAGE_URL;
      }
      const image = new Image();
      image.src = src;
      image.onload = function () {
        resolve(image);
      };
      image.onerror = function () {
        reject(NO_IMAGE_URL);
      };
    });
  };

  checkImagePath()
    .then(() => {
      setResult(true);
    })
    .catch(() => {
      setResult(false);
    });

  if (src === "") return NO_IMAGE_URL;

  return result ? src : NO_IMAGE_URL;
};
