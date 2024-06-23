const flattenPlatejsData = (data) => {
  let finalResult = '';
  let array = data;
  try {
    array = JSON.parse(data);
  } catch (error) {
    // Do nothing
  }
  array.forEach((item) => {
    if (item.text) {
      finalResult += `${item.text} `;
    }
    if (item.children) {
      finalResult += flattenPlatejsData(item.children);
    }
  });
  return finalResult;
};

module.exports = flattenPlatejsData;
