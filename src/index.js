import $ from 'jquery'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import './css/styles.css'

//business logic
const changePlant = (prop) => {
  return (value) => {
    return (plant) => ({
      ...plant, 
      [prop] : (plant[prop] || 0) + value
    })
  }
}

// const feed = changePlant("soil");
// const hydrate = changePlant("water");
// const giveLight = changePlant("light");

const greenFood = changePlant("soil")(10)
const yuckyFood = changePlant("soil")(-5)
const blueFood = changePlant("soil")(5)

const storePlant = () => {
  let currentPlant = {
    // name: name
  };
  return (plantChangeFunction = plant => plant) => {
    const newPlant = plantChangeFunction(currentPlant);
    currentPlant = {...newPlant};
    return newPlant;
  }
}
const plantControl = storePlant();
const plantControl2 = storePlant();

//ui logic
$("#feed-2").click(function() {
  //do something
  const fedPlant = plantControl2(blueFood);
  $("#soil-value-2").text(`Soil: ${fedPlant.soil} Water: ${fedPlant.water} Light: ${fedPlant.light}`);
});
$("#feed").click(function() {
  //do something
  const fedPlant = plantControl(blueFood);
  $("#soil-value").text(`Soil: ${fedPlant.soil} Water: ${fedPlant.water} Light: ${fedPlant.light}`);
});
$("#yucky").click(function() {
  //do something
  const fedPlant = plantControl(yuckyFood);
  $("#soil-value").text(`Soil: ${fedPlant.soil} Water: ${fedPlant.water} Light: ${fedPlant.light}`);
});
$("#green").click(function() {
  //do something
  const fedPlant = plantControl(greenFood);
  $("#soil-value").text(`Soil: ${fedPlant.soil} Water: ${fedPlant.water} Light: ${fedPlant.light}`);
});

$("#show-state").click(function() {
  const currentPlant = plantControl();
$("#soil-value").text(`Soil: ${currentPlant.soil}`);
});