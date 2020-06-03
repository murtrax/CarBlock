const hash = require("object-hash");

function hashAccidentData(data) {
  if (Array.isArray(data)) {
    const newData = data.map((item) => {
      return {
        vin: item.vin,
        reg: item.reg,
        millage: item.millage,
        date: item.date,
        comments: item.comments,
      };
    });
    //console.log(newData);
    return hash(newData);
  } else {
    const newObj = {
      vin: data.vin,
      reg: data.reg,
      millage: data.millage,
      date: data.date,
      comments: data.comments,
    };
    return hash(newObj);
  }
}

module.exports = hashAccidentData;
