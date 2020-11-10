"use strict";

function timeSlider(data, newRange) {
    // var slider = $("#combicalc_contribution-slider")[0];
    // var sliderPos = slider.value / slider.max;
    // var pixelPostion = slider.clientWidth * sliderPos;
    // //this is your pixel value
    // console.log(pixelPostion);
    // console.log(newRange);

    let data_ = data.byDate.filter((e, i) => (i>=newRange.begin) && (i<=newRange.end));
    console.log(data_)
    console.log(countyData);

    // let data__ = data.original.filter(e => e.date = data_.date);



    d3.selectAll('path')
    .data(data_)
    .each(function(d, i) {
        d3.select(this)
        .attr("fill", d => d.fips);
    });
    

}


