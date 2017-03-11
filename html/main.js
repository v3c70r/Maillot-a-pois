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

  // Adding layers from data
  map.addLayer({
    "id": "bike",
    "type": "line",
    "source": "bike",
    "paint": {
      "line-color": "#ff69b4",
      "line-width": 2
    }
  });
  map.addLayer({
    "id": "pedestrian",
    "type": "line",
    "source": "pedestrian",
  });

  map.addLayer({
    "id": "active_transportation",
    "type": "line",
    "source": "active_transportation",
    "paint": {
      "line-color": "#0000ff",
      "line-width": 2
    }
  });
  map.addLayer({
    "id": "elevation",
    "type": "line",
    "source": "elevation",
    "paint": {
      "line-color": "#000000",
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
    "id": "freeways",
    "type": "line",
    "source": "freeways",
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

var toggleableLayerIds = ['bike', 'pedestrian', 'active_transportation', 'elevation', 'freeways', 'sidewalk'];

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
    $.post("http://10.128.165.20:8080/updateLink", 
      '{"link_id": 1024, "num_likes": 1, "num_dangerous": 0, "num_damaged": 0}')
    /*$.get("http://10.128.165.20:8080/getLink/1024", function(data){
      $("#selected_link").text('tesefefeft');
       alert(data);
    });*/
  });

  $(".damaged").click(function(){
    $.post("http://10.128.165.20:8080/updateLink", 
      '{"link_id": 1024, "num_likes": 0, "num_dangerous": 0, "num_damaged": 1}')
  });

  $(".dangerous").click(function(){
    $.post("http://10.128.165.20:8080/updateLink", 
      '{"link_id": 1024, "num_likes": 0, "num_dangerous": 1, "num_damaged": 0}')
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
  y:[1,2,3,4,5,6,7,8,9,10],
  name: 'Score environemental',
  type: 'bar'
};

var physical_activity_score = {
  x:company_names,
  y:[1,2,3,4,5,6,7,8,9,10],
  name: 'Score calorie',
  type: 'bar'
};

var fidelity_score = {
  x:company_names,
  y:[1,2,3,4,5,6,7,8,9,10],
  name: 'Score fidelite',
  type: 'bar'
};

var feed_back_score = {
  x:company_names,
  y:[1,2,3,4,5,6,7,8,9,10],
  name: 'Score citoyen',
  type: 'bar'
};

var texts = [
  '3 employees <br> 4 kg CO2',
  '3 employees <br> 4 kg CO2',
  '3 employees <br> 4 kg CO2',
  '3 employees <br> 4 kg CO2',
  '3 employees <br> 4 kg CO2',
  '3 employees <br> 4 kg CO2',
  '3 employees <br> 4 kg CO2',
  '3 employees <br> 4 kg CO2',
  '3 employees <br> 4 kg CO2',
  '3 employees <br> 4 kg CO2'
];

var data = [
  environment_score,
  physical_activity_score,
  fidelity_score,
  feed_back_score
];

var layout = {barmode: 'stack',
              xaxis: {autorange: 'reversed'}};
Plotly.newPlot('company_ranking', data, layout);


/*map.on('click', function(e) {
  // set bbox as 5px reactangle area around clicked point
  var bbox = [[e.point.x - 5, e.point.y - 5], [e.point.x + 5, e.point.y + 5]];
  var features = map.queryRenderedFeatures(bbox, { layers: ['counties'] });

  // Run through the selected features and set a filter
  // to match features with unique FIPS codes to activate
  // the `counties-highlighted` layer.
  var filter = features.reduce(function(memo, feature) {
      memo.push(feature.properties.FIPS);
      return memo;
  }, ['in', 'FIPS']);

  map.setFilter("counties-highlighted", filter);
});*/


