//svg container with and height
const c_width = 1000;
const c_height = 700;

//Creating the tooltip
const tooltip = d3.select('body').append('div')
				.attr('id', 'tooltip')


//Svg container goes here
const svgContainer = d3.select('body')
						.append('svg')
						.attr('width', c_width)
						.attr('height', c_height)

const path = d3.geoPath();

//Creating title and decription
const title_desc= svgContainer.append('g');

title_desc.append('text')
			.attr('id', 'title')
			.attr('x', c_width/2 - 300)
			.attr('y', 30)
			.text('United State Education Attainment')

title_desc.	append('text')
			.attr('id', 'description')
			.attr('x', c_width/2- 360)
			.attr('y', 50)
			.text("Percentage of adults age 25 and older with a bachelor's degree or higher (2010-2014)")

//Defining colors
const colors = d3.scaleThreshold()
				 .domain(d3.range(2.0,77.0,(77-2.0)/8))
				 .range(d3.schemeBlues[9]);

				 console.log(d3.range(2.0,77.0,(76-2.0)/8))
				 console.log(d3.schemeBlues[8])
				 console.log(colors(1.9))


Promise.all([fetch('https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json'),
			 fetch('https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json')]) 
		.then(responses => Promise.all(responses.map(response => response.json())))
		.then(data => {
			const topography = data[0]; 
			const edu_data = data[1];


			svgContainer.append('g')
						.attr('transform', 'translate(0,50)')
						.selectAll('path')
						.data(topojson.feature(topography,topography.objects.counties).features)
						.enter()
						.append('path')
						.attr('class', 'county')
						.attr('d', feature => path(feature))
						.attr('data-fips', feature => feature.id)
						.attr('data-education', feature =>{
							return edu_data.filter(d => d.fips == feature.id)[0].bachelorsOrHigher;
						})
						.attr('fill', function(d){ return colors(this.getAttribute('data-education'))})
						.on('mouseover', function(event, d){
							let data_fips= this.getAttribute('data-fips');
							let data_education = this.getAttribute('data-education')
							let info = edu_data.filter(i => i.fips == d.id)[0];
							tooltip.html(
								'<p>County: ' + info.area_name + '</p>'+
								'<p>State: ' + info.state + '</p>'+
								'<p>Education-level: '+ info.bachelorsOrHigher + '</p>'+
								'<p>FIPS: ' + info.fips + "</p>"
								)
							.style('left', event.clientX + 'px')
							.style('top', event.clientY + 'px')
							.style('transition', 'opacity 500ms')
							.style('opacity', '0.9')
							.attr('data-fips', data_fips)
							.attr('data-education', data_education);
						})
						.on('mouseout', (event, d) =>{
							tooltip.style('opacity', 0)
						})

			//Creating legend
			let rect_width = 40;
			const legend = svgContainer.append('g')
						.attr('id', 'legend')
						.attr('transform', 'translate(' + (c_width - 350) + ", " + (c_height - 40) + ")");

					legend.selectAll('rect')
						.data(d3.schemeBlues[8])
						.enter()
						.append('rect')
						.attr('width', rect_width)
						.attr('height', 20)
						.attr('x', (d,i) => i*rect_width)
						.attr('fill', d => d)

			const legendScale = d3.scaleLinear()
									.domain(d3.range(2.0,77.0,(76-2.0)/8))
									.range(d3.range(0, rect_width*9,rect_width))

			const legendAxis = d3.axisBottom(legendScale)
								.tickSize(21)
								.tickValues(d3.range(2.0,77.0,(76-2.0)/8))
								.tickFormat(d => d + "%")
			legend.call(legendAxis)
		})