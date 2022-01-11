const weightInKg = Number(process.argv[2]);
const heightInM  = Number (process.argv[3]);
const Age = Number(process.argv[4]);
const dailyExercise = process.argv[5];
const gender = process.argv[6];
if(isNaN(Age) || isNaN(weightInKg) || isNaN(heightInM)){
    console.log(`
    Please make sure weight, height and age are numbers:

    weight (kg) example: 82 | your input: ${process.argv[2]}
    height (m) example 1.79 | your input: ${process.argv[3]}
    age (years) example 32  | your input: ${process.argv[4]} 

    $ node index.js 82 1.79 32 yes m
  `);
    process.exit();
}
//check for age
if(Age < 20){
    console.log("BMI calculator is not designed for person under 20");
    process.exit();
}
//check weight range//
if (weightInKg < 30 || weightInKg > 300) {
    console.log(`
      Your weight of ${weightInKg} kgs does not fall in the range between 30 kg and 300 kg
    `);
  
    process.exit();
}
  
  // check wether dailyExercise was answered with "yes" or "no"
if (dailyExercise !== "yes" && dailyExercise !== "no") {
    console.log(`
      Please mention you exercise daily with yes or no
    `);
  
    process.exit();
}
  
console.log("Weight",weightInKg);
console.log("Height",heightInM);
const BMI = weightInKg/(heightInM *heightInM);
let BMR;
if(gender.toUpperCase() === "F" )  
{
    BMR = 10 * weightInKg + 6.25 * (heightInM * 100) - 5 * Age - 150;
}
if(gender.toUpperCase() === "M")
{
    BMR = 10 * weightInKg + 6.25 * (heightInM * 100) - 5 * Age + 50;
}

const caloriesBurn = dailyExercise === "yes" ? BMR *1.6 : BMR * 1.4;
const idealWeight = Math.round(22.5 * heightInM * heightInM);
const weightToLoose = weightInKg - idealWeight;
const TimeInWeeks = Math.abs(weightToLoose / 0.5);
let caloriesToConsumed
if(weightToLoose > 0 ){
    caloriesToConsumed = caloriesBurn - 500;
}
else{
    caloriesToConsumed = caloriesBurn + 500;
}



console.log(`

    ****************
    BMI CALCULATOR
    ****************
    age: ${Age}
    Weight: ${weightInKg}
    Height: ${heightInM}
    Gender: ${gender}
    Do you exercise Daily: ${dailyExercise}
    ****************
    FACING THE FACTS
    ****************
    Your BMI Is : ${Math.round(BMI)}

    A BMI under 18.5 is considered underweight
    A BMI above 25 is considered overweight

    Your Ideal Weight Should be : ${idealWeight} kg
    With a normal lifestyle you burn ${Math.round(caloriesBurn)} calories a day.
    ***************
        DIET PLAN
    ***************
    If you want to reach at your ideal weight of ${idealWeight} kg
    Eat ${Math.round(caloriesToConsumed)} calories a day
    for ${Math.round(TimeInWeeks)} weeks.
    `);