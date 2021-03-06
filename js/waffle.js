"use strict";

function wafflechart(data) {

    var total = 0;
    var width,
        height,
        widthSquares = 20,
        heightSquares = 5,
        squareSize = 25,
        squareValue = 0,
        gap = 1,
        theData = [];  
    
    var color = d3v3.scale.category10();
    
    //total
    total = d3.sum(data, function(d) { return d[["f-statistic-scaled"]]; });
    
    //value of a square
    squareValue = total / (widthSquares*heightSquares);
    
    //remap data
    data.forEach(function(d, i) 
    {
        d["f-statistic-scaled"] = +d["f-statistic-scaled"];
        d.units = Math.floor(d["f-statistic-scaled"]/squareValue);
        theData = theData.concat(
          Array(d.units+1).join(1).split('').map(function()
            {
              return {  squareValue:squareValue,                      
                        units: d.units,
                        fstatistics: d["f-statistic-scaled"],
                        groupIndex: i};
            })
          );
    });
    
    width = (squareSize*widthSquares) + widthSquares*gap + 25;
    height = (squareSize*heightSquares) + heightSquares*gap + 25;
    
    var waffle = d3.select("#waffle")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .selectAll("div")
        .data(theData)
        .enter()
        .append("rect")
        .attr("width", squareSize)
        .attr("height", squareSize)
        .attr("fill", function(d)
        {
          return color(d.groupIndex);
        })
        .attr("x", function(d, i)
          {
            //group n squares for column
            let col = Math.floor(i/heightSquares);
            return (col*squareSize) + (col*gap);
          })
        .attr("y", function(d, i)
        {
          let row = i%heightSquares;
          return (heightSquares*squareSize) - ((row*squareSize) + (row*gap))
        })
        .append("title")
          .text(function (d,i) 
            {
              return "Age range: " + data[d.groupIndex].feature + " | " +  d["f-statistic-scaled"] + " , " + d.units + "%"
            });
    
     //add legend with categorical data
     var legend = d3.select("#legend")
      .append("svg")
      .attr('width', 300)
      .attr('height', 200)
      .append('g')
      .selectAll("div")
      .data(data)
      .enter()
        .append("g")
        .attr('transform', function(d,i){ return "translate(0," + i*20 + ")";});
    legend.append("rect")
      .attr("width", 18)
      .attr("height", 18)
      .style("fill", function(d, i) { return color(i)});
    legend.append("text")
      .attr("x", 25)
      .attr("y", 13)
      .attr("fill", "#ffecec")
      .text( function(d) { return d.feature + ": " + Math.round(d["f-statistic-scaled"]) + "%"});
    
      //add value of a unit square
      var legend2 = d3.select("#legend")
        .select('svg')
        .append('g')
        .attr('transform', "translate(100,0)");
    
    // legend2.append("text")    
    //       .attr('y', '14')    
    //       .attr('font-size', '18px')
    //       .text("Total: " + total)
    //       .attr("fill", "#ffecec");





}


