// //THE ROMAN NUMERAL CONVERTOR OBJECT
// const roman = {
// 	convert : function(num){
// 		num = num.toString()
// 		let arr_of_nums = num.split("").reverse();
// 		console.log(arr_of_nums);
// 		let romanForm = [];
// 		let keys = Object.keys(this.places);
		
// 		for(let i = 0; i <= arr_of_nums.length; i++){
// 			if (i == 0)
// 				continue;

// 			if(arr_of_nums[i-1] == 0)
// 				continue;
			
// 			romanForm.unshift(this.places[keys[i-1]][arr_of_nums[i-1]-1])

// 		}

// 		return romanForm.join("");
// 	},
	
// 	places : {
// 		ones : ['I', 'II', 'III', 'IV', 'V', 'VI',
// 				'VII', 'VIII', 'IX'],
// 		tens : ['X', 'XX', 'XXX', 'XL', 'L', 'LX',
// 				'LXX', 'LXXX', 'XC'],
// 		hundreds : ['C', 'CC', 'CCC', 'CD', 'D',
// 					'DC', 'DCC', 'DCCC', 'CM'],
// 		thousands: ['M', 'MM', 'MMM',]
// 	}

// 	}


// function convertToRoman(num) {
//  return roman.convert(num);
// }

// console.log(convertToRoman(1004));
