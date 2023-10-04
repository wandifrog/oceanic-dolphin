import { capitalizeEveryWord } from 'functions/Common.function';

test('capitalizeEveryWord return correctly', () => {
  expect(capitalizeEveryWord('batu ampar condet')).toBe('Batu Ampar Condet');
  expect(capitalizeEveryWord(' hellooo ')).toBe('Hellooo');
  expect(capitalizeEveryWord(' haha - hehe ')).toBe('Haha Hehe');
});
