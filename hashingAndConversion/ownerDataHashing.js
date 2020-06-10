const hash = require("object-hash");

function hashOwnerData(data) {
  if (Array.isArray(data)) {
    const newData = data.map((item) => {
      return {
        vin: item.vin,
        reg: item.reg,
        yearPurchased: item.yearPurchased.toString(),
        millage: item.millage,
        city: item.city,
        state: item.state,
        ownerName: item.ownerName,
        ownerCNIC: item.ownerCNIC,
        ownerContact: item.ownerContact,
        date: item.date,
      };
    });
    /*console.log("owner hashing file if array:");
    console.log(newData);
    console.log("\n " + hash(newData));*/
    return hash(newData);
  } else {
    const newObj = {
      vin: data.vin,
      reg: data.reg,
      yearPurchased: data.yearPurchased.toString(),
      millage: data.millage,
      city: data.city,
      state: data.state,
      ownerName: data.ownerName,
      ownerCNIC: data.ownerCNIC,
      ownerContact: data.ownerContact,
      date: data.date,
    };
    const newObjArray = [];
    newObjArray.push(newObj);
    /*console.log("owner hashing file if object:");
    console.log(newObjArray);
    console.log("\n " + hash(newObjArray));*/
    return hash(newObjArray);
  }
}

module.exports = hashOwnerData;
