import { runFile, insp } from '../../helpers/testsHelper';

/**
 * Тестируем поддержку выражение со скобками
 * См. задачу:
 * @see https://fkn.ktu10.com/?q=node/16472
 * 
 */

let pjs = runFile(import.meta.url, 'ParenthesesExpression.code');

test('result = 27', () => {
  expect(pjs.engine.results[0]).toBe(27);
});

test('result = 4', () => {
  expect(pjs.engine.results[1]).toBe(4);
});

test('result = 86', () => {
  expect(pjs.engine.results[2]).toBe(86);
});

test('result = 0', () => {
  expect(pjs.engine.results[3]).toBe(0);
});

