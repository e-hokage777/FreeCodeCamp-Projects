const containerWidth = 1000;
const containerHeight = 600;

const tooltip = d3.select("#us-gdp")
				  .append('div')
				  .attr('id', 'tooltip')

const svgContainer = d3.select("#us-gdp")
						.append('svg')
						.attr('width', containerWidth)
						.attr('height', containerHeight);



fetch("https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json")
	.then(response => response.json())
	.then(graph_data => {

		let maxGDP = d3.max(graph_data.data, (d) => d[1]);
		let minGDP = d3.min(graph_data.data, (d) => d[1]);

		//Titles
		svgContainer.append('text')
					.attr('x', containerWidth/2 - 80)
					.attr('y', 30)
					.attr('id', 'title')
					.attr('fill', '#082045')
					.text("United States GDP");

		svgContainer.append('text')
					.text('Gross Domestic Product')
					.attr('transform', 'rotate(-90)')
					.attr('class', 'axis-description')
					.attr('x', -350)
					.attr('y', 70);

		svgContainer.append('text')
					.text('Years')
					.attr('x', containerWidth/2)
					.attr('y', containerHeight-7)
					.attr('class', 'axis-description');

		//Formatting the years
		let years = graph_data.data.map((d) => new Date(d[0]))


		//Padding
		let padding = 40;

		//Setting up scales
		const scaleHeight = d3.scaleLinear()
						 .domain([0,maxGDP])
						 .range([0, containerHeight- 2*padding]);

		const scaleY = d3.scaleLinear()
						 .domain([0, maxGDP])
						 .range([containerHeight-padding, padding])


		const scaleX = d3.scaleTime()
						 .domain([d3.min(years), d3.max(years)])
						 .range([padding, 971.6]);

		console.log(new Date(d3.max(graph_data.data, (d) => d[0])))

		//Drawing rectangles
		svgContainer.selectAll('rect')
					.data(graph_data.data)
					.enter()
					.append('rect')
					.attr('class', 'bar')
					.attr('width', '3.3')
					.attr('height', d => scaleHeight(d[1]))
					.attr('x', (d, i) => i*3.4+padding)
					.attr('y', (d) => containerHeight -padding- scaleHeight(d[1]))
					.attr('data-date', (d) => d[0])
					.attr('data-gdp', (d) => d[1])
					.attr('index', (d,i) => i)
					.on('mouseover', function(event, d){
						
						//x-pos of tooltip
						var xPos = this.getAttribute('index')*3.4 + padding

						tooltip.style('left', xPos + "px")
							   .style('top', containerHeight - 100 + "px")
							   .style('visibility', 'visible')
							   .attr('data-date', d[0])
							   .attr('data-gdp', d[1])
							   .style('opacity', 0.9)
							   .html('Date: ' + d[0] + "<br>" + "GDP: $" + d[1] + "m")
					})
					.on('mouseout', function(){
						tooltip.style('visibility', 'hidden')
								.style('opacity', 0)
					})

		//Creating axes
		let yAxis = d3.axisLeft(scaleY);
		let xAxis = d3.axisBottom(scaleX)

		//Calling axis onto graph
		svgContainer.append('g')
					.attr('transform', 'translate('+padding + ",0)")
					.attr('id', 'y-axis')
					.call(yAxis);

		svgContainer.append('g')
					.attr('transform', 'translate(0, '+(containerHeight-padding) + ")")
					.attr('id', 'x-axis')
					.call(xAxis);

	});