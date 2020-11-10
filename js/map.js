"use strict";

function map() {

    let width = 960,
    height = 500,
    centered;

    let projection = d3v3.geo.albersUsa()
    .scale(1070)
    .translate([width / 2, height / 2]);

    let path = d3v3.geo.path()
    .projection(projection);

    let svg = d3v3.select("svg.map")
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", "0 0 960 500");

    svg.append("rect")
    .attr("class", "background")
    .attr("width", width)
    .attr("height", height)
    .attr("fill", "transparent")
    .on("click", clicked);

    let g = svg.append("g");

    

    d3v3.json("data/us.json", function(error, us) {
        if (error) throw error;


        g.append("g")
        .attr("id", "states")
        .selectAll("path")
        .data(topojson.feature(us, us.objects.states).features)
        .enter().append("path")
        .attr("d", path)
        .on("click", clicked);

        g.append("path")
        .datum(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; }))
        .attr("id", "state-borders")
        .attr("d", path);

        // let dataFetch = false;
        let fetchData = function() {
            if(this.classList.contains("active")) {
                let state = this.classList[0];
                setTimeout(() => {
                    
                    let promises = [];
                    // if(!dataFetch) {
                        promises.push(d3.csv("./data/overall-state.csv"));
                        promises.push(d3.csv("./data/f-statistic.csv"))
                        promises.push(d3.csv("./data/state_code.csv"))
                    // }
                    Promise.all(promises)
                    .then(function(data) {
                        // dataFetch = true;
                        // let data_ = data;
                        document.querySelector("aside").classList.add("show");

                        linechart(data[0].filter(d => d.state_code == state));
                        wafflechart(data[1])

                       let selected_state = data[2].filter(d=> state == d.state_abr );
                        document.getElementById("state_name").innerHTML = selected_state[0].state_name;
                    });
                        

                },50)
            } else {
                document.querySelector("body").classList.remove("selected");
                document.querySelector("#states").classList.remove("active");
                document.querySelector("aside").classList.remove("show");
                document.querySelector("svg.map").classList.remove("side");
                document.getElementById("small_multiples").innerHTML = "";
                document.getElementById("title").innerHTML = "";
                document.getElementById("waffle").innerHTML = "";
                document.getElementById("legend").innerHTML = "";
            }
        }
       
        let $state = document.querySelectorAll("#states path");
        $state.forEach((e,i) => {
            e.addEventListener("click", fetchData);
            switch(i) {
                case 0: e.classList.add("al");break;
                case 1: e.classList.add("ak");break;
                case 2: e.classList.add("az");break;
                case 3: e.classList.add("ar");break;
                case 4: e.classList.add("ca");break;
                case 5: e.classList.add("co");break;
                case 6: e.classList.add("ct");break;
                case 7: e.classList.add("de");break;
                case 8: e.classList.add("dc");break;
                case 9: e.classList.add("fl");break;
                case 10: e.classList.add("ga");break;
                case 11: e.classList.add("hi");break;
                case 12: e.classList.add("id");break;
                case 13: e.classList.add("il");break;
                case 14: e.classList.add("in");break;
                case 15: e.classList.add("ia");break;
                case 16: e.classList.add("ks");break;
                case 17: e.classList.add("ky");break;
                case 18: e.classList.add("la");break;
                case 19: e.classList.add("me");break;
                case 20: e.classList.add("md");break;
                case 21: e.classList.add("ma");break;
                case 22: e.classList.add("mi");break;
                case 23: e.classList.add("mn");break;
                case 24: e.classList.add("ms");break;
                case 25: e.classList.add("mo");break;
                case 26: e.classList.add("mt");break;
                case 27: e.classList.add("ne");break;
                case 28: e.classList.add("nv");break;
                case 29: e.classList.add("nh");break;
                case 30: e.classList.add("nj");break;
                case 31: e.classList.add("nm");break;
                case 32: e.classList.add("ny");break;
                case 33: e.classList.add("nc");break;
                case 34: e.classList.add("nd");break;
                case 35: e.classList.add("oh");break;
                case 36: e.classList.add("ok");break;
                case 37: e.classList.add("or");break;
                case 38: e.classList.add("pa");break;
                case 39: e.classList.add("ri");break;
                case 40: e.classList.add("sc");break;
                case 41: e.classList.add("sd");break;
                case 42: e.classList.add("tn");break;
                case 43: e.classList.add("tx");break;
                case 44: e.classList.add("ut");break;
                case 45: e.classList.add("vt");break;
                case 46: e.classList.add("va");break;
                case 47: e.classList.add("wa");break;
                case 48: e.classList.add("wv");break;
                case 49: e.classList.add("wi");break;
                case 50: e.classList.add("wy");break;
            }
            
        })
        

        
    });

    function clicked(d) {
        let x, y, k;

        if (d && centered !== d) {
            var centroid = path.centroid(d);
            x = centroid[0];
            y = centroid[1];
            k = 4;
            centered = d;
        }
        else {
            x = width / 2;
            y = height / 2;
            k = 1;
            centered = null;
        }

        g.selectAll("path")
        .classed("active", centered && function(d) { return d === centered; });

        g.transition()
        .duration(750)
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")scale(" + k + ")translate(" + -x + "," + -y + ")")
        .style("stroke-width", 1.5 / k + "px");

        document.querySelector("body").classList.add("selected");
        document.querySelector("#states").classList.add("active");
        document.querySelector("svg.map").classList.add("side");
    }
}