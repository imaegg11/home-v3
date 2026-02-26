// Chatgpt my beloved (I couldn't be bothered to write one)
export function haveSameTypes(obj1, obj2) {
  // Check if both are arrays
  if (Array.isArray(obj1) && Array.isArray(obj2)) {
    // Compare types element-wise for the minimum length
    const minLength = Math.min(obj1.length, obj2.length);
    for (let i = 0; i < minLength; i++) {
      if (!haveSameTypes(obj1[i], obj2[i])) {
        return false;
      }
    }
    return true; // Arrays of different lengths are fine as long as common elements match
  }

  // Check if both are objects (and not null)
  if (
    obj1 && obj2 &&
    typeof obj1 === "object" &&
    typeof obj2 === "object" &&
    !Array.isArray(obj1) &&
    !Array.isArray(obj2)
  ) {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    // Compare common keys
    const commonKeys = keys1.filter(key => keys2.includes(key));
    for (let key of commonKeys) {
      if (!haveSameTypes(obj1[key], obj2[key])) {
        return false;
      }
    }
    return true; // Extra keys are ignored
  }

  // Base case: compare types directly
  return typeof obj1 === typeof obj2;
}