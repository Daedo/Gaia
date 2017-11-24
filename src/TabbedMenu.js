/* Tabbed Menu */
var moonActive = false;
function openTab(evt, tabName) {
  if(tabName==="moon" && !moonActive) {
    return;
  }

  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(tabName).style.display = "inline-block";
  evt.currentTarget.className += " active";

  switch (tabName) {
    case "star":
      starEditor.updateView();
      break;

    case "planet":
      planetEditor.updateView();
      break;

    case "orbit":
      orbitEditor.updateView();
      break;

    case "moon":
      moonEditor.updateView();
      break;

    case "export":
      exportUpdate();
      break;
  }
}

function activateTab(tabName) {
  if(tabName!== "moon") {
    return;
  }

  moonActive = true;
  for (button of document.getElementsByClassName("tablinks")) {
    if(button.innerHTML.toUpperCase() === tabName.toUpperCase()) {
      button.style.display = "initial";
    }
  }
}

function deactivateTab(tabName) {
  if(tabName!== "moon") {
    return;
  }
  moonActive = false;
  for (button of document.getElementsByClassName("tablinks")) {
    if(button.innerHTML.toUpperCase() === tabName.toUpperCase()) {
      button.style.display = "none";
    }
  }
}
