// Use the popper library to add poppers to various page elements
// https://popper.js.org/

// Or use premonish to guide people to the information we need next
// https://mathisonian.github.io/premonish/

// Current weight dropdown
var weight = ["100", "125", "150", "175", "200", "250", "300"];
  
function init2w(array) {
  console.log('hello')
  var selector = d3.select('#selDatasetWeight')
  weight.forEach(w => {
    selector
      .append("option")
      .text(w)
      .property("value", w);
  });
};
init2w(weight);



// Daily calorie dropdown
  // Start with 1000 calories and end with 3200 by 100s
  // Use .well and #calorie

  var calories = ["1000", "1250", "1500", "1750", "2000", "2500", "3000"];
  
  function init3c(array) {
    var selector = d3.select('#selDatasetCalories')
    calories.forEach(c => {
      selector
        .append("option")
        .text(c)
        .property("value", c);
    });
  };
  init3c(calories);


// Calorie reader
function buildCharts(sample) {


  // @TODO: Use `d3.json` to fetch the sample data for the plots
  var chartsURL = "/macros";
  d3.json(chartsURL).then(function (data) {

    var foodItem = data[sample]
    var nutriKey = []
    var nutriValue = []

    for (let nutriData in foodItem) {
      if (nutriData != "Calories") {
        nutriValue.push(foodItem[nutriData])
        nutriKey.push(nutriData)
      }
    }


    //  @TODO: Build a Pie Chart
    var canvas = d3.select("#pie")
      .append("svg:svg")
      .attr("width", 300)//canvasWidth)
      .attr("height", 300);//canvasHeight);


    var data = [{
      values: nutriValue.slice(0, 4),
      labels: nutriKey.slice(0, 4),
      type: 'pie',
    }];

    // var data = [{
    //   values: nutriValue.slice(0, 4),
    //   labels: nutriKey.slice(0, 4),
    //   type: 'sunburst',
    //   outsidetextfont: {size: 20, color: "#377eb8"},
    //   leaf: {opacity: 0.4},
    //   marker: {line: {width: 2}}
    // }];

    // var layout = {
    //   margin: {l:0, r:0, b:0, t:0},
    //   // width: 500,
    //   // height: 500
    //   showlegend: true,
    // };

    // Plotly.newPlot('pie', data, layout);

    // console.log(data)
    
    
    
    
    // layout = go.Layout(
    //   legend=dict(orientation="h")
    // )
    // fig = go.Figure(data=data, layout=layout)
    
    // py.iplot(fig, filename='horizontal-legend')

    var layout = {
      showlegend: true,
    };
    Plotly.newPlot('pie', data, layout);

  })
}
// Calorie reader
// Pulls from full menu csv
// Use #calories-viz

// Nutrition word cloud
// Pulls from full menu csv
// Use #words-viz section

// Lollipop chart
// Pulls from full menu csv + exercise csv
// 5 random activities pop up
// Use #lollipop

function init() {
  // grab a reference to the dropdown select element "#item"
  var selector = d3.select("#selDatasetItem");

  // use list of sample names to populate the select options
  d3.json("/macros").then((foodNames) => {
    var items = Object.keys(foodNames)
    items.forEach((food) => {
      // console.log(food)
      selector
        .append("option")
        .text(food)
        .property("value", food);
    });
    const firstSample = foodNames[0];
    console.log(foodNames[0]);
    buildCharts(firstSample);
  });
};

function optionChanged(newSample) {
  console.log(newSample);
  // fetch new data each time a new sample is selected
  buildCharts(newSample);
}


init();


// Nutrition aster plot
  // Pulls from full menu csv
  // Fat, carbs, fiber, protein
  // Number of calories in center
  // Use #aster-plot

// Lollipop chart
  // Pulls from full menu csv + exercise csv
  // 5 random activities pop up
  // Use #lollipop

