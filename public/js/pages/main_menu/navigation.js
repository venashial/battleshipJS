//Div Switching
function openMainMenu() {
document.getElementById("multiplayer-menu").style.display = "none";
document.getElementById("statistics").style.display = "none";
document.getElementById("how-to-play").style.display = "none";
document.getElementById("credits").style.display = "none";
document.getElementById("main-menu").style.display = "block";

window.location.hash = ""

if (document.getElementsByClassName("back_button")[0] != undefined) {
document.getElementsByClassName("back_button")[0].style.display = "none"
}
}

function openMultiplayerMenu() {
document.getElementById("main-menu").style.display = "none";
document.getElementById("multiplayer-menu").style.display = "block";
window.location.hash = "multiplayer"

document.getElementsByClassName("back_button")[0].style.display = "block"
}

function openStatistics() {
  document.getElementById("main-menu").style.display = "none";
  document.getElementById("statistics").style.display = "block";
  window.location.hash = "statistics"

document.getElementsByClassName("back_button")[0].style.display = "block"
}

function openHowToPlay() {
    document.getElementById("main-menu").style.display = "none";
    document.getElementById("how-to-play").style.display = "block";
    window.location.hash = "how-to-play"

document.getElementsByClassName("back_button")[0].style.display = "block"
}

function openCredits() {
  document.getElementById("main-menu").style.display = "none";
  document.getElementById("credits").style.display = "block";
  window.location.hash = "credits"

document.getElementsByClassName("back_button")[0].style.display = "block"
}

//Collapsible Menus
var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  });
}