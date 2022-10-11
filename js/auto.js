
var nextId = 1;

class auto {

    constructor(marca, modelo, matricula) {
        this.id = nextId++;
        this.marca = marca;
        this.modelo = modelo;
        this.matricula = matricula;
    }

    isEmpty(){
        return (this.marca == '' || this.marca == '' || this.matricula == '');
    }
    
  }
