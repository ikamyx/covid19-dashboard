"use strict";

function timeSlider(data, newRange) {
    // console.log(data)
    // let viz = [];
    // let res = [];

    // viz.forEach(e => {
    //     e.attr("fill", "transparent");
    // })
    // viz = [];
    // console.log(data)
    console.log(newRange)
    let data_ = data.filter((e, i) => (i>=newRange.begin) && (i<=newRange.end));
    console.log(data_)
    // console.log(data_)
}