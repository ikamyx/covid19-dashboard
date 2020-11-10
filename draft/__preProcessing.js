"use strict";

function preProcessing(data) {

    data.forEach(e => {
        e.n = +e.n;
    });

    let data_byDate = [];
    let data_ = [];

    data.forEach(e => {
        if(data_byDate.indexOf(e.date) == -1) {
            data_byDate.push(e.date);
        }
    });

    data_byDate.forEach(e => {
        data_.push(data.filter(g => g.date == e))
    })

    // console.log(data_)

    return {
        original: data,
        byDate: data_
    };

}