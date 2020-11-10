"use strict";

function linechart(data) {

    //tooltip
    var tip = d3.tip()
    .attr('class', 'd3-tip')
    .offset([-10, 0]);

    tip.html(function(d) {
        return getToolTipText.call(this, d, localization.getFormattedNumber)
      });

    Array.prototype.sum = function (prop) {
        var total = 0
        for ( var i = 0, _len = this.length; i < _len; i++ ) {
            total += this[i][prop]
        }
        return total
    }

    let data_ = [];
    let data_byDate = [];
    data.forEach(e => {
        if(data_byDate.indexOf(e.date) == -1) {
            data_byDate.push(e.date);
        }
    });

    data.forEach(e => {
        e.pct_cli = +e.pct_cli;
    })
    
    data_byDate.forEach(e => {
        data_.push({
            date: e,
            pct_cli: data.filter(t => t.date == e).sum("pct_cli")
        })
    })

    // set the dimensions and margins of the graph
    var margin = {top: 20, right: 20, bottom: 50, left: 70},
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    // parse the date / time
    var parseTime = d3.timeParse("%Y-%m-%d");

    // set the ranges
    var x = d3.scaleTime().range([0, width]);
    var y = d3.scaleLinear().range([height, 0]);

    // define the line
    var valueline = d3.line()
        .x(function(d) { return x(d.date); })
        .y(function(d) { return y(d.pct_cli); });

    // append the svg obgect to the body of the page
    // appends a 'group' element to 'svg'
    // moves the 'group' element to the top left margin
    var svg = d3.select("#small_multiples").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")")
    svg.call(tip);


    // format the data
    data_.forEach(function(d) {
        d.date = parseTime(d.date);
        // d.pct_cli = +d.pct_cli;
    });

    // Scale the range of the data
    x.domain(d3.extent(data_, function(d) { return d.date; }));
    y.domain([0, d3.max(data_, function(d) { return d.pct_cli; })]);

    // Add the valueline path.
    svg.append("path")
        .data([data_])
        .attr("class", "line")
        .attr("d", valueline);

     svg.selectAll("path")
        .data(data_)
    .enter()
    .append("circle")
    .attr("class", "data-circle")
    .attr("r", 3)
    .attr("cx", function(d) { return x(d.date); })
    .attr("cy", function(d) { return y(d.pct_cli); })
    .style("stroke", "red")
    .style("fill", "white")
    .on("mouseover", tip.show)
    .on("mouseout", tip.hide);

    // Add the x Axis
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    svg.append("text")             
        .attr("transform",
             "translate(" + (width/2) + " ," + 
                            (height + margin.top + 20) + ")")
         .style("text-anchor", "middle")
         .text("D a t e")
         .attr("fill", "white");

    // Add the y Axis
    svg.append("g")
        .call(d3.axisLeft(y));

    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x",0 - (height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("P C T  -  C L I")
        .attr("fill", "white");

    function getToolTipText(d, formatNumber) {
            // TODO: Retourner le texte à afficher dans l'infobulle selon le format demandé.
            //       Assurez-vous d'utiliser la fonction "formatNumber" pour formater les nombres correctement.
            return "State: <strong>" + d.date + "</strong><br>" +
              "Date: <strong>" + formatNumber(d.pct_cli) + "</strong> ans<br>" +
              "Number of cases: <strong>" + formatNumber(d.pct_cli) + "</strong> USD<br>";
          } 
}