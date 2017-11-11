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
$("#star-mass").on("input", function (evt) {
  starEditor.updateMass(evt.target.value);
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
$("#planet-mass").on("input", function (evt) {
  planetEditor.updateMass(evt.target.value);
});
$("#planet-radius").on("input", function (evt) {
  planetEditor.updateRadius(evt.target.value);
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
$("#object-semi-major-axis").on("input", function (evt) {
  orbitEditor.updateSemiMajorAxis(evt.target.value);
});
$("#object-eccentricity").on("input", function (evt) {
  orbitEditor.updateEccentricity(evt.target.value);
});
$("#object-inclination").on("input", function (evt) {
  orbitEditor.updateInclination(evt.target.value);
});
$("#object-longitude-of-the-ascending-node").on("input", function (evt) {
  orbitEditor.updateLongitudeOfTheAscendingNode(evt.target.value);
});
$("#object-argument-of-periapsis").on("input", function (evt) {
  orbitEditor.updateArgumentOfPeriapsis(evt.target.value);
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
$("#moon-mass").on("input", function (evt) {
  moonEditor.updateMass(evt.target.value);
});
$("#moon-radius").on("input", function (evt) {
  moonEditor.updateRadius(evt.target.value);
});
$("#moon-radius-2").on("input", function (evt) {
  moonEditor.updateRadiusB(evt.target.value);
});
$("#moon-radius-3").on("input", function (evt) {
  moonEditor.updateRadiusC(evt.target.value);
});
$("#moon-semi-major-axis").on("input", function (evt) {
  moonEditor.updateSemiMajorAxis(evt.target.value);
});
$("#moon-eccentricity").on("input", function (evt) {
  moonEditor.updateEccentricity(evt.target.value);
});
$("#moon-inclination").on("input", function (evt) {
  moonEditor.updateInclination(evt.target.value);
});
$("#moon-longitude-of-the-ascending-node").on("input", function (evt) {
  moonEditor.updateLongitudeOfTheAscendingNode(evt.target.value);
});
$("#moon-argument-of-periapsis").on("input", function (evt) {
  moonEditor.updateArgumentOfPeriapsis(evt.target.value);
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
