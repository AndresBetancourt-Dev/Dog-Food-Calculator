class Calculator{

    getDOM(){
        this.petSize = document.querySelector('#petSize');
        this.petSizeError = document.querySelector('#petSize-error');
        this.petActivity = document.querySelector('#petActivity');
        this.petActivityError = document.querySelector('#petActivity-error');
        this.petAge = document.querySelector('#petAge');
        this.petAgeError = document.querySelector('#petAge-error');
        this.results = document.querySelector('.Calculator__results');
        this.petButton = document.querySelector('.Calculator__button');  
        this.scoop = document.querySelector('#scoop');
        this.foodAmount = document.querySelector('#foodAmount');
        this.portion = document.querySelector('#portion');
        this.monthlyServing = document.querySelector('#monthly');
    
        this.petSize.onchange = ()=>{
            this.handleChange()
        } 
        this.petActivity.onchange = ()=>{
            this.handleChange()
        } 
        this.petAge.onchange = ()=>{
            this.handleChange()
        } 
    }

    initVariables(){
        this.errorMessages = [
            "¡Error! No se seleccionó el tamaño o digito un valor incorrecto",
            "¡Error! No se seleccionó la actividad.",
            "!Error! No se seleccionó la edad."
        ];
        this.scoops = 35;
        this.days = 30;
        this.increment = 15;
        this.kilogram = 1000;

    }

    handleChange(){
        this.results.style.maxHeight = '0px';
    }

    handleSubmit(){
        this.petButton.onclick = (event) =>{
            event.preventDefault();
            if(this.validData()){
                this.calculate();
                this.results.style.maxHeight = this.results.scrollHeight+'px'
            }
        }
    }

    validData = () => {
        const invalid = "none";
        this.cancelErrors();
        if(this.petSize.value <= 0 || this.petSize.value > 50) {this.petSizeError.innerHTML = this.errorMessages[0]; return false;}
        if(this.petActivity.value === invalid) {this.petActivityError.innerHTML = this.errorMessages[1]; return false;}
        if(this.petAge.value === invalid) {this.petAgeError.innerHTML = this.errorMessages[2]; return false;}
        this.cancelErrors();
        return true;
    }

    cancelErrors(){
        this.petSizeError.innerHTML = "";
        this.petActivityError.innerHTML = "";
        this.petAgeError.innerHTML = "";
    }

    calculate(){
        let portioningPercentage = this.getPortioningPercentage();
        let activityValue = this.getActivityValue();

        let dailyPortion = this.getDailyPortion(portioningPercentage,activityValue);
        let monthlyPortion = this.getMonthlyPortion(dailyPortion);

        let monthlyKilograms = this.getMonthlyKilograms(monthlyPortion);
        let scoopsQuantity = this.getScoopsQuantity(dailyPortion);

        this.portion.innerHTML = dailyPortion;
        this.monthlyServing.innerHTML = monthlyPortion;
        this.foodAmount.innerHTML = `${monthlyKilograms} Kg`;
        this.scoop.innerHTML = scoopsQuantity;
    }

    getMonthlyKilograms(monthlyPortion){
        let kilograms = (monthlyPortion/this.kilogram);
        let decimals = kilograms.toString().split('.');
        if (decimals.length <= 1){
            return kilograms;
        }
        if(decimals[1].length <= 1){
            if(decimals[1] >= 5){
                if(decimals[1] >= 7.5){
                    return parseInt(decimals[0])+1;
                }else{
                    return decimals[0].concat('.',5);
                }
            }else{
                if(decimals[1]>=2.5){
                    return decimals[0].concat('.',5);
                }else{
                    return decimals[0];
                }
            }
        }
        if(decimals[1].length>=2){
            if(decimals[1].substr(0,2) >= 50){
                
                if(decimals[1].substr(0,2) >= 75){
                    
                    return parseInt(decimals[0])+1;
                }else{
                    return decimals[0].concat('.',5);
                }
            }else{
                if(decimals[1].substr(0,2) >=25){
                    return decimals[0].concat('.',5);
                }else{
                    return decimals[0];
                }
            }
        }   
    }

    getScoopsQuantity(dailyPortion){
        let scoopQuantity = (dailyPortion/this.scoops)
        if(scoopQuantity % 1 == 0){
            return scoopQuantity;
        }
        let scoopValues = scoopQuantity.toFixed(2).split('.');

        if(scoopValues[1]>=1 && scoopValues[1]<12.5){
            return scoopQuantity;
        }
        if(scoopValues[1]>=12.5 && scoopValues[1]<25){
            return scoopValues[0]+" 1/4";
        }
        if(scoopValues[1]>=25 && scoopValues[1]<37.5){
            return scoopValues[0]+" 1/4";
        }
        if(scoopValues[1]>=37.5 && scoopValues[1]<50){
            return scoopValues[0]+" 1/2";
        }
        if(scoopValues[1]>=50 && scoopValues[1]<62.5){
            return scoopValues[0]+" 1/2";
        }
        if(scoopValues[1]>=62.5 && scoopValues[1]<75){
            return scoopValues[0]+" 3/4";
        }
        if(scoopValues[1]>=75 && scoopValues[1]<87.5){
            return scoopValues[0]+" 3/4";
        }
        if(scoopValues[1]>=87.5){
            return parseFloat(scoopValues[0])+1;
        }
        
    }



    getDailyPortion = (portioningPercentage,activityValue) => Math.round((activityValue+(this.increment*parseFloat(this.petSize.value)))*portioningPercentage);
    getMonthlyPortion = (dailyPortion) => dailyPortion*this.days;

    getPortioningPercentage(){
        if(this.isBaby()){
            return 2.5;
        }else if(this.isKid()){
            return 1.8;
        }else if(this.isTeenager()){
            return 1;
        }else if(this.isAdult()){
            return 1;
        }
    }

    isBaby = () => this.petAge.value === "Bebe";
    isKid = () => this.petAge.value === "Niño";
    isTeenager = () => this.petAge.value === "Adolescente";
    isAdult = () => this.petAge.value === "Adulto";

    getActivityValue(){
        if(this.lowActivity()){
            return -5;
        }else if(this.normalActivity()){
            return 0;
        }else if(this.highActivity()){
            return 5;
        }
    }

    normalActivity = () => this.petActivity.value === "Normal";
    lowActivity = () => this.petActivity.value === "Bajo";
    highActivity = () => this.petActivity.value === "Alto";

    
    
    constructor(){
        this.getDOM()
        this.initVariables()
        this.handleSubmit()
    }

}

new Calculator;