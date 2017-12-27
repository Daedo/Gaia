$(function () {
  loadFromCookie();
  init();
});
$(".tablinks").click(function (evt) {
  var tabName = evt.target.textContent.toLowerCase();
  if (tabName === "save") createSavefile();
  openTab(evt, tabName);
});

// Star handlers
$("#addStar").click(function (evt) {
  starEditor.addStar();
});
$("#deleteStar").click(function (evt) {
  starEditor.deleteStar();
});
$("#star-name").on("input", function (evt) {
  starEditor.updateName(evt.target.value);
});

// Planet handlers
$("#addPlanet").click(function (evt) {
  planetEditor.addPlanet();
});
$("#deletePlanet").click(function (evt) {
  planetEditor.deletePlanet();
});
$("#planet-name").on("input", function (evt) {
  planetEditor.updateName(evt.target.value);
});
$("#planet-typeselector").change(function (evt) {
  planetEditor.updatePlanetType(evt.target.value);
});

// Orbit handlers
$("#addOrbit").click(function (evt) {
  orbitEditor.addOrbit();
});
$("#deleteOrbit").click(function (evt) {
  orbitEditor.deleteOrbit();
});
$("#orbit-starselector").change(function (evt) {
  orbitEditor.updateCenterStar(evt.target.value);
});
$("#object-planetselector").change(function (evt) {
  orbitEditor.updatePlanetIndex(evt.target.value);
});

$("#addObject").click(function (evt) {
  orbitEditor.addObject();
});
$("#deleteObject").click(function (evt) {
  orbitEditor.deleteObject();
});
// Moon handlers
$("#addMoonSystem").click(function (evt) {
  moonEditor.addMoonSystem();
});
$("#deleteMoonSystem").click(function (evt) {
  moonEditor.deleteMoonSystem();
});
$("#system-planetselector").change(function (evt) {
  moonEditor.updateCenterPlanet(evt.target.value);
});
$("#moon-name").on("input", function (evt) {
  moonEditor.updateName(evt.target.value);
});
$("#moon-typeselector").change(function (evt) {
  moonEditor.updateMoonType(evt.target.value);
});
$("#addMoon").click(function (evt) {
  moonEditor.addMoon();
});
$("#deleteMoon").click(function (evt) {
  moonEditor.deleteMoon();
});
// File I/O
$("#saveAsCookie").click(function (evt) {
  saveAsCookie();
  alert("Done");
});
$("#loadFile").change(function (evt) {
  loadFile(evt);
  alert("Done");
});
$("#loadFromCookie").change(function (evt) {
  loadFromCookie();
  alert("Done");
});
