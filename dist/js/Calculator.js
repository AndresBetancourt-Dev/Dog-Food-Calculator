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
var fraction = document.getElementById("fraction");
var foodButtons = document.querySelectorAll(".Calculator__redirect");
var foodPrices = document.getElementsByClassName("Calculator__results-price");

//Variables
var monthlyKilograms = 0;
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
const prices = [
  [
    "37.500",
    "53.000",
    "63.000",
    "85.000",
    "100.500",
    "116.500",
    "132.000",
    "147.500",
    "160.000",
    "175.500",
    "191.000",
    "201.000",
    "212.500",
    "221.000",
    "229.000",
    "238.000",
    "252.000",
    "266.000",
    "280.000",
    "294.000",
    "307.500",
    "321.500",
    "335.500",
    "349.500",
    "363.500",
    "377.500",
    "391.500",
    "405.500",
    "419.500",
    "433.500",
    "447.500",
    "461.500",
    "475.500",
    "489.500",
    "503.500",
    "517.500",
    "531.500",
    "545.500",
    "559.500",
    "573.500",
    "587.500",
    "601.500",
    "615.500",
    "629.500",
    "643.500",
    "657.500",
  ],
  [
    "43.500",
    "57.500",
    "74.500",
    "92.000",
    "106.500",
    "122.000",
    "142.000",
    "156.000",
    "173.000",
    "190.500",
    "208.000",
    "217.500",
    "234.000",
    "251.000",
    "263.500",
    "274.000",
    "292.500",
    "309.000",
    "325.000",
    "341.500",
    "357.500",
    "374.000",
    "390.000",
    "406.500",
    "422.500",
    "439.000",
    "455.000",
    "471.500",
    "487.500",
    "504.000",
    "520.000",
    "536.500",
    "552.500",
    "569.000",
    "585.000",
    "601.500",
    "618.000",
    "634.000",
    "650.500",
    "666.500",
    "683.000",
    "699.000",
    "715.500",
    "731.500",
    "748.000",
    "764.000",
  ],
  [
    "58.500",
    "85.000",
    "101.500",
    "125.000",
    "150.000",
    "168.000",
    "196.500",
    "203.000",
    "217.500",
    "238.500",
    "259.500",
    "266.500",
    "286.500",
    "306.500",
    "318.000",
    "337.500",
    "357.000",
    "376.500",
    "396.500",
    "416.500",
    "436.000",
    "456.000",
    "476.000",
    "495.500",
    "515.500",
    "535.500",
    "555.000",
    "575.000",
    "595.000",
    "614.500",
    "634.500",
    "654.500",
    "674.000",
    "694.000",
    "714.000",
    "733.500",
    "753.500",
    "773.500",
    "793.000",
    "813.000",
    "833.000",
    "852.500",
    "872.500",
    "892.500",
    "912.000",
    "932.000",
  ],
  [
    "61.500",
    "89.000",
    "106.000",
    "131.000",
    "153.500",
    "176.500",
    "206.000",
    "215.500",
    "228.500",
    "250.500",
    "272.500",
    "280.000",
    "301.000",
    "322.000",
    "327.000",
    "347.000",
    "367.000",
    "387.500",
    "407.500",
    "428.000",
    "448.500",
    "469.000",
    "489.000",
    "509.500",
    "530.000",
    "550.500",
    "570.500",
    "591.000",
    "611.500",
    "632.000",
    "652.500",
    "672.500",
    "693.000",
    "713.500",
    "734.000",
    "754.000",
    "774.000",
    "795.000",
    "815.500",
    "835.500",
    "856.000",
    "876.500",
    "897.000",
    "917.500",
    "937.500",
    "958.000",
  ],
  [
    "76.500",
    "111.500",
    "135.500",
    "168.000",
    "196.500",
    "226.500",
    "258.000",
    "278.000",
    "292.000",
    "320.500",
    "349.000",
    "354.500",
    "381.000",
    "408.000",
    "423.500",
    "449.500",
    "475.500",
    "502.000",
    "528.000",
    "554.500",
    "581.000",
    "607.500",
    "634.000",
    "660.500",
    "686.500",
    "713.000",
    "739.500",
    "766.000",
    "792.500",
    "818.500",
    "845.500",
    "871.500",
    "898.000",
    "924.500",
    "951.000",
    "977.000",
    "1.003.500",
    "1.030.000",
    "1.056.500",
    "1.083.000",
    "1.109.500",
    "1.135.500",
    "1.162.000",
    "1.188.500",
    "1.215.000",
    "1.241.500",
  ],
];

const phone = "3183295026";
const genericMessage =
  "Hola, Buen día, Cordial Saludo, Acabo de Utilizar La Calculadora de Porciones ";
const whatsAppLink =
  "https://api.whatsapp.com/send?phone=57" + phone + "&text=";

//Adding link to each button
for (index = 0; index < foodButtons.length; index++) {
  if (index >= foodButtons.length - 1) {
    foodButtons[index].addEventListener("click", function () {
      window.open(
        whatsAppLink +
          genericMessage +
          "y he optado por comprar " +
          monthlyKilograms +
          " Kg de Gurú Mix."
      );
    });
    continue;
  }
  foodButtons[index].addEventListener("click", function (event) {
    if (monthlyKilograms) {
      if (monthlyKilograms > 23.5) {
        window.open(
          foodLinks[event.target.value] + "?attribute_pa_kgs-al-mes=a46",
          "_blank"
        );
      } else {
        window.open(
          foodLinks[event.target.value] +
            "?attribute_pa_kgs-al-mes=a" +
            (monthlyKilograms * 2 - 1),
          "_blank"
        );
      }
    }
  });
}

document
  .getElementsByClassName("Calculator__advice--link")[0]
  .addEventListener("click", function () {
    window.open(
      whatsAppLink +
        genericMessage +
        "y mi mascota tiene una dieta especial, escribo para obtener más información al respecto. Gracias."
    );
  });

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
      setPrices();
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

  if (isBaby() && (petSize.value <= 0 || petSize.value > 20)) {
    petSizeError.innerHTML = errorMessages[0] + " - Rango [1-20]";
    return false;
  }

  if (isKid() && (petSize.value <= 0 || petSize.value > 35)) {
    petSizeError.innerHTML = errorMessages[0] + " - Rango [1-35]";
    return false;
  }

  if (petSize.value <= 0 || petSize.value > 50) {
    petSizeError.innerHTML = errorMessages[0] + " - Rango [1-50]";
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
  foodAmount.innerHTML = monthlyKilograms;
  scoop.innerHTML = scoopsQuantity[0];
  if (scoopsQuantity[1]) {
    fraction.innerHTML = scoopsQuantity[1];
  } else {
    fraction.innerHTML = "";
  }
}

function setPrices() {
  for (let i = 0; i < foodPrices.length; i++) {
    if (i == foodPrices.length - 1) {
      break;
    }
    foodPrices[i].innerHTML = "$ " + prices[i][monthlyKilograms * 2 - 2];
  }
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
    return [scoopQuantity];
  }
  let scoopValues = scoopQuantity.toFixed(1).split(".");
  if (scoopValues[1] == 0) {
    return [Math.round(scoopQuantity)];
  }
  if (scoopValues[1] > 0 && scoopValues[1] <= 2.5) {
    return [scoopValues[0], "1/4"];
  }
  if (scoopValues[1] > 2.5 && scoopValues[1] <= 5.0) {
    return [scoopValues[0], "1/2"];
  }
  if (scoopValues[1] > 5.0 && scoopValues[1] <= 7.5) {
    return [scoopValues[0], "3/4"];
  }
  if (scoopValues[1] > 7.5) {
    return [parseFloat(scoopValues[0]) + 1];
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
