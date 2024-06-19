# Kodetest

[Edit in StackBlitz next generation editor ⚡️](https://stackblitz.com/~/github.com/Draugsvoll/kodetest)

# Instructions

Run the project with node command containing the 2 inputs.

### node index.js "includeString" "excludeString"

Example 1: <br>
node index.js "1-10" "5-6"

Example 2: <br>
node index.js "1-20,30-40" "10-15,30-33"

# Time Complexity

### ParseRanges() has complexity O(n)

    - rangeStr.split() takes O(n)
    - each operation in .map iteration takes O(1)

### ConsolidateRanges() has complexity O(n logn)

    - Sorting: validRanges.sort((a, b) => a - b) takes O(n logn)
    - The loop iteration performs in constant time O(1)

### Adding & removing to the "rangeMap" has complexity O(n)

### Converting the map-keys to an array has complexity O(p-q) where q is included integers, and q is excluded integers

## Total complexity is O(n log n), because this is the dominant complexity which grows much faster than the others as N increases.
