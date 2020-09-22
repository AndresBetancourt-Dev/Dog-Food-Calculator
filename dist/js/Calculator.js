
//Obtaining the DOM from the HTML
var petSize = document.querySelector("#petSize");
var petSizeError = document.getElementById("petSize-error");
var petCastrated = document.querySelector("#petCastrated");
var petCastratedError = document.querySelector("#petCastrated-error");
var petAge = document.querySelector("#petAge");
var petAgeError = document.querySelector("#petAge-error");
var castratedContainer = document.querySelector("#Castrated");
var results = document.querySelector(".Calculator__results");
var petButton = document.getElementById("Calculator__button");
var scoop = document.querySelector("#scoop");
var foodAmount = document.querySelector("#foodAmount");
var portion = document.querySelector("#portion");
var foodButtons = document.querySelectorAll(".Calculator__redirect");

//Variables
const scoops = 33.25;
const days = 30;
var increment = 9;
const kilogram = 1000;
const foodLinks = [
  "https://gurualimentonatural.com/producto/mensualidad-sustentomarino/",
  "https://gurualimentonatural.com/producto/mensualidad-balanceintegral/",
  "https://gurualimentonatural.com/producto/mensualidad-instintocanino/",
  "https://gurualimentonatural.com/producto/mensualidad-vitalplus/",
  "https://gurualimentonatural.com/producto/mensualidad-vidaintrepida/",
  "https://gurualimentonatural.com/producto/mensualidad-mix/",
];
const errorMessages = [
  "¡Error! No se seleccionó el tamaño o digito un valor incorrecto",
  "¡Error! No se seleccionó si es castrado o no.",
  "!Error! No se seleccionó la edad.",
];

//Adding link to each button
for (index = 0; index < foodButtons.length; index++) {
  foodButtons[index].addEventListener("click", function (event) {
    console.log(event)
    if (monthlyKilograms) {
      if (monthlyKilograms > 23.5) {
        window.open(foodLinks[event.target.value] + "?attribute_pa_kgs-al-mes=a46",'_blank');
      } else {
        window.open(foodLinks[event.target.value] +"?attribute_pa_kgs-al-mes=a" +(monthlyKilograms * 2 - 1),'_blank');
        ;
      }
    }
  });
}

//Adding listener to Select's
petSize.addEventListener("change", function () {
  handleChange();
});
petCastrated.addEventListener("change", function () {
  handleChange();
});
petAge.addEventListener("change", function () {
  handleChange();
  isCastrable();
});


//On change of any selects it hides the Results and displays/undisplay another select if it's an Adult
function handleChange() {
  results.style.maxHeight = "0px";
}

function isCastrable() {
  if (isAdult()) {
    castratedContainer.style.maxHeight =
      castratedContainer.scrollHeight + 100 + "px";
  } else {
    petCastrated.value = "none";
    castratedContainer.style.maxHeight = "0px";
  }
}



//Theory the main Object/Method to be called, it uses most of the Variables.
function Calculator() {
  handleSubmit();
}


//Primary function
function handleSubmit() {
  petButton.addEventListener("click", function (event) {
    event.preventDefault();
    if (validData()) {
      calculate();
      results.style.maxHeight = results.scrollHeight + "px";
    }
  });
}


function cancelErrors() {
  petSizeError.innerHTML = "";
  petCastratedError.innerHTML = "";
  petAgeError.innerHTML = "";
}

//Validates if requirements are met within the calculator
function validData() {
  const invalid = "none";
  cancelErrors();
  if (petSize.value <= 0 || petSize.value > 50) {
    petSizeError.innerHTML = errorMessages[0]+" - Rango [0-50]";
    return false;
  }

  if(isBaby() && petSize.value>20){
    petSizeError.innerHTML = errorMessages[0]+" - Rango [0-20]";
    return false;
  }

  if(isKid() && petSize.value>35){
    petSizeError.innerHTML = errorMessages[0]+" - Rango [0-35]";
    return false;
  }

  if (isAdult()) {
    if (petCastrated.value === invalid) {
      petCastratedError.innerHTML = errorMessages[1];
      return false;
    }
  }

  if (petAge.value === invalid) {
    petAgeError.innerHTML = errorMessages[2];
    return false;
  }
  cancelErrors();
  return true;
}

//As it names describe it calculates, based on getting Values from other functions
function calculate() {
  let portioningPercentage = getPortioningPercentage();
  let activityValue = getActivityValue();
  let dailyPortion = getDailyPortion(portioningPercentage, activityValue);
  let monthlyPortion = getMonthlyPortion(dailyPortion);
  monthlyKilograms = getMonthlyKilograms(monthlyPortion);
  let scoopsQuantity = getScoopsQuantity(dailyPortion);
  portion.innerHTML = dailyPortion;
  foodAmount.innerHTML = monthlyKilograms+" Kg";
  scoop.innerHTML = scoopsQuantity;
}

function getPortioningPercentage() {
  if (isBaby()) {
    return 2.8;
  } else if (isKid()) {
    return 1.7;
  } else if (isTeenager()) {
    return 1;
  } else if (isAdult()) {
    return 1;
  }
}

//Conditions used a lot in the code that helps encapsulating the condition in a function to make it
//more readable when used.
function isBaby() {
  return petAge.value === "Bebe";
}
function isKid() {
  return petAge.value === "Niño";
}
function isTeenager() {
  return petAge.value === "Adolescente";
}
function isAdult() {
  return petAge.value === "Adulto";
}
function castrated() {
  return petCastrated.value === "YES";
}
function notCastrated() {
  return petCastrated.value === "NO";
}

//All get functions from the Calculator
function getActivityValue() {
  if (isAdult()) {
    if (notCastrated()) {
      increment = 11;
      return 6;
    }
  }
  increment = 9;
  return 6;
}

function getDailyPortion(portioningPercentage, activityValue) {
  return Math.round(getDailyValue() * portioningPercentage);
}
function getMonthlyPortion(dailyPortion) {
  return dailyPortion * days;
}
function getMonthlyKilograms(monthlyPortion) {
  let kilograms = monthlyPortion / kilogram;
  let decimals = kilograms.toString().split(".");
  if (decimals.length <= 1) {
    return kilograms;
  }
  if (decimals[1].length <= 1) {
    if (decimals[1] >= 5) {
      if (decimals[1] >= 7.5) {
        return parseInt(decimals[0]) + 1;
      } else {
        return decimals[0].concat(".", 5);
      }
    } else {
      if (decimals[1] >= 2.5) {
        return decimals[0].concat(".", 5);
      } else {
        return decimals[0];
      }
    }
  }
  if (decimals[1].length >= 2) {
    if (decimals[1].substr(0, 2) >= 50) {
      if (decimals[1].substr(0, 2) >= 75) {
        return parseInt(decimals[0]) + 1;
      } else {
        return decimals[0].concat(".", 5);
      }
    } else {
      if (decimals[1].substr(0, 2) >= 25) {
        return decimals[0].concat(".", 5);
      } else {
        return decimals[0];
      }
    }
  }
}
function getScoopsQuantity(dailyPortion) {
  let scoopQuantity = dailyPortion / scoops;
  if (scoopQuantity % 1 == 0) {
    return scoopQuantity;
  }
  let scoopValues = scoopQuantity.toFixed(1).split(".");
  if (scoopValues[1] == 0) {
    return Math.round(scoopQuantity);
  }
  if (scoopValues[1] > 0 && scoopValues[1] <= 2.5) {
    return scoopValues[0] + " 1/4";
  }
  if (scoopValues[1] > 2.5 && scoopValues[1] <= 5.0) {
    return scoopValues[0] + " 1/2";
  }
  if (scoopValues[1] > 5.0 && scoopValues[1] <= 7.5) {
    return scoopValues[0] + " 3/4";
  }
  if (scoopValues[1] > 7.5) {
    return parseFloat(scoopValues[0]) + 1;
  }
}

//Since it's probably the longest function in the program i will explain it.
//This function could be highly optimized using reduce but for compatibility issues i would rather not use it this time.
//Basically for each Kilogram of the Pet we must iterate to get the cumulative based on Grams per Kilogram of the Pet
//It's a simple accumulation for, but the trick it's when the pet it's either a Non-Castrated Adult, a Teenager or when the iterator reaches a specific range of number, the values of increment start decreasing.
//For example in the case of a Non-Castrated adult it can eat more food so the daily increment it's higher than a Castrated one.
//And we need two accumulations in case the dog it's a teenager because it's calculated based on the average between
//the daily value from a Castrated Adult dog, and Non-Castrated Adult dog.
function getDailyValue() {
  let accumulated = getActivityValue();
  let auxiliar = getActivityValue();

  for (var i = 1; i <= petSize.value; i++) {
    if (i >= 1 && i <= 5) {
      if (notCastrated()) {
        accumulated += increment;
        continue;
      }
      auxiliar += 11;
    }
    if (i >= 6 && i <= 15) {
      if (notCastrated()) {
        accumulated += increment - 1;
        continue;
      }
      auxiliar += 10;
    }
    if (i >= 16 && i <= 25) {
      if (notCastrated()) {
        accumulated += increment - 2;
        continue;
      }
      auxiliar += 9;
    }
    if (i >= 26 && i <= 35) {
      if (notCastrated()) {
        accumulated += increment - 5;
        continue;
      }
      auxiliar += 6;
    }
    if (i >= 36 && i <= 50) {
      if (notCastrated()) {
        accumulated += increment - 6;
        continue;
      }
      auxiliar += 5;
    }
    if (i >= 17 && i < 37) {
      accumulated += 6;
      continue;
    }
    if (i >= 37) {
      accumulated += 5;
      continue;
    }
    accumulated += increment;
  }
  if (isTeenager()) {
    return Math.round((accumulated + auxiliar) / 2);
  }
  return accumulated;
}

//Calling the maing function so the app it's setted up.
Calculator();
