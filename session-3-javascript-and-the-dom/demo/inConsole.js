// Assign the element with the id "website" to the variable w
const w = document.getElementById("website");

// Add some HTML to the element
w.innerHTML = "bread ";

// Change the style of the element
w.style.color = "red";

// Change all table rows to a new string
const trCollection = document.querySelectorAll("tr");
for (let tr of trCollection) {
  tr.innerHTML = "<h1>let's get this bread</h1>";
}

// Add a new div to the element with id 'website'
const divElement = document.createElement("div");
divElement.innerHTML = "<h1>let's obtain this grain</h1>";
w.appendChild(divElement);

// Add an event listener that logs 'Clicked!'
w.addEventListener("click", () => {
  console.log("Clicked!");
});

// Add event listener that changes what was clicked to blue
w.addEventListener("click", e => {
  console.log(e.target);
  e.target.style.color = "blue";
});
