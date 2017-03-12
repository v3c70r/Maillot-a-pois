mapboxgl.accessToken = 'pk.eyJ1IjoidjNjNzByIiwiYSI6ImNpdmpsN203MzAxajcyemx2b3Jha3E3enoifQ.o645TrYhI8TaZ0JMa6WfXQ';
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/light-v9'
});
map.setZoom(10.114653522184721);
map.addControl(new mapboxgl.GeolocateControl(), ['top-left']);
// Load geojson data from url
map.on('load', function () {
  // Loading datas
  map.addSource("bike", {
    "type": "geojson",
    "data": "https://raw.githubusercontent.com/v3c70r/Maillot-a-pois/master/data/QuebecCity_BicycleInfrastructure.geojson"
  });
  map.addSource("pedestrian", {
    "type": "geojson",
    "data": "https://raw.githubusercontent.com/v3c70r/Maillot-a-pois/master/data/QuebecCity_PedestrianInfrastructure.geojson"
  });

  map.addSource("active_transportation", {
    "type": "geojson",
    "data": "https://raw.githubusercontent.com/v3c70r/Maillot-a-pois/master/data/osm_active_transportation.geojson"
  });
  map.addSource("elevation", {
    "type": "geojson",
    "data": "https://raw.githubusercontent.com/v3c70r/Maillot-a-pois/master/data/osm_elevation.geojson"
  });
  map.addSource("freeways", {
    "type": "geojson",
    "data": "https://raw.githubusercontent.com/v3c70r/Maillot-a-pois/master/data/osm_freeways.geojson"
  });
  map.addSource("sidewalk", {
    "type": "geojson",
    "data": "https://raw.githubusercontent.com/v3c70r/Maillot-a-pois/master/data/osm_sidewalk_count.geojson"
  });
  map.addSource("mixed_use", {
    "type": "geojson",
    "data": "https://raw.githubusercontent.com/v3c70r/Maillot-a-pois/master/data/osm_mixed_use.geojson"
  });

  // Adding layers from data
  map.addLayer({
    "id": "bike",
    "type": "line",
    "source": "bike",
    "paint": {
      "line-color": "#3DFF01",
      "line-width": 2
    }
  });
  map.addLayer({
    "id": "pedestrian",
    "type": "line",
    "source": "pedestrian",
    "paint": {
      "line-color": "#3DFF01",
      "line-width": 2
    }
  });

  map.addLayer({
    "id": "active_transportation",
    "type": "line",
    "source": "active_transportation",
    "paint": {
      "line-color": "#0000ff",
      "line-width": 2
    }
  }, 'place-city-sm'  );

  map.addLayer({
    "id": "link_selected",
    "type": "line",
    "source": "active_transportation",
    "paint": {
      "line-color": "#ff0000",
      "line-width": 4
    },
    "filter": ["in", "FIPS", ""]
  }, 'place-city-sm');
  map.addLayer({
    "id": "elevation",
    "type": "line",
    "source": "elevation",
    "paint": {
      "line-color": {
        "property": "denivele",
        "type": "exponential",
        "stops": [
            [0, "#3DFF01"],
            [10, "#E8A60C"],
            [20, "#FF0000"]
        ]
      },
      "line-width": 2
    }
  });
  map.addLayer({
    "id": "freeways",
    "type": "line",
    "source": "freeways",
    "paint": {
      "line-color": "#ff0000",
      "line-width": 2
    }
  });
  map.addLayer({
    "id": "sidewalk",
    "type": "line",
    "source": "sidewalk",
    "paint": {
      "line-color": {
        "property": "nb_trottoirs",
        "type": "categorical",
        "stops": [
            [0, "#FF0000"],
            [1, "#E8A60C"],
            [2, "#3DFF01"]
        ]
      },
      "line-width": 2
    }
  });

  map.addLayer({
    "id": "Mixed use",
    "type": "line",
    "source": "mixed_use",
    "paint": {
      "line-color": "#ff69b4",
      "line-width": 2
    }
  });
  //map.on('mousemove', function (e) {
  //    var features = map.queryRenderedFeatures(e.point);
  //    document.getElementById('features').innerHTML = JSON.stringify(features, null, 2);
  //});
  map.setCenter([-71.2763062602738, 46.785609176075724]);
});

var toggleableLayerIds = ['bike', 'pedestrian', 'active_transportation', 'elevation', 'freeways', 'sidewalk', "Mixed use"];

for (var i = 0; i < toggleableLayerIds.length; i++) {
    var id = toggleableLayerIds[i];

    var link = document.createElement('a');
    link.href = '#';
    link.className = 'active';
    link.textContent = id;

    link.onclick = function (e) {
        var clickedLayer = this.textContent;
        e.preventDefault();
        e.stopPropagation();

        var visibility = map.getLayoutProperty(clickedLayer, 'visibility');

        if (visibility === 'visible') {
            map.setLayoutProperty(clickedLayer, 'visibility', 'none');
            this.className = '';
        } else {
            this.className = 'active';
            map.setLayoutProperty(clickedLayer, 'visibility', 'visible');
        }
    };

    var layers = document.getElementById('menu');
    layers.appendChild(link);
}

var link = document.createElement('a');
link.href = '#';
link.className = 'active';
link.textContent = 'stats_panel';
link.id = 'stats_button'
var layers = document.getElementById('menu');
layers.appendChild(link);

$(document).ready(function(){
  $("#stats_button").click(function(){
      $("#stats_panel").toggle();
  });

  $(".like").click(function(){
    /*$.post("http://10.128.165.20:8080/updateLink", 
      '{"link_id": 1024, "num_likes": 1, "num_dangerous": 0, "num_damaged": 0}')*/
    $.get("http://10.128.165.20:8080/getLink/1024", function(data){
      $("#selected_link").text('tesefefeft');
       alert(data);
    });
  });

  $(".damaged").click(function(){
    $.post("http://10.128.165.20:8080/updateLink", 
      '{"link_id": 1024, "num_likes": 0, "num_dangerous": 0, "num_damaged": 1}')
  });

  $(".dangerous").click(function(){
    $.post("http://10.128.165.20:8080/updateLink", 
      '{"link_id": 1024, "num_likes": 0, "num_dangerous": 1, "num_damaged": 0}')
  });

  map.on('click', function(e) {
    // set bbox as 5px reactangle area around clicked point
    var box_size = 20;
    var bbox = [[e.point.x - box_size , e.point.y - box_size], [e.point.x + box_size, e.point.y + box_size]];
    var features = map.queryRenderedFeatures(bbox, { layers: ['active_transportation'] });

    // Run through the selected features and set a filter
    // to match features with unique FIPS codes to activate
    // the `counties-highlighted` layer.

    try{
      var link_data = features[0].properties.id_unique
    }
    catch(err){
      var link_data = null
    }
    

    document.getElementById('selected_link_dangerous').innerHTML = link_data; /*JSON.stringify(features, null, 2);*/
    
  });

});

/* Update company*/
var company_names = [
  'Complexe G - Marie Guyard',
  'Palais de justice de Quebec',
  'Grand Theatre de Quebec',
  'Hotel Manoir Victoria',
  'Hilton Quebec',
  'Hotel Le Concorde Quebec',
  'Hopital du Saint-Sacrement',
  'Parc industriel Jean-Talon',
  'Galeries de la Capitale',
  'Hotel du Parlement'
];

var environment_score = {
  x:company_names,
  y:[1399,1190,713,817,701,532,476,420,379,175
],
  name: 'Score environemental',
  type: 'bar'
};

var physical_activity_score = {
  x:company_names,
  y:[2011,1489,1189,1335,1131,946,867,711,645,305,],
  name: 'Score calorie',
  type: 'bar'
};

var fidelity_score = {
  x:company_names,
  y:[450,375,875,550,425,500,575,500,350,250],
  name: 'Score fidelite',
  type: 'bar'
};

var feed_back_score = {
  x:company_names,
  y:[75,25,125,100,100,75,50,100,75,25
],
  name: 'Score citoyen',
  type: 'bar'
};

var texts = [
  '6 employees',
  '4 employees',
  '7 employees',
  '5 employees',
  '5 employees',
  '6 employees',
  '6 employees',
  '5 employees',
  '4 employees',
  '2 employees'
];

var data = [
  environment_score,
  physical_activity_score,
  fidelity_score,
  feed_back_score
];

var layout = {barmode: 'stack',
              xaxis: {autorange: 'reversed'},
              text:texts
            };
Plotly.newPlot('company_ranking', data, layout);



