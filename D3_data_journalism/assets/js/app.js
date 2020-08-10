// GENERATE SVG
var svgWidth = 860;
var svgHeight = 600;

var margin = {
  top: 20,
  right: 40,
  bottom: 80,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// SVG wrapper and shifting margins
var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);


// Pull data from CSV 
d3.csv("assets/data/data.csv").then(function(scatterData) {
    console.log(scatterData);

    scatterData.forEach(function(d) {
        d.poverty= +d.poverty;
        d.healthcare = +d.healthcare;
    });

    // Create x and y scales
    var xLinearScale = d3.scaleLinear()
      .domain([8, (d3.max(scatterData, d => d.poverty)+2)])
      .range([0, width]);
    
    var yLinearScale = d3.scaleLinear()
    .domain([2, (d3.max(scatterData, d => d.healthcare)+2)])
    .range([height, 0]);

    // Create axis functions
    var xAxis = d3.axisBottom(xLinearScale);
    var yAxis = d3.axisLeft(yLinearScale);

    // Append x axis to scatter plot
    chartGroup.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(xAxis);

    chartGroup.append("text")
    .attr("transform", `translate(${width/2 -20}, ${height + margin.top + 30})`)
    .classed("axisText", true)
    .style("font-size", "20px")
    .text("In Poverty (%)");

    // Append y axis to scatter plot
    chartGroup.append("g")
    .call(yAxis);

    chartGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left +40)
    .attr("x", 0 - (height / 2 +50))
    .attr("dy", "1em")
    .classed("axisText", true)
    .style("font-size", "20px")
    .text("Lacks Healthcare (%)");

    // Scatter plot circles
    var circlesGroup = chartGroup.append("g")  
        .attr("class", "nodes")
        .selectAll("circle")
        .data(scatterData)
        .enter()
        .append("g");
    
    // Append circles
     circlesGroup.append("circle")
        .attr("cx", d => xLinearScale(d.poverty))
        .attr("cy", d => yLinearScale(d.healthcare))
        .attr("r", "15")
        .attr("fill", "slateblue")
        .attr("opacity", "0.5");

    // Append text to circles
    circlesGroup.append("text")
        .text(d => d.abbr)
        .attr("x", d=> (xLinearScale(d.poverty)-9))
        .attr("y", d => (yLinearScale(d.healthcare)+7))        
        .style("font-size", "12px")
        .attr("fill", "white" )
        .attr("font-weight", "bold");
})