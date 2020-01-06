import 'jest';

import { DSL, Filter } from '../lib';
import { MyType } from './mock';

const _ = DSL.of(MyType);

test('stringProperty = stringLiteral', () => {
  expect(Filter.compile(_.id.equals('value'))).toEqual({
    FilterExpression: '#1=:1',
    ExpressionAttributeNames: {
      '#1': 'id'
    },
    ExpressionAttributeValues: {
      ':1': {
        S: 'value'
      }
    },
  });

});

test('array[index] = stringiteral', () => {
  expect(Filter.compile(_.array.get(0).equals('string'))).toEqual({
    FilterExpression: '#1[:1]=:2',
    ExpressionAttributeNames: {
      '#1': 'array'
    },
    ExpressionAttributeValues: {
      ':1': {
        N: '0'
      },
      ':2': {
        S: 'string'
      }
    },
  });
});

test('struct.field = stringLiteral', () => {
  expect(Filter.compile(_.nested.fields.a.equals('string'))).toEqual({
    FilterExpression: '#1.#2=:1',
    ExpressionAttributeNames: {
      '#1': 'nested',
      '#2': 'a'
    },
    ExpressionAttributeValues: {
      ':1': {
        S: 'string'
      },
    },
  });
});

test('struct.field = array.get(index)', () => {
  expect(Filter.compile(_.nested.fields.a.equals(_.array.get(0)))).toEqual({
    FilterExpression: '#1.#2=#3[:1]',
    ExpressionAttributeNames: {
      '#1': 'nested',
      '#2': 'a',
      '#3': 'array'
    },
    ExpressionAttributeValues: {
      ':1': {
        N: '0'
      },
    },
  });
});
