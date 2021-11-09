import {blueFood, changePlant} from '../src/index.js'


describe("blueFood", () => {
  test("Should return an object of plant with soil incremented by 5", () => {
    const soilResult = blueFood({});
    expect(soilResult).toEqual({"soil": 5})
  })
})

describe("changePlant", () => {
  test("Should return a function that modifies the specified property", () => {
    const soilResult = changePlant("soil");
    expect(soilResult).toEqual(function(value) {
      return (plant) => (
        {
        ...plant,   
        [prop] : (plant[prop] || 0) + value
      })
    })
  })
})
