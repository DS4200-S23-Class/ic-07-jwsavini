/*
D3 Class Demo 1
Prof. Mosca 
Modified: 10/04/2022
*/

//###############################################################
// First, be sure to include the D3 library in your HTML file
//    It should be included in the <head> of the file
//    Notice that we're using D3 V6. The V6 library is not always 
//      compatible with code using older versions
//###############################################################

//###############################################################
// Next, be sure to include your js file(s) in your HTML file
//    They should be included in the <body> of the file, right
//      before the </body> tag
//###############################################################

//###############################################################
// Why do we use D3? 
//    To build visualizations on a webpage, we use svg's. 
//    For example, suppose you want to make a scatter plot. You
//    could use <line> to make your x and y axes, and <circle> 
//    to make the points on your plot (as you'll do in hw). 
//    
//    But wait... until this point, we've made all svg shapes
//    by hand. Who has time to write out hundreds (or even tens)
//    of <circle> statements in HTML? 
//
//    Well, no one and that's where D3 comes in. It allows us to 
//    programatically bind data to elements in our DOM. Or in 
//    other words, (using our example from before) it allows you 
//    to programatically make a <circle> for every row in a 
//    your dataset, and associates that circle with data.  
//###############################################################

//###############################################################
// Adding an svg frame 
// For each visualization you add to a webpage, you'll want to 
// start by adding a general SVG to build inside. Think of this
// svg as the "frame" for the visualization. 
//###############################################################

// Typically, we use constants for frame dimensions and the frame
const FRAME_HEIGHT = 200;
const FRAME_WIDTH = 500; 
const MARGINS = {left: 50, right: 50, top: 50, bottom: 50};

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

//###############################################################
// Adding svg's to the frame
// To create visualizations, we will add svg's as children of
// the frame svg. Note how we use the const FRAME1 variable.   
//###############################################################

FRAME1.append("circle") //append a circle svg to FRAME
        .attr("cx", 50) //need to set the same attributes that we 
                        // would if we defined the circle in html,
                        // but we do so programatically with d3
        .attr("cy", 50)
        .attr("r", 30)
        .attr("class", "firstCircle"); //still use classes and
                                        // css to style 

//We defined margins earlier, but haven't used them. When we 
// position svg's inside of the frame, we need to include margins
// (this helps things not run off the frame)

FRAME1.append("circle")
        .attr("cx", 50 + MARGINS.left) // move over by left margin
        .attr("cy", 50 + MARGINS.top) //  move down by top margin
        .attr("r", 30)
        .attr("class", "firstCircle"); 

//###############################################################
// Binding svg's to data  
// The real power of d3 for building visualization comes from
// the fact that it allows us to bind data to svg's. 
//###############################################################

// Let's create a visualization with a point for each datum 
// in the following dataset 
const data1 = [100, 200, 300];

// Add a new frame for this new visualization
const FRAME2 = d3.select("#vis2") //add a new div for this vis
                                    // to your html 
                  .append("svg")
                    .attr("width", FRAME_WIDTH)
                    .attr("height", FRAME_HEIGHT)
                    .attr("class", "frame"); 

// Add point for each datum in data1                 
FRAME2.selectAll("points") //select all points in FRAME2
                            //  Note: this is weird! There are
                            //  no points in FRAME2 yet.  
      .data(data1)  //specifies data to use  
      .enter()  //starts a loop through the data. All following
                  // code is applied to data1[0], data1[1], etc.     
      .append("circle") // append a circle for each datum  
        .attr("cx", (d) => { return d; }) // anonymous function.
                                          // sets x pos to datum
                                          // for each row in data1
        .attr("cy", 0) // since we have a 1d dataset, use 0
        .attr("r", 20)
        .attr("class", "point"); 

// The above code does not take into account margins! Let's 
// redo that chunk, accounting for margins

// Now, rebuild 
FRAME2.selectAll("points")  
    .data(data1)  
    .enter()       
    .append("circle")  
      .attr("cx", (d) => { return (d + MARGINS.left); }) 
      .attr("cy", MARGINS.top) 
      .attr("r", 20)
      .attr("class", "point"); 

//###############################################################
// Mapping pixels to data   
// In addition to binding data to svg's d3 will do the math 
// to map data values to pixel values.  
//###############################################################

// Let's make a vis with the following data 
const data2 = [10000, 20000, 40000]; 

// We would need an extremely large screen to use data2 values
// as our cx values. In order for our vis to work on (almost) 
// any screen, we need to be able to map (i.e. scale) our data
// values to pixel values. 

// Start with a new frame. This time, we will also set a constant
// for the width and height of our vis
const VIS_HEIGHT = FRAME_HEIGHT - MARGINS.top - MARGINS.bottom;
const VIS_WIDTH = FRAME_WIDTH - MARGINS.left - MARGINS.right; 

const FRAME3 = d3.select("#vis3")
                  .append("svg")
                    .attr("height", FRAME_HEIGHT)
                    .attr("width", FRAME_WIDTH)
                    .attr("class", "frame"); 

// Now, let's define our scaling function

// find max X
const MAX_X = d3.max(data2, (d) => { return d; }); 
console.log("Max x: " +MAX_X);  

// Now, define scale functions that maps our data values 
// (domain) to pixel values (range)
const X_SCALE = d3.scaleLinear() // linear scale because we have 
                              // linear data 
                  .domain([0, (MAX_X + 10000)]) // add some padding  
                  .range([0, VIS_WIDTH]); 

console.log("Input: 40000, X_SCALE output: " + X_SCALE(40000));

// Now, we can use X_SCALE to plot our points
FRAME3.selectAll("points")  
    .data(data2)  
    .enter()       
    .append("circle")  
      .attr("cx", (d) => { return (X_SCALE(d) + MARGINS.left); }) 
      .attr("cy", MARGINS.top) 
      .attr("r", 20)
      .attr("class", "point"); 

// We can also use X_SCALE to add an axis to the vis  
FRAME3.append("g") // g is a "placeholder" svg
      .attr("transform", "translate(" + MARGINS.left + 
            "," + (VIS_HEIGHT + MARGINS.top) + ")") //moves axis 
                                                    // within margins 
      .call(d3.axisBottom(X_SCALE).ticks(4)) // function for generating axis  
        .attr("font-size", '20px'); // set font size






