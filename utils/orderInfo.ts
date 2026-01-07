import { faker } from '@faker-js/faker';

export const name = faker.person.fullName();
export const country = faker.location.country();
export const city = faker.location.city();
export const creditCard = faker.finance.creditCardNumber();
export const month = faker.date.month();
export const year = (faker.number.int({ min: 2025, max: 2035 })).toString();
