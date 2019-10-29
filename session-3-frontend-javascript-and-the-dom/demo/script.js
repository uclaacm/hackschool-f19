const images = document.getElementsByTagName("img");

for (let image of images) {
  image.addEventListener("click", e => {
    if (e.target.classList.contains("selected")) {
      for (let i of images) {
        i.style.opacity = 1.0;
      }
      e.target.classList.remove("selected");
    } else {
      for (let i of images) {
        i.style.opacity = 0.5;
      }
      e.target.style.opacity = 1.0;
      e.target.classList.add("selected");
    }
  });
}
