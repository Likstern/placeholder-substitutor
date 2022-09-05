interface IOptions {
  prefix?: string;
  suffix?: string;
  escape?: string;
}

export = function substitute(
  str: string,
  placeholders: any,
  options?: IOptions
): string {
  options = options ?? {};

  let keys = Object.keys(placeholders);
  const len = keys.length;

  if (!len) {
    return str;
  }

  const interpolators = keys.filter((item: string) => item.match('^.*:$'));
  keys = keys.filter((item) => !interpolators.includes(item));

  const prefix = options.prefix ?? '${';
  const after = options.suffix ?? '}';
  const escape = options.escape ?? '\\';

  const cacheEescape = replaceEscape(escape);
  const cacheBefore = replaceEscape(prefix);
  const cacheAfter = replaceEscape(after);

  const begin = escape ? '(' + cacheEescape + ')?' + cacheBefore : cacheBefore;
  const end = cacheAfter;

  for (let i = 0; i < len; i++) {
    const placeholder = keys[i];
    str = str.replace(
      new RegExp(begin + String(placeholder) + end, 'g'),
      function (match, behind) {
        return behind ? match : String(placeholders[placeholder]);
      }
    );
  }

  for (let i = 0; i < interpolators.length; i++) {
    const placeholder = interpolators[i];
    str = str.replace(
      new RegExp(begin + String(placeholder) + '.*?' + end, 'g'),
      function (match) {
        return placeholders[placeholder](
          match
            .replace(new RegExp(begin + String(placeholder), 'g'), '')
            .replaceAll(new RegExp(end, 'g'), '')
            .trim()
        );
      }
    );
  }

  if (escape) {
    str = str.replace(
      new RegExp(replaceEscape(escape) + replaceEscape(prefix), 'g'),
      prefix
    );
  }
  return str;
}

function replaceEscape(str: string): string {
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
}
