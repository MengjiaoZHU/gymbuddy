$(document).ready(function () {
  var bubbleChart = new d3.svg.BubbleChart({
    supportResponsive: true,
    //container: => use @default
    size: 800,
    //viewBoxSize: => use @default
    innerRadius: 600 / 3.5,
    //outerRadius: => use @default
    radiusMin: 50,
    //radiusMax: use @default
    //intersectDelta: use @default
    //intersectInc: use @default
    //circleColor: use @default
    data: {
      items: [
        {text: "Shanshan", count: "100"},
        {text: "Clare", count: "65"},
        {text: "Mengjiao", count: "76"},
        {text: "LeMar", count: "62"},
        {text: "Ruirui", count: "76"},
        {text: "Anna", count: "27"},
        {text: "Jane", count: "40"},
        {text: "Tommy", count: "28"},
        // {text: "Pascal", count: "10"},
        // {text: "Something", count: "170"},
      ],
      eval: function (item) {return item.count;},
      classed: function (item) {return item.text.split(" ").join("");}
    },
    plugins: [
      {
        name: "central-click",
        options: {
          style: {
            "font-size": "20px",
            "font-style": "italic, bold",
            "font-family": "Source Sans Pro, sans-serif",
            //"font-weight": "700",
            "text-anchor": "middle",
            "fill": "white"
          },
          attr: {dy: "65px"},
          centralClick: function() {
            alert("Here is more details!!");
          }
        }
      },
      {
        name: "lines",
        options: {
          format: [
            {// Line #0
              textField: "count",
              classed: {count: true},
              style: {
                "font-size": "40px",
                "font-family": "Source Sans Pro, sans-serif",
                "text-anchor": "middle",
                fill: "black"
              },
              attr: {
                dy: "0px",
                x: function (d) {return d.cx;},
                y: function (d) {return d.cy;}
              }
            },
            {// Line #1
              textField: "text",
              classed: {text: true},
              style: {
                "font-size": "30px",
                "font-family": "Source Sans Pro, sans-serif",
                "text-anchor": "middle",
                fill: "black"
              },
              attr: {
                dy: "20px",
                x: function (d) {return d.cx;},
                y: function (d) {return d.cy;}
              }
            }
          ],
          centralFormat: [
            {// Line #0
              style: {"font-size": "50px"},
              attr: {}
            },
            {// Line #1
              style: {"font-size": "40px"},
              attr: {dy: "40px"}
            }
          ]
        }
      }]
  });
});
