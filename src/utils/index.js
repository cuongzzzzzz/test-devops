const updateNestedObject = (obj) => {
  const final = {};
  Object.keys(obj).forEach((key) => {
    if (typeof obj[key] === "object") {
      Object.keys(obj[key]).forEach((k) => {
        final[`${key}.${k}`] = obj[key][k];
      });
      updateNestedObject(obj[key]);
    } else {
      final[key] = obj[key];
    }
  });
  return final;
};

const removeNullValueUpdate = (obj) => {
  Object.keys(obj).forEach((key) => {
    if (obj[key] == null || obj[key] == undefined) delete obj[key];
  });
  return obj;
};

function asyncHandler(fn) {
  return (req, res, next) => {
    fn(req, res, next).catch((err) => {
      console.log(err);
    });
  };
}

module.exports = {
  removeNullValueUpdate,
  updateNestedObject,
  asyncHandler,
};
