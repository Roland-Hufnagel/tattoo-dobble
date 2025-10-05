// const imagePaths = Array.from(
//   { length: 57 },
//   (_, i) => `./public/images/img${i + 1}.png`
// );
const preloadedImages = [];

export async function preloadImages() {
  const imagePaths = Array.from(
    { length: 57 },
    (_, i) => `./public/images/dogs/img${i + 1}.png`
  );
  return Promise.all(
    imagePaths.map((path) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = path;
        img.onload = () => resolve(img);
        img.onerror = () => resolve(null); // Fehler ignorieren
        preloadedImages.push(img);
      });
    })
  );
}
