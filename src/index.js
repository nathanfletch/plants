import $ from "jquery";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/styles.css";

//business logic
export const changePlant = (prop) => {
  return (value) => {
    return (plant) => ({
      ...plant,
      [prop]: (plant[prop] || 0) + value, //- timesUsed
    });
  };
};

// we want to add a name.
const giveName = (name) => {
  return (plant) => ({
    ...plant,
    name: name,
  });
};

//add a function
const giveEatFunction = () => {
  return (plant) =>({
    ...plant,
    eat: function() {alert("nom, nom, nom")},
  });
};


const greenFood = changePlant("soil")(10);
const yuckyFood = changePlant("soil")(-5);
export const blueFood = changePlant("soil")(5);


const storePlant = () => {
  let currentPlant = {
  };
  return (plantChangeFunction = (plant) => plant) => {
    const newPlant = plantChangeFunction(currentPlant);
    currentPlant = { ...newPlant };
    return newPlant;
  };
};
const plantArray = [];

//ui logic
$("#new").click(function () {
  //create
  const newPlant = storePlant();
  plantArray.push(newPlant);
  displayPlants();
});

$("#feed").click(function () {
  plantArray.forEach((plantFunction) => plantFunction(blueFood));
  displayPlants();
});
$("#yucky").click(function () {
  plantArray.forEach((plantFunction) => plantFunction(yuckyFood));
  displayPlants();
});
$("#green").click(function () {
  plantArray.forEach((plantFunction) => plantFunction(greenFood));
  displayPlants();
});

$("#show-state").click(function () {
  //use the array to get an <li> for each plant in the array
  displayPlants();
});

$("#give-name-form").submit(function(e) {
  e.preventDefault();
  const name = $("#name-input").val();
  const plantNumber = $("#plant-number-input").val();
  //call the store method, pass the giveName
  plantArray[plantNumber](giveName(name));
  plantArray[plantNumber](giveEatFunction());
  displayPlants();
})
$("#eat-form").submit(function(e) {
  e.preventDefault();
  const eatNumber = $("#eat-number").val();
  //get the plant as is, call the .eat() function
  // const selectedPlant = plantArray[eatNumber]();
  // selectedPlant.eat();
  plantArray[eatNumber]().eat();
})

function displayPlants() {
  const plantsHtml = plantArray.map((plantFunction, i) => {
    //call the empty function to get the current state - get the plant object
    const plant = plantFunction();
    return `<li>Plant Number: ${i} Name: ${plant.name} Soil: ${plant.soil} Water: ${plant.water} Light: ${plant.light}</li>`;
  });
  $("#plant-list").html(plantsHtml);
}
