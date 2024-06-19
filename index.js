// Turn string input into an array of objects which contains each ranges start/end numbers.
function parseRanges(rangesStr) {
  return rangesStr.split(',').map((range) => {
    const [start, end] = range.split('-').map(Number);
    return { start, end };
  });
}

// Function to consolidate valid ranges into a formatted string
function consolidateRanges(validRanges) {
  if (validRanges.length === 0) {
    return '';
  }

  // Sort the ranges to ensure correct consolidation
  validRanges.sort((a, b) => a - b);

  let result = '';
  let currentStart = validRanges[0];
  let currentEnd = validRanges[0];

  // format the output, seperate new range with ","
  for (let i = 1; i < validRanges.length; i++) {
    if (validRanges[i] === currentEnd + 1) {
      currentEnd = validRanges[i];
    } else {
      if (result !== '') {
        result += ', ';
      }
      result +=
        currentStart === currentEnd
          ? `${currentStart}`
          : `${currentStart}-${currentEnd}`;
      currentStart = validRanges[i];
      currentEnd = validRanges[i];
    }
  }

  // Add the last range
  if (result !== '') {
    result += ', ';
  }
  result +=
    currentStart === currentEnd
      ? `${currentStart}`
      : `${currentStart}-${currentEnd}`;

  return result;
}

// Get arguments/inputs
const args = process.argv.slice(2);

if (args.length !== 2) {
  console.error(
    'Please provide exactly two inputs: includeRanges and excludeRanges.'
  );
  process.exit(1);
}

const include = args[0];
const exclude = args[1];
const rangeMap = new Map();

// Parse include and exclude ranges
const includeRanges = parseRanges(include);
const excludeRanges = parseRanges(exclude);

// Add all numbers in the include ranges to the map
includeRanges.forEach(({ start, end }) => {
  for (let i = start; i <= end; i++) {
    rangeMap.set(i, true);
  }
});

// Remove all numbers in the exclude ranges from the map
excludeRanges.forEach(({ start, end }) => {
  for (let i = start; i <= end; i++) {
    rangeMap.delete(i);
  }
});

// Convert the map-keys(ranges of numbers) to an array
const validRanges = Array.from(rangeMap.keys());
const formattedRanges = consolidateRanges(validRanges);

console.log(`Valid integers range: ${formattedRanges}`);
