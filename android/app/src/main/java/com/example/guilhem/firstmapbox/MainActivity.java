package com.example.guilhem.firstmapbox;

import android.Manifest;
import android.content.pm.PackageManager;
import android.graphics.drawable.Drawable;
import android.location.Location;
import android.os.AsyncTask;
import android.os.CountDownTimer;
import android.support.annotation.NonNull;
import android.support.v4.app.ActivityCompat;
import android.support.v4.content.ContextCompat;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.graphics.Color;
import android.util.Log;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.RelativeLayout;
import android.widget.Toast;


import com.mapbox.mapboxsdk.MapboxAccountManager;
import com.mapbox.mapboxsdk.annotations.Icon;
import com.mapbox.mapboxsdk.annotations.IconFactory;
import com.mapbox.mapboxsdk.annotations.MarkerOptions;
import com.mapbox.mapboxsdk.camera.CameraUpdateFactory;
import com.mapbox.mapboxsdk.geometry.LatLng;
import com.mapbox.mapboxsdk.location.LocationListener;
import com.mapbox.mapboxsdk.location.LocationServices;
import com.mapbox.mapboxsdk.maps.MapView;
import com.mapbox.mapboxsdk.maps.MapboxMap;
import com.mapbox.mapboxsdk.maps.OnMapReadyCallback;
import com.mapbox.mapboxsdk.constants.MyLocationTracking;

import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.DefaultHttpClient;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;


public class MainActivity extends AppCompatActivity {

    private MapView mapView;
    private MapboxMap map;
    private Location lastLocation;
    private LocationServices locationServices;
    private static final int PERMISSIONS_LOCATION = 0;

    private Clock clock;


    private static String url = "http://10.128.165.20:8080/updateLink";
    private static String author = "an author";
    private static String type = "a type";
    private static String description = "a description";
    private static String title = "a title";



    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // set up the Maxbox account configurations
        MapboxAccountManager.start(this, getString(R.string.access_token));

        // Contain the MapView in XML
        setContentView(R.layout.activity_main);

        locationServices = LocationServices.getLocationServices(MainActivity.this);

        // Create a mapView
        mapView = (MapView) findViewById(R.id.mapview);
        mapView.onCreate(savedInstanceState);

        final Button button = (Button) findViewById(R.id.buttonInfo);
        button.setOnClickListener(new View.OnClickListener() {
            public void onClick(View v) {
                // Perform action on click
                new HttpAsyncTask().execute();

            }
        });

        final Button buttonDangerous = (Button) findViewById(R.id.dangerous);
        buttonDangerous.setOnClickListener(new View.OnClickListener() {
            public void onClick(View v) {
                // Perform action on click
                addMarkerBusy();

            }
        });

        final Button buttonDamage = (Button) findViewById(R.id.damage);
        buttonDamage.setOnClickListener(new View.OnClickListener() {
            public void onClick(View v) {
                // Perform action on click
                addMarkerDamage();

            }
        });


        final Button buttonHappy = (Button) findViewById(R.id.happy);
        buttonHappy.setOnClickListener(new View.OnClickListener() {
            public void onClick(View v) {
                // Perform action on click
                addMarkerHappy();

            }
        });

        final Button buttonAngry = (Button) findViewById(R.id.angry);
        buttonAngry.setOnClickListener(new View.OnClickListener() {
            public void onClick(View v) {
                // Perform action on click
                addMarkerAngry();

            }
        });


        // Add a MapboxMap
        mapView.getMapAsync(new OnMapReadyCallback() {
            @Override
            public void onMapReady(MapboxMap mapboxMap) {
                map = mapboxMap;

                enableGps();

                // Enable user tracking to show the padding affect.
                map.getTrackingSettings().setMyLocationTrackingMode(MyLocationTracking.TRACKING_FOLLOW);

                clock = new Clock(map, locationServices);



            }
        });


    }


    private void addMarkerBusy(){

        new CountDownTimer(0, 1000) {

            @Override
            public void onTick(long millisUntilFinished) {
                // do something after 1s
            }

            @Override
            public void onFinish() {
                // Create an Icon object for the marker to use
                IconFactory iconFactory = IconFactory.getInstance(MainActivity.this);
                Drawable iconDrawable = ContextCompat.getDrawable(MainActivity.this, R.drawable.busy);
                Icon icon = iconFactory.fromDrawable(iconDrawable);

                // Add the custom icon marker to the map
                map.addMarker(new MarkerOptions()
                        .position(new LatLng(locationServices.getLastLocation()))
                        .icon(icon));


            }

        }.start();


    }

    private void addMarkerDamage(){

        new CountDownTimer(0, 1000) {

            @Override
            public void onTick(long millisUntilFinished) {
                // do something after 1s
            }

            @Override
            public void onFinish() {
                // Create an Icon object for the marker to use
                IconFactory iconFactory = IconFactory.getInstance(MainActivity.this);
                Drawable iconDrawable = ContextCompat.getDrawable(MainActivity.this, R.drawable.damage);
                Icon icon = iconFactory.fromDrawable(iconDrawable);

                // Add the custom icon marker to the map
                map.addMarker(new MarkerOptions()
                        .position(new LatLng(locationServices.getLastLocation()))
                        .icon(icon));


            }

        }.start();


    }

    private void addMarkerHappy(){

        new CountDownTimer(0, 1000) {

            @Override
            public void onTick(long millisUntilFinished) {
                // do something after 1s
            }

            @Override
            public void onFinish() {
                // Create an Icon object for the marker to use
                IconFactory iconFactory = IconFactory.getInstance(MainActivity.this);
                Drawable iconDrawable = ContextCompat.getDrawable(MainActivity.this, R.drawable.happy);
                Icon icon = iconFactory.fromDrawable(iconDrawable);

                // Add the custom icon marker to the map
                map.addMarker(new MarkerOptions()
                        .position(new LatLng(locationServices.getLastLocation()))
                        .icon(icon));


            }

        }.start();


    }

    private void addMarkerAngry(){

        new CountDownTimer(0, 1000) {

            @Override
            public void onTick(long millisUntilFinished) {
                // do something after 1s
            }

            @Override
            public void onFinish() {
                // Create an Icon object for the marker to use
                IconFactory iconFactory = IconFactory.getInstance(MainActivity.this);
                Drawable iconDrawable = ContextCompat.getDrawable(MainActivity.this, R.drawable.angry);
                Icon icon = iconFactory.fromDrawable(iconDrawable);

                // Add the custom icon marker to the map
                map.addMarker(new MarkerOptions()
                        .position(new LatLng(locationServices.getLastLocation()))
                        .icon(icon));


            }

        }.start();


    }


    @Override
    public void onResume() {
        super.onResume();
        mapView.onResume();
    }

    @Override
    public void onPause() {
        super.onPause();
        mapView.onPause();
    }

    @Override
    public void onSaveInstanceState(Bundle outState) {
        super.onSaveInstanceState(outState);
        mapView.onSaveInstanceState(outState);
    }

    @Override
    public void onLowMemory() {
        super.onLowMemory();
        mapView.onLowMemory();
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        mapView.onDestroy();
    }

    private void enableGps() {
        // Check if user has granted location permission
        if (!locationServices.areLocationPermissionsGranted()) {
            ActivityCompat.requestPermissions(this, new String[]{
                    Manifest.permission.ACCESS_COARSE_LOCATION,
                    Manifest.permission.ACCESS_FINE_LOCATION}, PERMISSIONS_LOCATION);
        } else {
            enableLocation();
        }
    }

    private void enableLocation() {
        // If we have the last location of the user, we can move the camera to that position.
        lastLocation = locationServices.getLastLocation();
        if (lastLocation != null) {
            map.moveCamera(CameraUpdateFactory.newLatLngZoom(new LatLng(lastLocation), 16));
        }

        locationServices.addLocationListener(new LocationListener() {
            @Override
            public void onLocationChanged(Location location) {
                if (location != null) {
                    // Move the map camera to where the user location is and then remove the
                    // listener so the camera isn't constantly updating when the user location
                    // changes. When the user disables and then enables the location again, this
                    // listener is registered again and will adjust the camera once again.
                    map.moveCamera(CameraUpdateFactory.newLatLngZoom(new LatLng(location), 16));
                   locationServices.removeLocationListener(this);
                }
            }
        });
        // Enable or disable the location layer on the map
        map.setMyLocationEnabled(true);
    }


    @Override
    public void onRequestPermissionsResult(
            int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
        if (requestCode == PERMISSIONS_LOCATION) {
            if (grantResults.length > 0 && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                enableLocation();
            }
        }
    }

    public void post (){
        InputStream inputStream = null;
        String result = "";


        try {



            // 1. create HttpClient
            HttpClient httpclient = new DefaultHttpClient();

            // 2. make POST request to the given URL
            HttpPost httpPost = new HttpPost(url);

            String json = "";

            // 3. build jsonObject
            JSONObject jsonObject = setJsonLike();



            // 4. convert JSONObject to JSON to String
            json = jsonObject.toString();

            System.out.println(json);


            // ** Alternative way to convert Person object to JSON string usin Jackson Lib
            // ObjectMapper mapper = new ObjectMapper();
            // json = mapper.writeValueAsString(person);

            // 5. set json to StringEntity
            StringEntity se = new StringEntity(json);

            // 6. set httpPost Entity
            httpPost.setEntity(se);


            // 7. Set some headers to inform server about the type of the content
            httpPost.setHeader("Accept", "application/json");
            httpPost.setHeader("Content-Type", "application/json");



            // 8. Execute POST request to the given URL
            HttpResponse httpResponse = httpclient.execute(httpPost);



            // 9. receive response as inputStream
            inputStream = httpResponse.getEntity().getContent();

            // 10. convert inputstream to string
            if (inputStream != null){
                result = convertInputStreamToString(inputStream);}
            else{
                result = "Did not work!";}

            System.out.println(result);




        } catch (Exception e) {
            //Log.d("InputStream", "error with the request");
            System.out.println("error with the request");
        }

        // 11. return result
        // Log.d("result", result);
    }


    private class HttpAsyncTask extends AsyncTask<Void, Void, String> {
        @Override
        protected String doInBackground(Void... urls) {

            post();
            return "";
        }
        // onPostExecute displays the results of the AsyncTask.
        @Override
        protected void onPostExecute(String result) {
            Toast.makeText(getBaseContext(), "Data Sent!", Toast.LENGTH_LONG).show();
        }
    }
    private JSONObject  setJson (){

        JSONObject jsonObject = new JSONObject();

        try {
            jsonObject.accumulate("author", author);
            jsonObject.accumulate("type", type);
            jsonObject.accumulate("description", description);
            jsonObject.accumulate("title", title);
        }  catch (Exception e) {
            Log.d("InputStream", e.getLocalizedMessage());
        }


        return jsonObject;
    }

    private JSONObject  setJsonLike (){

        JSONObject jsonObject = new JSONObject();

        try {
            jsonObject.accumulate("link_id", 1024);
            jsonObject.accumulate("num_dangerous", 1);
            jsonObject.accumulate("num_damaged", 0);
            jsonObject.accumulate("num_likes", 1);

        }  catch (Exception e) {
            Log.d("InputStream", e.getLocalizedMessage());
        }


        return jsonObject;
    }


    private static String convertInputStreamToString(InputStream inputStream) throws IOException {
        BufferedReader bufferedReader = new BufferedReader( new InputStreamReader(inputStream));
        String line = "";
        String result = "";
        while((line = bufferedReader.readLine()) != null)
            result += line;

        inputStream.close();

        System.out.println("RESULT:  "+result );

        return result;


    }

}


