# coding=utf-8
from geopy.geocoders import Nominatim
import pandas as pd
import numpy as np



geolocator = Nominatim(country_bias='Canada')

def get_position(address):
    try:
        location = geolocator.geocode(address)
        return location.latitude, location.longitude
    except Exception, e:
        return 0,0

def process_report(path):

    accidents = pd.read_csv(path, low_memory=False, sep=';')

    accidents['address'] = accidents['NO_CIVIQ_ACCDN'].fillna(1).astype(int).astype(str) + ' ' + accidents['RUE_VILLE']

    lat = []
    lon = []
    i = 0

    for iter, row in accidents.iterrows():
        i += 1
        location = get_position(row['address'])
        lat.append(location[0])
        lon.append(location[1])
        if i % 100 == 0:
            print i

    accidents['lat'] = lat
    accidents['lon'] = lon

    accidents.to_csv(r'D:\Perso\hackQC2017\raw-data\results.csv')


process_report(r'D:\Perso\hackQC2017\raw-data\accident_velo.csv')