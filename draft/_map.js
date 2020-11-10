"use strict";

function map(data) {

    let canvas = d3.select("body").append("svg").attr("width", 1000).attr("viewBox", "0 0 1000 600");

    let countyURL = 'https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json',
        educationURL = 'https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json';
    let countyData, educationData;
        

    let drawMap = () => {
        canvas.append("g")
        .selectAll('path')
        .data(countyData)
        .enter()
        .append('path')
        .attr('d', d3.geoPath())
        .attr('class', 'county')
        .attr('class', d => "n" + d.id)
        .attr('fill', 'whitesmoke')
        .attr('stroke', '#aaa')
        .on("click", showData)
        // .attr('fill', (countyDataItem) => {
        //     let id = countyDataItem['id']
        //     let county = educationData.find((item) => {
        //         return item['fips'] === id
        //     })
        //     let percentage = county['bachelorsOrHigher']
        //     //console.log(percentage)
        //     if(percentage <= 15){
        //         return 'tomato'
        //     }else if(percentage <= 30){
        //         return 'orange'
        //     }else if(percentage <= 45){
        //         return 'lightgreen'
        //     }else{return 'limegreen'}
        // });
        console.log(countyData)

        let viz = [];
        let res = [];
        slider.onTouchEnd(function(newRange){
            res = [];
            canvas.attr("class", "");
            d3.select("aside").attr("class", "");
            canvas.attr("viewBox", "0 0 1000 600").transition()
            .duration(300);
            viz.forEach(e => {
                e.attr("fill", "transparent");
            })
            viz = [];

            let data_ = data.byDate.filter((e, i) => (i>=newRange.begin) && (i<=newRange.end))[0];
            let ids = data_.map(d => d.fips);
            ids.forEach((e,i) => {
                ids[i] = +ids[i]
                let x = d3.select(`path.n${ids[i]}`).empty();
                if(!x) {
                    res.push(d3.select(`path.n${ids[i]}`));
                }
            });


            console.log(res);

            res.forEach(e => {
                e.attr("fill", "orange");
            })
            viz = res;         
        });





    };

    let showData = function(d, i) {
        canvas.attr("class", "side");
        canvas.attr("viewBox", "100 200 500 600").transition()
        .duration(300);
        d3.select("aside").attr("class", "show");
        let id;
        if(d.id.toString().length < 5) {
            id = "0" + d.id;
        }
        let res = data.original.filter(e => e.fips == id);
        console.log(res);
        let _ = this;
        setTimeout(function() {
            d3.select(_)
            .attr("fill", "#555");
        }, 100)
    }

    d3.json(countyURL).then((data, error) => {
        if(error){
            console.log(error)
        }
        else {
            countyData = topojson.feature(data, data.objects.counties).features;
            d3.json(educationURL).then((data, error) => {
                if(error){
                    console.log(error)
                }
                else {
                    educationData = data;
                    drawMap()
                };
            });
        };
    });
};