class Calculator {
  constructor() {
    this.getDOM();
    this.initVariables();
    this.handleSubmit();
  }

  getDOM() {
    this.petSize = document.querySelector("#petSize");
    this.petSizeError = document.querySelector("#petSize-error");
    this.petCastrated = document.querySelector("#petCastrated");
    this.petCastratedError = document.querySelector("#petCastrated-error");
    this.petAge = document.querySelector("#petAge");
    this.petAgeError = document.querySelector("#petAge-error");

    this.castratedContainer = document.querySelector("#Castrated");
    this.results = document.querySelector(".Calculator__results");
    this.petButton = document.querySelector(".Calculator__button");
    this.scoop = document.querySelector("#scoop");
    this.foodAmount = document.querySelector("#foodAmount");
    this.portion = document.querySelector("#portion");

    this.petSize.onchange = () => {
      this.handleChange();
    };
    this.petCastrated.onchange = () => {
      this.handleChange();
    };
    this.petAge.onchange = () => {
      this.handleChange();
      this.isCastrable();
    };
  }

  initVariables() {
    this.errorMessages = [
      "¡Error! No se seleccionó el tamaño o digito un valor incorrecto",
      "¡Error! No se seleccionó si es castrado o no.",
      "!Error! No se seleccionó la edad.",
    ];
    this.scoops = 33.25;
    this.days = 30;
    this.increment = 9;
    this.kilogram = 1000;
  }

  handleChange() {
    this.results.style.maxHeight = "0px";
  }

  handleSubmit() {
    this.petButton.onclick = (event) => {
      event.preventDefault();
      if (this.validData()) {
        this.calculate();
        this.results.style.maxHeight = this.results.scrollHeight + "px";
      }
    };
  }

  isCastrable() {
    if (this.isAdult()) {
      this.castratedContainer.style.maxHeight =
        this.castratedContainer.scrollHeight + 100 + "px";
    } else {
      this.petCastrated.value = "none";
      this.castratedContainer.style.maxHeight = "0px";
    }
  }

  cancelErrors() {
    this.petSizeError.innerHTML = "";
    this.petCastratedError.innerHTML = "";
    this.petAgeError.innerHTML = "";
  }

  validData = () => {
    const invalid = "none";
    this.cancelErrors();
    if (this.petSize.value <= 0 || this.petSize.value > 50) {
      this.petSizeError.innerHTML = this.errorMessages[0];
      return false;
    }
    if (this.isAdult()) {
      if (this.petCastrated.value === invalid) {
        this.petCastratedError.innerHTML = this.errorMessages[1];
        return false;
      }
    }
    if (this.petAge.value === invalid) {
      this.petAgeError.innerHTML = this.errorMessages[2];
      return false;
    }
    this.cancelErrors();
    return true;
  };

  calculate() {
    let portioningPercentage = this.getPortioningPercentage();
    let activityValue = this.getActivityValue();

    let dailyPortion = this.getDailyPortion(
      portioningPercentage,
      activityValue
    );
    let monthlyPortion = this.getMonthlyPortion(dailyPortion);

    let monthlyKilograms = this.getMonthlyKilograms(monthlyPortion);
    let scoopsQuantity = this.getScoopsQuantity(dailyPortion);

    this.portion.innerHTML = dailyPortion;
    this.foodAmount.innerHTML = `${monthlyKilograms} Kg`;
    this.scoop.innerHTML = scoopsQuantity;
  }

  getPortioningPercentage() {
    if (this.isBaby()) {
      return 2.8;
    } else if (this.isKid()) {
      return 1.7;
    } else if (this.isTeenager()) {
      return 1;
    } else if (this.isAdult()) {
      return 1;
    }
  }

  isBaby = () => this.petAge.value === "Bebe";
  isKid = () => this.petAge.value === "Niño";
  isTeenager = () => this.petAge.value === "Adolescente";
  isAdult = () => this.petAge.value === "Adulto";

  getActivityValue() {
    if (this.isAdult()) {
      if (this.notCastrated()) {
        this.increment = 11;
        return 6;
      }
    }
    this.increment = 9;
    return 6;
  }

  castrated = () => this.petCastrated.value === "YES";
  notCastrated = () => this.petCastrated.value === "NO";

  getDailyPortion = (portioningPercentage, activityValue) =>
    Math.round(this.getDailyValue() * portioningPercentage);
  getMonthlyPortion = (dailyPortion) => dailyPortion * this.days;

  getMonthlyKilograms(monthlyPortion) {
    let kilograms = monthlyPortion / this.kilogram;
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

  getScoopsQuantity(dailyPortion) {
    let scoopQuantity = dailyPortion / this.scoops;
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

  getDailyValue() {
    let accumulated = this.getActivityValue();
    let auxiliar = this.getActivityValue();

    for (var i = 1; i <= this.petSize.value; i++) {
      if (i >= 1 && i <= 5) {
        if (this.notCastrated()) {
          accumulated += this.increment;
          continue;
        }
        auxiliar += 11;
      }
      if (i >= 6 && i <= 15) {
        if (this.notCastrated()) {
          accumulated += this.increment - 1;
          continue;
        }
        auxiliar += 10;
      }
      if (i >= 16 && i <= 25) {
        if (this.notCastrated()) {
          accumulated += this.increment - 2;
          continue;
        }
        auxiliar += 9;
      }
      if (i >= 26 && i <= 35) {
        if (this.notCastrated()) {
          accumulated += this.increment - 5;
          continue;
        }
        auxiliar += 6;
      }
      if (i >= 36 && i <= 50) {
        if (this.notCastrated()) {
          accumulated += this.increment - 6;
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
      accumulated += this.increment;
    }
    if (this.isTeenager()) {
      return Math.round((accumulated + auxiliar) / 2);
    }
    return accumulated;
  }
}

new Calculator();
