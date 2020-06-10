const hash = require("object-hash");

function hashServiceData(data) {
  if (Array.isArray(data)) {
    const newData = data.map((item) => {
      let ObjToReturn = {
        vin: item.vin,
        reg: item.reg,
        millage: item.millage,
        date: item.date,
        comments: item.comments,
      };
      if (item.sparePart1) {
        ObjToReturn.sparePart1 = item.sparePart1;
      }
      if (item.sparePart2) {
        ObjToReturn.sparePart2 = item.sparePart2;
      }
      if (item.sparePart3) {
        ObjToReturn.sparePart3 = item.sparePart3;
      }
      return ObjToReturn;
    });

    return hash(newData);
  } else {
    const newObj = {
      vin: data.vin,
      reg: data.reg,
      millage: data.millage,
      date: data.date,
      comments: data.comments,
    };
    if (data.sparePart1) {
      newObj.sparePart1 = data.sparePart1;
    }
    if (data.sparePart2) {
      newObj.sparePart2 = data.sparePart2;
    }
    if (data.sparePart3) {
      newObj.sparePart3 = data.sparePart3;
    }
    return hash(newObj);
  }
}

module.exports = hashServiceData;
