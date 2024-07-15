import { transferEarthquakeData } from '../src/transferFunctions';

global.fetch = jest.fn(() =>
    Promise.resolve({
        json: () => Promise.resolve({
            features: [{
                properties: {
                    place: '',  // Point of interest 1
                    time: 1     // Point of interest 2
                },
                id: 'anId'      // Point of interest 3
            }]
        }),
    }),
) as jest.Mock;

describe('testing transferFunctions', () => {
    test('empty string should result in zero', () => {

        return transferEarthquakeData('', '')
            .then(data => expect(data).toEqual({
                features: [{
                    properties: {
                        place: '',  // Point of interest 1
                        time: 1     // Point of interest 2
                    },
                    id: 'anId'      // Point of interest 3
                }]
            }));
    });
});
