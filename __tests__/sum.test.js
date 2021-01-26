import sum from '../src/js/testbed/sum';

test('adds 1 + 2 to equal 3', () => {
  expect(sum.sumMothod(1, 2)).toBe(3);
});