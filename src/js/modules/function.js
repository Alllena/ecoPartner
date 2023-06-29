// Проверка поддержки браузером webp, добавление класса webp или  no-webp для HTML
export function checkWebPSupport() {
  const WebPImage = new Image();

  WebPImage.onload = () => {
    if (WebPImage.height > 0) {
      document.documentElement.classList.add("webp");
    } else {
      document.documentElement.classList.add("no-webp");
    }
  };

  WebPImage.onerror = () => {
    document.documentElement.classList.add("no-webp");
  };

  WebPImage.src =
    "data:image/webp;base64,UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==";
}
