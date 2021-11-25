// const decode = {
//   A : 'N',
//   B : 'O',
//   C : 'P',
//   D : 'Q',
//   E : 'R',
//   F : 'S',
//   G : 'T',
//   H : 'U',
//   I : 'V',
//   J : 'W',
//   K : 'X',
//   L : 'Y',
//   M : 'Z',
//   N : 'A',
//   O : 'B',
//   P : 'C',
//   Q : 'D',
//   R : 'E',
//   S : 'F',
//   T : 'G',
//   U : 'H',
//   V : 'I',
//   W : 'J',
//   X : 'K',
//   Y : 'L',
//   Z : 'M'
// }

// function rot13(str) {
//   let regex = /[A-Z]/;
//   let str_arr = str.split("");

//   for(let i in str_arr){
//     if(!regex.test(str_arr[i]))
//       continue;

//     str_arr[i] = decode[str_arr[i]];
//   }

//   return str_arr.join("");
// }

// console.log(rot13("GUR DHVPX OEBJA SBK WHZCF BIRE GUR YNML QBT."));