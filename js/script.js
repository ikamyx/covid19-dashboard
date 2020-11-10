"use strict";

(function (d3) {
    /***** settings *****/
    let slider = createD3RangeSlider(0, 163, "#slider-container");
    /***** DOM *****/
    /***** bind events *****/
    
    
    map();
    

    /***** Loading data *****/
    var promises = [];
    promises.push(d3.csv("./data/state_time.csv"))


    Promise.all(promises)
        /***** functions *****/
        .then(function (data) {
            let data_ = preProcessing(data[0]);
            slider.onTouchEnd(function(newRange){
                timeSlider(data_,newRange);
            })
        });

})(d3);