const FRAME_HEIGHT = 1000;
const FRAME_WIDTH = 1000; 
const MARGINS = {left: 50, right: 50, top: 50, bottom: 50};
const data1 = [55000, 48000, 27000, 66000, 90000];
const FRAME1 = //store svg element as a variable   
d3.select("#vis1") //analogous to document.selectElementByXX()
                    // the "#" indicates an id, similar to .css
  .append("svg") //adds a child svg to selected element
    .attr("height", FRAME_HEIGHT) //set attributes of the added 
                        // element. Note how methods are strung 
                        // together with the . notation, and how
                        // indenting is used to to organize code  
    .attr("width", FRAME_WIDTH)
    .attr("class", "frame"); // Note how we still end with a ; 
const VIS_HEIGHT = FRAME_HEIGHT - MARGINS.top - MARGINS.bottom;
const VIS_WIDTH = FRAME_WIDTH - MARGINS.left - MARGINS.right; 
//###############################################################
// Adding svg's to the frame
// To create visualizations, we will add svg's as children of
// the frame svg. Note how we use the const FRAME1 variable.   
//###############################################################
// find max X
const MAX_X = d3.max(data1, (d) => { return d; });  

// Now, define scale functions that maps our data values 
// (domain) to pixel values (range)
const X_SCALE = d3.scaleLinear() // linear scale because we have 
                              // linear data 
                  .domain([0, (MAX_X + 10000)]) // add some padding  
                  .range([0, VIS_WIDTH]); 



FRAME1.selectAll("points")  
    .data(data1)  
    .enter()       
    .append("circle")  
      .attr("cx", MARGINS.top) 
      .attr("cy", (d) => { return (X_SCALE(d) + MARGINS.left); })
      .attr("r", 10)
      .attr("class", "point");
      
FRAME1.append("g") // g is a "placeholder" svg
    .attr("transform", "translate(" + MARGINS.left + 
        "," + (VIS_HEIGHT + MARGINS.top) + ")") //moves axis 
                                                    // within margins 
      .call(d3.axisRight(X_SCALE).ticks(4)) // function for generating axis  
        .attr("font-size", '20px');