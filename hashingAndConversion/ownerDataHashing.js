const hash = require("object-hash");

function hashOwnerData(data) {
  if (Array.isArray(data)) {
    const newData = data.map((item) => {
      return {
        vin: item.vin,
        reg: item.reg,
        yearPurchased: item.yearPurchased,
        millage: item.millage,
        city: item.city,
        state: item.state,
        ownerName: item.ownerName,
        ownerCNIC: item.ownerCNIC,
        ownerContact: item.ownerContact,
        date: item.date,
      };
    });
    return hash(newData);
  } else {
    const newObj = {
      vin: data.vin,
      reg: data.reg,
      yearPurchased: data.yearPurchased,
      millage: data.millage,
      city: data.city,
      state: data.state,
      ownerName: data.ownerName,
      ownerCNIC: data.ownerCNIC,
      ownerContact: data.ownerContact,
      date: data.date,
    };
    return hash(newObj);
  }
}

module.exports = hashOwnerData;
