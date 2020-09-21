var petSize = document.querySelector("#petSize");
    var petSizeError = document.querySelector("#petSize-error");
    var petCastrated = document.querySelector("#petCastrated");
    var petCastratedError = document.querySelector("#petCastrated-error");
    var petAge = document.querySelector("#petAge");
    var petAgeError = document.querySelector("#petAge-error");

    var castratedContainer = document.querySelector("#Castrated");
    var results = document.querySelector(".Calculator__results");
    var petButton = document.querySelector(".Calculator__button");
    var scoop = document.querySelector("#scoop");
    var foodAmount = document.querySelector("#foodAmount");
    var portion = document.querySelector("#portion");

    var foodButtons = document.querySelectorAll('.Calculator__redirect');
    var foodLinks = [
      "https://gurualimentonatural.com/producto/mensualidad-sustentomarino/",
      "https://gurualimentonatural.com/producto/mensualidad-balanceintegral/",
      "https://gurualimentonatural.com/producto/mensualidad-instintocanino/",
      "https://gurualimentonatural.com/producto/mensualidad-vitalplus/",
      "https://gurualimentonatural.com/producto/mensualidad-vidaintrepida/",
      "https://gurualimentonatural.com/producto/mensualidad-mix/"
    ];

    foodButtons.forEach((button, index)=>{
      button.addEventListener('click',function(){
        if(monthlyKilograms){
          if(monthlyKilograms>23.5){
            button.setAttribute('href',`${foodLinks[index]}?attribute_pa_kgs-al-mes=a46`);
          }else{
            button.setAttribute('href',`${foodLinks[index]}?attribute_pa_kgs-al-mes=a${monthlyKilograms*2-1}`);
          } 
        }
        
      })
    })

    petSize.onchange = function(){
      handleChange();
    };
    petCastrated.onchange = function(){
      handleChange();
    };
    petAge.onchange = () => {
      handleChange();
      isCastrable();
    };


var errorMessages = [
  "¡Error! No se seleccionó el tamaño o digito un valor incorrecto",
  "¡Error! No se seleccionó si es castrado o no.",
  "!Error! No se seleccionó la edad.",
];
var scoops = 33.25;
var days = 30;
var increment = 9;
var kilogram = 1000;

  function Calculator(){
    handleSubmit();
  }

  function handleChange(){
    results.style.maxHeight = "0px";
  }

  function handleSubmit(){
    petButton.onclick = (event) => {
      event.preventDefault();
      if (validData()) {
        calculate();
        results.style.maxHeight = results.scrollHeight + "px";
      }
    };
  }

  function isCastrable(){
    if (isAdult()) {
      castratedContainer.style.maxHeight =
        castratedContainer.scrollHeight + 100 + "px";
    } else {
      petCastrated.value = "none";
      castratedContainer.style.maxHeight = "0px";
    }
  }

  function cancelErrors(){
    petSizeError.innerHTML = "";
    petCastratedError.innerHTML = "";
    petAgeError.innerHTML = "";
  }

  function validData(){
    const invalid = "none";
    cancelErrors();
    if (petSize.value <= 0 || petSize.value > 50) {
      petSizeError.innerHTML = errorMessages[0];
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
  };

  function calculate(){
    let portioningPercentage = getPortioningPercentage();
    let activityValue = getActivityValue();

    let dailyPortion = getDailyPortion(
      portioningPercentage,
      activityValue
    );
    let monthlyPortion = getMonthlyPortion(dailyPortion);

    monthlyKilograms = getMonthlyKilograms(monthlyPortion);
    let scoopsQuantity = getScoopsQuantity(dailyPortion);

    portion.innerHTML = dailyPortion;
    foodAmount.innerHTML = `${monthlyKilograms} Kg`;
    scoop.innerHTML = scoopsQuantity;
  }

  function getPortioningPercentage(){
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

  function isBaby(){ return petAge.value === "Bebe"};
  function isKid(){ return petAge.value === "Niño"};
  function isTeenager(){ return petAge.value === "Adolescente"};
  function isAdult(){ return petAge.value === "Adulto"};

  function getActivityValue(){
    if (isAdult()) {
      if (notCastrated()) {
        increment = 11;
        return 6;
      }
    }
    increment = 9;
    return 6;
  }

  function castrated(){ return petCastrated.value === "YES"};
  function notCastrated(){ return petCastrated.value === "NO";};

  function getDailyPortion(portioningPercentage, activityValue){
    return Math.round(getDailyValue() * portioningPercentage);
  };
    function getMonthlyPortion(dailyPortion){ return dailyPortion * days};

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


Calculator();
