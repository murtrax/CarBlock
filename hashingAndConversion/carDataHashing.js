const hash = require("object-hash");

function hashCarData(data) {
  if (!data.variant) data.variant = "";
  const newObj = {
    vin: data.vin,
    reg: data.reg,
    make: data.make,
    model: data.model,
    year: data.year,
    variant: data.variant,
    type: data.type,
    fuel: data.fuel,
    drive: data.drive,
  };
  return hash(newObj);
}

module.exports = hashCarData;
