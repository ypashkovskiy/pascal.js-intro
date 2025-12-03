import { runFile, insp } from '../../helpers/testsHelper';

/**
 * Тестируем поддержку переменных
 *
 * 
 */

let pjs = runFile(import.meta.url, 'Variebles.code');

test('result = 20', () => {
  expect(pjs.engine.results[0]).toBe(20);
});

test('result = 2', () => {
  expect(pjs.engine.results[1]).toBe(2);
});

test('result = 22', () => {
  expect(pjs.engine.results[2]).toBe(22);
});

test('result = 44', () => {
  expect(pjs.engine.results[3]).toBe(44);
});

test('result = 5', () => {
  expect(pjs.engine.results[4]).toBe(5);
});

test('result = 5', () => {
  expect(pjs.engine.results[5]).toBe(5);
});