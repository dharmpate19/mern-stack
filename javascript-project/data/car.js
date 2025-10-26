class Car {
    #brand;
    #model;
    speed = 0;
    isTrunkOpen;

    constructor(productDetails) {
        this.#brand = productDetails.brand;
        this.#model = productDetails.model;
    }

    go(){
        if(this.isTrunkOpen === true){
            return 'Trunk is open car can not move';
        }
        if(this.speed >= 200){
            return this.speed = 200;
        }
        return this.speed += 5;
    }

    break(){
        if(this.speed <= 0){
            return this.speed = 0;
        }
        return this.speed -= 5;
    }

    openTrunk(){
        if(this.speed >= 1){
            return 'Car is moving trunk can not be open';
        }
        return this.isTrunkOpen = true;
    }

    closeTrunk(){
        return this.isTrunkOpen = false;
    }

    displayInfo() {

        const trunkStatus = this.isTrunkOpen ? 'Open' : 'Close';
        return `${this.#brand} ${this.#model}, speed : ${this.speed} km/h, Trunk : ${trunkStatus}`;
    }
}

class RaceCar extends Car{
    acceleration = 300;

    constructor(carDetails){
        super(carDetails);
        this.acceleration = carDetails.acceleration
    }

    go(){
        this.speed += this.acceleration;
        if(this.speed > 300){
            this.speed = 300;
        }

        return this.speed;
    }
}

const car1= new Car({
    brand: 'Toyota',
    model: 'Corolla'
})

const car2= new Car({
    brand: 'Tesla',
    model: 'Model 3'
})

const carAccelerated = new RaceCar({
    brand: 'McLeren',
    model: 'F1',
    acceleration: 20
})
console.log(carAccelerated.go())
console.log(carAccelerated.displayInfo())


