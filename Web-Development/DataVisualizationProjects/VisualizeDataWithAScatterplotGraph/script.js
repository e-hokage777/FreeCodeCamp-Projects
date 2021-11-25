//Svg container width and height
const c_width = 1000;
const c_height = 700;

//The svg container
const svgContainer = d3.select("#scatter-plot")
					   .append("svg")
					   .attr("width", c_width)
					   .attr("height", c_height);

//The tooltip
const tooltip = d3.select("#tooltip");

//padding
const padding = 50;

//Adding the title
svgContainer.append('text')
			.attr('x', c_width/2 - 200)
			.attr('y', 40)
			.attr('id', 'title')
			.text("Doping in Professional Biycle Racing")

svgContainer.append('text')
			.style('transform', 'rotate(-90deg)')
			.attr('y', 12)
			.attr('x', -c_height/2)
			.attr('fill', 'blue')
			.text("Time (mm:ss)")


const request = new XMLHttpRequest();
request.open("GET", "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json");
request.send();
request.onload = function(){
	const data = JSON.parse(request.responseText);
	
	//Getting the max and min values
	let latestYear = d3.max(data, d => d.Year);
	let earliestYear = d3.min(data, d => d.Year);

	let latestTime = d3.max(data, d => new Date(d.Seconds*1000));
	let earliestTime = d3.min(data, d=> new Date(d.Seconds*1000))



	//Creating scales
	let xScale = d3.scaleLinear()
				   .domain([earliestYear-1, latestYear+1])
				   .range([padding, c_width-padding])


	let yScale = d3.scaleTime()
				   .domain([earliestTime, latestTime])
				   .range([c_height-padding, padding])
				   .nice();

	let tooltipYScale = d3.scaleLinear()
						  .domain([earliestTime.getTime(), latestTime.getTime()])
						  .range([c_height-padding, padding])
						  .nice();

	//Adding the axes
	let xAxis = d3.axisBottom(xScale).tickFormat(d3.format("d"));
	let yAxis = d3.axisLeft(yScale).tickFormat(d3.timeFormat("%M:%S"));


	//Calling the axes on the svg container
	svgContainer.append('g')
				.attr('transform', 'translate(0,' + (c_height - padding) +")")
				.attr('id', 'x-axis')
				.call(xAxis);

	svgContainer.append('g')
				.attr('transform', 'translate('+ padding + ',0)')
				.attr('id', 'y-axis')
				.call(yAxis);


	//Creating the dots
	svgContainer.selectAll('circle')
				.data(data)
				.enter()
				.append('circle')
				.attr('r', 7)
				.attr('cx', d => xScale(d.Year))
				.attr('cy', d => yScale(new Date(d.Seconds*1000)))
				.attr('data-xvalue', d => d.Year)
				.attr('data-yvalue', d => new Date(d.Seconds*1000))
				.attr('stroke', 'black')
				.attr('fill', d => {
					if(d.Doping.length > 1)
						return '#0ba7db'
					else
						return '#db920b'
				})
				.attr('class', 'dot')
				.on('mouseover', (event, d)=> {
					let dataYear = d.Year;
					let dataTime = d.Time;
					let dataSeconds = d.Seconds;
					let dopingInfo = d.Doping.length < 1? "No Doping Allegation" : d.Doping;
					let rider = d.Name;
					let finishPlace = d.Place;

					console.log(tooltipYScale(dataSeconds*1000))
					console.log(dataSeconds);

					tooltip.attr('data-year', dataYear)
						   .attr('data-xvalue', dataTime)
						   .style('left', xScale(dataYear) + 'px')
						   .style('top', tooltipYScale(dataSeconds*1000) + 'px')
						   .style('opacity', 1)
						   .style('transition', 'opacity 0.5s')
						   .html("<p>Rider: &nbsp; "+ rider + "</p>"+
						   "<p>Finished: " + finishPlace + "th</p>"+
						   "<p>Time: &nbsp; "+ dataTime + "</p>"+
						   "<p>Year: &nbsp; " + dataYear + "</p>"+
						   "<p>"+ dopingInfo + "</p>")
				})
				.on('mouseout', (event, d)=>{
					tooltip.style('opacity',0)
				})



}