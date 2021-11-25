const currency = {
  PENNY  : 0.01,
  NICKEL : 0.05,
  DIME   : 0.1,
  QUARTER: 0.25,
  ONE    : 1,
  FIVE   : 5,
  TEN    : 10,
  TWENTY : 20,
  HUNDRED: 100  
};


function checkCashRegister(price, cash, cid) {
  let curKeys = Object.keys(currency);
  curKeys.reverse();
  let change = cash - price;

  //Object to return
  let stat = {status : 'INSUFFICIENT_FUNDS', change: []}
  
  //Calculating total money in the cash register
  let totalChange = cid.reduce((sum, a) => sum + a[1],0).toFixed(2);

  if(totalChange < change){
    return stat;
  }

  else if(change == totalChange){
    stat.status = 'CLOSED';
    stat.change = cid;
    return stat;
  }

  cid.reverse()

  for(let i in cid){

    let ratio = change.toFixed(2)/currency[curKeys[i]];
    let available = Math.floor(ratio)*currency[curKeys[i]];

    if( ratio >= 1){
      if(cid[i][1] >= available){
       change = change.toFixed(2) - available;
        cid[i][1] = available;
        stat.change.push(cid[i]);

      }
      else{
        change = change.toFixed(2)-cid[i][1];
        stat.change.push(cid[i])
      }
    }

    if(change == 0 || (change<0.01 && change>0)){
      stat.status = 'OPEN'
      return stat;
    }

    if(change > 0 && i == cid.length-1)
      stat.change = [];

  }

  return stat;
}

console.log(checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]));