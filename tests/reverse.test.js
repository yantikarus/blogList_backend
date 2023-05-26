//import the function and assign it as variable name reverse
const reverse = require('../utils/for_testing').reverse

test('reverse of a', () => {
    const result = reverse('a')
    expect(result).toBe('a')
})

test('reverse of react', () => {
    const result = reverse('react')
    expect(result).toBe('tcaer')
})

test('reverse of releveler', () => {
    const result = reverse('releveler')
    expect(result).toBe('releveler')
})

//open terminal and run the command npm test -- -t "reverse" this is to run only the test that maching with keyword reverse