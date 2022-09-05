import strSb from '../src/index';

describe('substitute tests', function () {
  it('inserts scalar constiables in a string', function () {
    const string = 'Little ${adjective}! Little ${adjective}!';
    const expected = 'Little pigs! Little pigs!';
    const result = strSb(string, { adjective: 'pigs' });
    expect(result).toBe(expected);
  });

  it('inserts object constiables supporting `__toString()` in a string', function () {
    const string = 'Then I\'ll ${type}.';
    const expected = 'Then I\'ll huff.';

    const stub = {};
    stub.toString = function () {
      return 'huff';
    };
    const result = strSb(string, { type: stub });
    expect(result).toBe(expected);
  })

  it('inserts object constiables interpolate function', function () {
    const string = 'Little ${adjective: pigs}! Little ${adjective: pigs}!';
    const expected = 'Little PIGS! Little PIGS!';
    const result = strSb(string, { "adjective:" : (match: string) => match.toLocaleUpperCase() });
    expect(result).toBe(expected);
  });

  it('inserts a constiable as many time as it exists a placeholder', function () {
    const string = '${a} ${b} ${a} ${a}';
    const expected = '1 2 1 1';
    const result = strSb(string, { a: 1, b: 2 });
    expect(result).toBe(expected);
  });

  it('inserts a constiable with custom placeholder', function () {
    const string = '%a %b %a %a';
    const expected = '1 2 1 1';
    const result = strSb(string, { a: 1, b: 2 }, { prefix: '%', suffix: '' });
    expect(result).toBe(expected);
  });

  it('escapes escaped placeholder', function () {
    const string = '${a} ${b} ##${a} ${a}';
    const expected = '1 2 ${a} 1';
    const result = strSb(string, { a: 1, b: 2 }, { escape: '##' });
    expect(result).toBe(expected);
  });
});
