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

const colors = ["#155ded",
				"#5c8ded",
				"#87a9ed",
				"#aac2f2",
				"#ddfc9a",
				"#e6935c",
				"#e09e72",
				"#de6312",
				"#ed2f2f"
				]

const ranges = ["&#8592;2.3",
				"2.4&harr;4.3",
				"4.4&harr;6.3",
				"6.4&harr;8.0",
				"8.1&harr;8.6",
				"8.7&harr;9.6",
				"9.7&harr;10.6",
				"10.6&harr;11.3",
				"11.3&#8594;"
				]

//Tooltip
const tooltip = d3.select('#tooltip');

//container width and height and padding
const c_width = 1200;
const c_height = 600;
const padding = 70;


//Creating svg container
const svgContainer = d3.select('#heat-map')
  						.append('svg')
  						.attr('width', c_width)
  						.attr('height', c_height);


const legend = d3.select("#heat-map")
				.append('svg')
				.attr('width', 540)
				.attr('height', 50)
				.attr('id', 'legend')

legend.selectAll('rect')
	.data(colors)
	.enter()
	.append('rect')
	.attr('width', 60)
	.attr('height', 50)
	.attr('x', (d,i) => i*60)
	.attr('y', 0)
	.attr('fill', d => d)

legend.selectAll('text')
		.data(ranges)
		.enter()
		.append('text')
		.attr('x', (d,i) => i*60)
		.attr('y', 25)
		.style('font-size', 13 + 'px')
		.html((d,i) => {
			if(i == 0 || i == ranges.length-1){
				return " &nbsp; &nbsp; "+ d;
			}
			else
				return " &nbsp"+d;
		})



//Getting data and creating rest of heat map
fetch('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json')
		.then(data => data.json())
		.then(map_data => {
			

			let baseTemp = map_data.baseTemperature

			let monthlyVariances = map_data.monthlyVariance;

			//Rectangle width and height
			let r_height = (c_height-2*padding)/12
			let r_width = (c_width-(2*padding))/(monthlyVariances.length/12);

			let latestYear = d3.max(monthlyVariances, d => d.year)
			let earliestYear = d3.min(monthlyVariances, d => d.year)

//Adding title and description
svgContainer.append('text')
			.attr('id', 'title')
			.attr('x', c_width/2-350)
			.attr('y', 30)
			.text((d) => {
				return 'Monthly Global Land-Surface Temperatures, ' + earliestYear + '-' + latestYear
			})

svgContainer.append('text')
			.attr('id', 'description')
			.attr('x', c_width/2-150)
			.attr('y', 50)
			.html((d) =>{
				return "Base Temperature : " + baseTemp + "&deg;C";
			})

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
						.attr('class', 'cell')
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
						.attr('data-month', d => d.month-1)
						.attr('data-year', d => d.year)
						.attr('data-temp', d => (baseTemp + d.variance))
						.on('mouseover', (event, d) =>{
							let top = yScale(d.month) - r_height/2;
							let left = xScale(d.year)
							

							tooltip.html(
								"<p>" + months[d.month] + "-" + d.year + "</p>"+
								"<p>" + (baseTemp + d.variance).toFixed(3) + "&deg;C</p>"+
								"<p>&#916; " + (d.variance).toFixed(3) + "</p>"
								)
									.attr('data-year', d.year)
									.style('left', left + "px")
									.style('top', top + "px")
									.style("opacity", 0.9);
						})
						.on('mouseout', (event, d) => {
							tooltip.style("opacity", 0);
						})

		})
