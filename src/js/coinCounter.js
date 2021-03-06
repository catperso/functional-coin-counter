const coin = (coinsize) => {
  return (amount) => {
    return Math.floor(amount / coinsize);
  }
}

const quarter = coin(25);

const dime = coin(10);

const nickel = coin(5);

const penny = coin(1);

// just recursion
const countCoins = (amount) => {
  if (isNaN(amount)) {
    return;
  }
  const recursiveCounter = (remaining, quarters, dimes, nickels) => {
    if (remaining/25>=1) {
      return recursiveCounter(remaining-25, quarters+1, dimes, nickels);
    }
    else if (remaining/10>=1) {
      return recursiveCounter(remaining-10, quarters, dimes+1, nickels);
    }
    else if (remaining/5>=1) {
      return recursiveCounter(remaining-5, quarters, dimes, nickels+1);
    }
    else {
      return `${quarters} quarters, ${dimes} dimes, ${nickels} nickels, ${remaining} pennies.`
    }
  }
  return recursiveCounter(Math.round(amount*100), 0, 0, 0);
}

//closures and recursion
function countCoinsObj(obj) {
  if (isNaN(obj.amount)) {
    return;
  }
  else if (obj.amount >= 25) {
    obj.quarters= quarter(obj.amount);
    obj.amount -= obj.quarters * 25;
    countCoinsObj(obj);
  }
  else if (obj.amount >= 10) {
    obj.dimes = dime(obj.amount);
    obj.amount -= obj.dimes * 10;
    countCoinsObj(obj);
  }
  else if (obj.amount >= 5) {
    obj.nickels = nickel(obj.amount);
    obj.amount -= obj.nickels * 5;
    countCoinsObj(obj);
  }
  else if (obj.amount >= 1)
  {
    obj.pennies = penny(obj.amount);
    obj.amount -= obj.pennies;
    countCoinsObj(obj);
  }
  return `
      Quarters: ${obj.quarters || 0}
      Dimes: ${obj.dimes || 0}
      Nickels: ${obj.nickels || 0}
      Pennies: ${obj.pennies || 0}
    `;
}

//wrapper to use decimal input
const countFromDecimal = (decimalAmount) => countCoinsObj({amount: Math.round(decimalAmount*100)});

//closurs, recursion, NO objects (no state)
function countCoinsNoObj(amount) {
  if (isNaN(amount)) {
    return;
  }
  else if (amount >= 25) {
    const quarters = quarter(amount);
    return `${quarters || 0} quarters, ` + countCoinsNoObj(amount - quarters*25);
  }
  else if (amount >= 10) {
    const dimes = dime(amount);
    return `${dimes || 0} dimes, ` + countCoinsNoObj(amount - dimes*10);
  }
  else if (amount >= 5) {
    const nickels = nickel(amount);
    return `${nickels || 0} nickels, ` + countCoinsNoObj(amount - nickels*5);
  }
  else if (amount >= 1)
  {
    return `and ${amount} pennies.`
  }
}

// wrapper for decimal input
const countCoins = (decimalAmount) => countCoinsNoObj(Math.round(decimalAmount*100));