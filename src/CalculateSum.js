const extractDelimiter = (input) => {
  let delimiters = [","];
  let numbers = input;

  if (input.startsWith("//")) {
    const delimiterEndIndex = input.indexOf("\n");
    const delimiterToIdentify = input.substring(2, delimiterEndIndex);

    const delimiterMatches = delimiterToIdentify.match(/\[(.*?)\]/g);

    if (delimiterMatches) {
      delimiters = delimiterMatches.map((delim) => delim.slice(1, -1));
    } else {
      delimiters = [delimiterToIdentify];
    }

    numbers = input.substring(delimiterEndIndex + 1);
  }

  return { delimiters, numbers };
};

const add = (input) => {
  if (input === "") return 0;
  const { delimiters, numbers } = extractDelimiter(input);

  const escapedDelimiters = delimiters.map((delim) =>
    delim.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&")
  );

  const delimiterRegex = new RegExp(escapedDelimiters.join("|") + "|\n");

  const numberArray = numbers.split(delimiterRegex);

  const negativeValues = [];
  const sum = numberArray.reduce((acc, curr) => {
    const num = parseInt(curr, 10);
    if (isNaN(num)) return acc;
    if (num < 0) {
      negativeValues.push(num);
    }
    return num > 1000 ? acc : acc + num;
  }, 0);

  if (negativeValues.length > 0) {
    throw new Error(`Negatives not allowed: ${negativeValues.join(", ")}`);
  }

  return sum;
};

module.exports = { add };
