/**
 * API Generator file for json-server, uses Faker for data and Lodash for ease
 * Created by chris on 08/03/2017.
 */

const faker = require('faker');
const _     = require('lodash');

module.exports = () => {
    return {
        config: {
            title: faker.company.companyName(),
            strap: faker.company.catchPhrase()
        },
        users: _.times(50, (n) => {
            return {
                id:         n,
                firstName:  faker.name.firstName(),
                lastName:   faker.name.lastName(),
                avatar:     faker.image.avatar()
            }
        })
    };
};