/* eslint-disable prettier/prettier */
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    roots: ['./unit'],
    testRegex: '\\.spec\\.ts$',
    moduleFileExtensions: ['js', 'json', 'ts'],
    transform: {
      '^.+\\.(t|j)s$': 'ts-jest',
    },
};