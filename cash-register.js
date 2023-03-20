function checkCashRegister(price, cash, cid) {
    let currencyObj = {
      PENNY : 0.01, NICKEL : 0.05, DIME : 0.1, QUARTER : 0.25, ONE : 1, FIVE : 5, TEN : 10, TWENTY : 20, "ONE HUNDRED" : 100
    }
    let changeDue = cash - price;
    
    let relevantCurrency = Object.fromEntries(Object.entries(currencyObj).filter((currency) => currency[1] <= changeDue));
  
    let sortedCid = [...cid].sort((a, b) => currencyObj[a[0]] < currencyObj[b[0]] ? 1 : (currencyObj[a[0]] > currencyObj[b[0]] ? -1 : 0))
    .filter((currency) => currency[0] in relevantCurrency);
   
   let cashSum = 0;
   sortedCid.forEach((e) => cashSum+=(e[1]));
  
   if(cashSum == changeDue) return {status: "CLOSED", change: cid }
  
    let obj = {};
    let sum = 0;
   
  for(let i = 0; i < sortedCid.length; i++){
    let currency = sortedCid[i][0];
    let currencyValue = sortedCid[i][1];
    let currencyObjValue = relevantCurrency[currency];
  
    obj[currency] = 0;
    
    while(+(obj[currency] + currencyObjValue).toFixed(2) <= currencyValue && (+(sum + currencyObjValue).toFixed(2) <= changeDue) ){
       
      obj[currency] = +(obj[currency] + currencyObjValue).toFixed(2);
      sum= +(sum + currencyObjValue).toFixed(2);
    }
  }
  
  if(cashSum < changeDue || sum < changeDue) return {status: "INSUFFICIENT_FUNDS", change: [] }
  
  return { status : "OPEN", change : (Object.entries(obj).filter((e) => e[1]))}
  ;
  
  }
  
  console.log(checkCashRegister(3.26, 100, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]])) //=> {status: "OPEN", change: [["TWENTY", 60], ["TEN", 20], ["FIVE", 15], ["ONE", 1], ["QUARTER", 0.5], ["DIME", 0.2], ["PENNY", 0.04]]}
  
   console.log(checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]])) //=> {status: "OPEN", change: [["QUARTER", 0.5]]}
  
  console.log(checkCashRegister(19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 1], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]])) // => {status: "INSUFFICIENT_FUNDS", change: []};
