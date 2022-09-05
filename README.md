# placeholder-substitutor

A small library for substitution placeholders in string for Node.js

## API

### Replacing variable placeholders

```js
substitute('My name is ${name} and I am ${age} years old.', {
  name: 'Maxsim',
  age: '25',
});
// My name is Maxsim and I am 25 years old.
```

### Custom placeholders

The placeholder delimiters can be configured through the `'prefix'` and `'suffix'` options:

```js
substitute('%a %b %a %a', (string, { a: 1, b: 2 }, { prefix: '%', suffix: '' });
// 1 2 1 1
```

### Using Interpolation

Use string lookups like: `$.*:`

```js
substitute('Little ${adjective: pigs}! Little ${adjective: pigs}!', {
  adjective: (match: string) => match.toLocaleUpperCase(),
});
// Little PIGS! Little PIGS!
```

### Escape char

By default the escape char is `'\\'` but you can configure it using the `'espace'` option.

```js
substitute('${a} ${b} ##${a} ${a}';
    const expected = '1 2 ${a} 1';
    const result = strSb(string, { a: 1, b: 2 }, { escape: '##' });
```