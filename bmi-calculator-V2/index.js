//Function to validate No. of inputs//
function validateNumberOfInputs(argv) {
    if (argv.length !== 7) {
      console.log(`
        You gave ${argv.length - 2} argument(s) to the program
        Please provide 5 arguments as below:
        
        $ node index.js 72 1.57 32 yes m
      `);
  
      process.exit();
    }
  }

  //Function to validate Daily Exercise//
function validateDailyExercise(doesUserExercise) {

    if (doesUserExercise !== "yes" && doesUserExercise !== "no") {
      console.log(`
        Please mention your exercise daily with yes or no
    `);
      process.exit();
    }
  }

  //Function to validate parameter Weight,Height and Age//
function validateWeightHeightAndAge(weight, height, ageOfUser, argv) {
    if (isNaN(weight) || isNaN(height) || isNaN(ageOfUser)) {
      console.log(`
        Please make sure weight, height and age are numbers as mentioned in below arguments
        $ node index.js 72 1.57 32 yes m
      `);
  
      process.exit();
    }
  
    if (ageOfUser < 20) {
      console.log(`
        This BMI calculator was designed to be used by people older than 20
      `);
  
      process.exit();
    }
  
    if (weight < 30 || weight > 300) {
      console.log(`
        Please enter a weight in kgs
        
        Your weight of ${weight} kgs does not fall in the range between 30 kg and 300 kg
      `);
  
      process.exit();
    }
  }
  //Function to Calulate BMI//
function calculateBMI(weight, height) {
    const BMI = weight / (height * height); 
    return BMI;  
}
//Function to Validate Gender//
function validateGender(genderOfUser) {
    if (genderOfUser !== "m" && genderOfUser !== "f") {
      console.log(`
        Please specify wether you are a male "m" or female "f"
      `);
  
      process.exit();
    }
  }
    
 //function to calculate BMR// 
function calculateBMR(weight, height, ageOfUser, genderOfUser) {
    const heightInCm = height * 100;
  
    let BMR;
  
    if (genderOfUser === "m") {
      BMR = 10 * weight + 6.25 * heightInCm - 5 * ageOfUser + 50;
    } else {
      BMR = 10 * weight + 6.25 * heightInCm - 5 * ageOfUser - 150;
    }
  
    return BMR;
}

//function to calculate DailyCalories//
function calculateDailyCalories(baseMetabolicRate, doesUserExercise) {
    return doesUserExercise === "yes"
      ? baseMetabolicRate * 1.6
      : baselMetabolicRate * 1.4;    
}
  
//Function to calculate Ideal Weight//
function calculateIdealWeight(height) {
    return 22.5 * height * height;
}

//Function to calculate No. of Weeks to be on diet//
function calculateDietWeeks(weightToLose) {
    return Math.abs(weightToLose / 0.5);
}

//Calculate Calories//
function calculateDietCalories(weightToLose, caloriesUsedDaily) {
    return weightToLose > 0 ? caloriesUsedDaily - 500 : caloriesUsedDaily + 500;
}

//Function for Displaying Result on Console.//
function formatOutput(userObject) {
    return `
        **************
        BMI CALCULATOR
        **************
    
        age: ${userObject.age} years
        gender: ${userObject.gender}
        height: ${userObject.heightInM} m
        weight: ${userObject.weightInKg} kg
        do you exercise daily? ${userObject.dailyExercise}
    
        ****************
        FACING THE FACTS
        ****************
    
        Your BMI is ${Math.round(userObject.BMI)}
    
        A BMI under 18.5 is considered underweight
        A BMI above 25 is considered overweight
    
        Your ideal weight is ${userObject.weightInKg} kg
        With a normal lifestyle you burn ${userObject.dailyCalories} calories a day
    
        **********
        DIET PLAN
        **********
    
        If you want to reach your ideal weight of ${Math.round(userObject.idealWeight)} kg:
    
        Eat ${userObject.dietCalories} calories a day
        For ${Math.round(userObject.dietWeeks)} weeks
        `;
  }
  //Main function for calculating BMI with subfunctions inside it//
function bmiCalculator() {
    validateNumberOfInputs(process.argv);

    const weightInKg = parseInt(process.argv[2]);
    const heightInM = parseFloat(process.argv[3]);
    const age = parseInt(process.argv[4]);
    const dailyExercise = process.argv[5];
    const gender = process.argv[6];

    validateWeightHeightAndAge(weightInKg, heightInM, age, process.argv);
    validateDailyExercise(dailyExercise);
    validateGender(gender);

    const BMI = calculateBMI(weightInKg, heightInM);
    const idealWeight = calculateIdealWeight(heightInM);
    const BMR = calculateBMR(weightInKg, heightInM, age, gender);
    const dailyCalories = calculateDailyCalories(BMR, dailyExercise);
    const weightToLose = weightInKg - idealWeight;
    const dietWeeks = calculateDietWeeks(weightToLose);
    const dietCalories = calculateDietCalories(weightToLose, dailyCalories);

    const user = {
        weightInKg: weightInKg,
        heightInM: heightInM,
        age: age,
        dailyExercise: dailyExercise,
        gender: gender,
        BMI: BMI,
        idealWeight: idealWeight,
        dailyCalories: dailyCalories,
        weightToLoseKg: weightToLose,
        dietWeeks: dietWeeks,
        dietCalories: dietCalories
      };
    
      const output = formatOutput(user);
      console.log(output);
}
 bmiCalculator();