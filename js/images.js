document.addEventListener("DOMContentLoaded", () => {
  const imageGallery = document.getElementById("image-gallery");
  const article = document.querySelector("article");
  const blogFolder = article.getAttribute("data-blog-folder");

  // Fetch the JSON file
  fetch(`${blogFolder}/num.json`)
    .then((response) => response.json())
    .then((data) => {
      const folderLength = Number(data.folderLength);

      const fetchImages = (folder) => {
        const images = [];
        for (let i = 1; i <= folderLength; i++) {
          images.push(`%20(${i}).jpg`);
        }
        return images;
      };

      const images = fetchImages(blogFolder);

      images.forEach((image) => {
        const img = document.createElement("img");
        img.src = `${blogFolder}/${image}`;
        img.alt = `Image ${image}`;

        console.log(img.src);
        imageGallery.appendChild(img);
      });
    })
    .catch((error) => {
      console.error("Error fetching JSON:", error);
    });
});
