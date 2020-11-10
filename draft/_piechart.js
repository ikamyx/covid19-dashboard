"use strict";

function piechart(data) {
    var w = 300,               
    h = 300,                      
    r = 100,                         
    color = ["#481414", "#5a2c2c", "#6d4343", "#7f5b5b", "#917272", "#a48a8a"]


    let sum ;
    for(let i=0;i<=4;i++) {
        sum = data[i]["f-statistic-scaled"]
    }
    let data_ = [
                {"label":data[0].feature,
                "value":data[0]["f-statistic-scaled"]}, 
                {"label":data[1].feature,
                "value":data[1]["f-statistic-scaled"]}, 
                {"label":data[2].feature,
                "value":data[2]["f-statistic-scaled"]},
                {"label":data[3].feature,
                "value":data[3]["f-statistic-scaled"]},
                {"label":data[4].feature,
                "value":data[4]["f-statistic-scaled"]},
                {"label":"other",
                "value":100 - sum}
            ];
    
    var vis = d3.select("body")
        .append("svg:svg")              
        .data([data_])                   
            .attr("width", w)       
            .attr("height", h)
        .append("svg:g")              
            .attr("transform", "translate(" + r + "," + r + ")")    

    var arc = d3v3.svg.arc()             
        .outerRadius(r);

    var pie = d3v3.layout.pie()          
        .value(function(d) { return d.value; });  

    var arcs = vis.selectAll("g.slice") 
        .data(pie)                         
        .enter()                            
            .append("svg:g")                
                .attr("class", "slice");    

        arcs.append("svg:path")
                .attr("fill", function(d, i) { return color[i]; } ) 
                .attr("d", arc);                                

        arcs.append("svg:text")                              
                .attr("transform", function(d) {            
                
                d.innerRadius = 0;
                d.outerRadius = r;
                return "translate(" + arc.centroid(d) + ")"; 
            })
            .attr("text-anchor", "middle")          
            .text(function(d, i) { return data_[i].label; }); 
}