const hash = require("object-hash");

function addToOwnerHistory(data, obj) {
  if (Array.isArray(data)) {
    let newData = data.map((item) => {
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
    newData.push(obj);

    return hash(newData);
  } else {
    let newData = [];
    let validData = {
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

    newData.push(validData);
    newData.push(obj);

    return hash(newData);
  }
}

module.exports = addToOwnerHistory;
