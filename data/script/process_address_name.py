from geopy.geocoders import Nominatim
import pandas as pd

geolocator = Nominatim(country_bias='Canada')

def get_position(address):
    location = geolocator.geocode(address)
    return location.latitude, location.longitude

accidents = pd.read_csv(r'D:\Perso\hackQC2017\raw-data\accidents.csv')

accidents['lat']
