const hash = require("object-hash");

function hashCarData(data) {
  const newObj = {
    vin: data.vin,
    reg: data.reg,
    make: data.make,
    model: data.model,
    year: data.year,
    varaint: data.variant,
    type: data.type,
    fuel: data.fuel,
    drive: data.drive,
  };

  return hash(newObj);
}

module.exports = hashCarData;
