package com.example.guilhem.firstmapbox;

import android.location.Location;
import android.os.CountDownTimer;

import com.mapbox.mapboxsdk.annotations.MarkerOptions;
import com.mapbox.mapboxsdk.geometry.LatLng;
import com.mapbox.mapboxsdk.location.LocationServices;
import com.mapbox.mapboxsdk.maps.MapboxMap;

/**
 * Created by guilhem on 11/03/17.
 */

public class Clock {

    // contain the markers
    private MapboxMap map;

    // allow to get the last known location
    private LocationServices locationServices;



    public Clock (MapboxMap map, LocationServices locationServices) {

        this.map =map;
        this.locationServices= locationServices;

        System.out.println("ini");

        addMarker();
    }

    private void addMarker (){

        new CountDownTimer(30000, 1000) {

            @Override
            public void onTick(long millisUntilFinished) {
                // do something after 1s
            }

            @Override
            public void onFinish() {
                map.addMarker(new MarkerOptions()
                        .position(new LatLng(locationServices.getLastLocation())));
                System.out.println("mark");
                addMarker();

            }

        }.start();

    }



}
