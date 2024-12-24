// 1-masala
function getArrayLength<T>(array: T[]): number {
    return array.length;
}

console.log(getArrayLength([1, 2, 3]));
console.log(getArrayLength(['a', 'b', 'c']));

// 2-masala
let holat: 'start' | 'stop';

holat = 'start';
console.log(holat);

holat = 'stop';
console.log(holat);


// 3-masala
interface Dog {
    bark: boolean;
}

interface Cat {
    meow: boolean;
}

type Pet = Dog & Cat;

const myPet: Pet = {
    bark: true,
    meow: false
};

console.log(myPet);

// 4-masala
function processValue(value: string | number): string | number {
    if (typeof value === 'string') {
        return value.toUpperCase();
    } else {
        return value ** 2;
    }
}

console.log(processValue('hello'));
console.log(processValue(5));

// 5-masala
class Car {
    brand: string;
    year: number;

    constructor(brand: string, year: number) {
        this.brand = brand;
        this.year = year;
    }
}

const myCar = new Car('Toyota', 2022);
console.log(myCar);

// 6-masala
interface Product {
    name: string;
    price?: number;
    readonly id: number;
}

const myProduct: Product = {
    name: 'Smartphone',
    id: 1
};

console.log(myProduct);

// 7-masala
const userInfo: [number, string] = [16, "Abduqodir"];

console.log(userInfo[0]);
console.log(userInfo[1]); 



