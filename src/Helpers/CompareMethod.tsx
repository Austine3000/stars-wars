const compareValues = (key: string, order = 'asc') => (a: any, b: any) => {
  if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
    // property doesn't exist on either object
    return 0;
  }

  const varA =
    typeof a[key] === 'string'
      ? a[key].toUpperCase()
      : typeof a[key].getMonth === 'function'
      ? new Date(a[key]).getTime()
      : a[key];

  const varB =
    typeof b[key] === 'string'
      ? b[key].toUpperCase()
      : typeof b[key].getMonth === 'function'
      ? new Date(b[key]).getTime()
      : b[key];

  let comparison = 0;
  if (varA > varB) {
    comparison = 1;
  } else if (varA < varB) {
    comparison = -1;
  }
  return order === 'desc' ? comparison * -1 : comparison;
};

export default compareValues;
