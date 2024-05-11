class Car {
  color;
  run() {
    console.log('Car is running');
  }
  info() {
    console.log('Color: ' + this.color);
  }
}

const myCar = new Car();
myCar.color = 'red';
myCar.run();
myCar.info();