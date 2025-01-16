import { useCallback, useEffect, useState } from "react";

const NO_IMAGE_URL = "/no_image.png";

export const useCheckImageExist = (src?: string) => {
  const [result, setResult] = useState(true);

  const checkImagePath = useCallback(() => {
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
  }, [src]);

  useEffect(() => {
    checkImagePath()
      .then(() => {
        setResult(true);
      })
      .catch(() => {
        setResult(false);
      });
  }, [checkImagePath]);

  if (src === "") return NO_IMAGE_URL;

  return result ? src : NO_IMAGE_URL;
};
