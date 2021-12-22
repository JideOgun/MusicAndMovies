// Team list on HTML Dropdown Button
var dropdown = document.querySelector('.dropdown');
dropdown.addEventListener('click', function(event) {
  event.stopPropagation();
  dropdown.classList.toggle('is-active');
});

// Adding some basic modal functions on the Card IMAGES
// Variables
var modalBtn1 = document.getElementById('img-1')
var modalOne = document.getElementById('modal1')
var closeBtn1 = document.getElementById('close-1');

var modalBtn2 = document.getElementById('img-2');
var modalTwo = document.getElementById('modal2');
var closeBtn2 = document.getElementById('close-2');

// Activating the Modals
function showModalOne() {
  if (modalOne.style.display === "none") {
    modalOne.style.display = "flex";
  } else {
    modalOne.style.display = "none";
  }
}

function showModalTwo() {
  if (modalTwo.style.display === "none") {
    modalTwo.style.display = "flex";
  } else {
    modalTwo.style.display = "none";
  }
}
modalBtn1.addEventListener("click", showModalOne);
modalBtn2.addEventListener("click", showModalTwo);

// Closing the Modals
function closeModal() {
console.log(true);
modalOne.style.display = "none";
modalTwo.style.display = "none";
}

closeBtn1.addEventListener('click', closeModal);
closeBtn2.addEventListener('click', closeModal);



