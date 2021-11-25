//Months
const months = ['',
				'January',
			 	'February',
			 	'March',
			 	'April',
			 	'May',
			 	'June',
			 	'July',
			 	'August',
			 	'September',
			 	'October',
			 	'November',
			 	'December',
			 	'']

//container width and height and padding
const c_width = 1200;
const c_height = 600;
const padding = 70;


//Creating svg container
const svgContainer = d3.select('#heat-map')
  						.append('svg')
  						.attr('width', c_width)
  						.attr('height', c_height);


// //Adding title and description
// svgContainer.append('text')
// 			.attr('id', 'title')
// 			.attr('x', '')


//Getting data and creating rest of heat map
fetch('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json')
		.then(data => data.json())
		.then(map_data => {
			console.log(map_data)

			let baseTemp = map_data.baseTemperature

			let monthlyVariances = map_data.monthlyVariance;
			console.log(d3.max(monthlyVariances, (d) => d.variance))

			//Rectangle width and height
			let r_height = (c_height-2*padding)/12
			let r_width = (c_width-(2*padding))/(monthlyVariances.length/12);

			let latestYear = d3.max(monthlyVariances, d => d.year)
			let earliestYear = d3.min(monthlyVariances, d => d.year)

			console.log(earliestYear, latestYear)

			//Creating scales
			let xScale = d3.scaleLinear()
							.domain([earliestYear, latestYear])
							.range([padding, c_width-padding])

			let yScale = d3.scaleLinear()
							.domain([0.5,12.5])
							.range([padding, c_height-padding])


			//Creating axes
			let xAxis = d3.axisBottom(xScale).tickFormat(d3.format('d'));
			let yAxis = d3.axisLeft(yScale).tickFormat(i => months[i])


			//Calling the axes
			svgContainer.append('g')
						.attr('transform', 'translate(0, ' + (c_height-padding)+ ')')
						.attr('id', 'x-axis')
						.call(xAxis);

			svgContainer.append('g')
						.attr('transform', 'translate('+padding +',0)')
						.attr('id', 'y-axis')
						.call(yAxis);


			//Adding rectangles
			svgContainer.selectAll('rect')
						.data(monthlyVariances)
						.enter()
						.append('rect')
						.attr('height', r_height)
						.attr('width', r_width)
						.attr('y', d => (yScale(d.month) - r_height/2))
						.attr('x', (d,i) => xScale(d.year))
						.attr('fill', (d) => {
							let temp = baseTemp + d.variance;
							if(temp <= 2.3)
								return "#155ded";
							else if(temp > 2.3 && temp <= 4.3)
								return "#5c8ded";
							else if(temp > 4.3 && temp <= 6.3)
								return "#87a9ed";
							else if(temp > 6.3 && temp <= 8.0)
								return "#aac2f2";
							else if(temp > 8.0 && temp <= 8.6)
								return "#ddfc9a";
							else if(temp > 8.6 && temp <= 9.6)
								return "#e6935c";
							else if(temp > 9.6 && temp <= 10.6)
								return "#e09e72";
							else if (temp > 10.6 && temp <= 11.3)
								return "#de6312";
							else
								return "#ed2f2f";

						})

		})
