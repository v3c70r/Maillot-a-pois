package com.example.guilhem.firstmapbox;

import com.mapbox.mapboxsdk.location.LocationServices;

/**
 * Created by guilhem on 11/03/17.
 */

public class Communications {

    private int userID = 9;
    private LocationServices locationServices;
    private String linkID;


    // Get the locationServices to be able to get the location when needed
    public Communications (LocationServices locationServices){
        this.locationServices= locationServices;
    }



    // Return the [Lat, Long] corrdinates of the last position recorded.
    public String getLocation (){

        String result = "[";
        result += locationServices.getLastLocation().getLatitude();
        result += ", ";
        result += locationServices.getLastLocation().getLongitude();
        result += "]";

        return result;
    }



}
