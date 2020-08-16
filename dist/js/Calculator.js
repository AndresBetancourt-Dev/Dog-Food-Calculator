class Calculator{

    getDOM(){
        this.petSize = document.querySelector('#petSize');
        this.petSizeError = document.querySelector('#petSize-error')
        this.petActivity = document.querySelector('#petActivity');
        this.petActivityError = document.querySelector('#petActivity-error')
        this.petAge = document.querySelector('#petAge');
        this.petAgeError = document.querySelector('#petAge-error')
        this.results = document.querySelector('.Calculator__results');
        this.petButton = document.querySelector('.Calculator__button');  
    }

    initVariables(){
        this.errorMessages = [
            "¡Error! No se seleccionó el tamaño.",
            "¡Error! No se seleccionó la actividad.",
            "!Error! No se seleccionó la edad."
        ]
        this.scoops = 35;
        this.days = 30;
    }

    handleSubmit(){
        this.petButton.onclick = (event) =>{
            event.preventDefault()
            if(this.isNotEmpty()){
                this.calculate()
            }
            /*
            if(this.petSize.value === "Pequeño" && this.petAge.value === "Senior"){
                this.petButton.classList.toggle('success');
                if(this.petButton.classList.contains('success')){
                    this.results.style.maxHeight = this.results.scrollHeight+'px'
                }
            }*/
        }
    }

    isNotEmpty = () => {
        const empty = "none";
        this.cancelErrors();
        if(this.petSize.value === empty) {this.petSizeError.innerHTML = this.errorMessages[0]; return false;}
        if(this.petActivity.value === empty) {this.petActivityError.innerHTML = this.errorMessages[1]; return false;}
        if(this.petAge.value === empty) {this.petAgeError.innerHTML = this.errorMessages[2]; return false;}
        this.cancelErrors();
        return true;
    }

    cancelErrors(){
        this.petSizeError.innerHTML = "";
        this.petActivityError.innerHTML = "";
        this.petAgeError.innerHTML = "";
    }

    calculate(){
    }
    
    constructor(){
        this.getDOM()
        this.initVariables()
        this.handleSubmit()
    }

    
    
}

new Calculator;