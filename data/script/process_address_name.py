from geopy.geocoders import Nominatim

geolocator = Nominatim()

def get_position(address):
    location = geolocator.geocode(address)
    print location.latitude, location.longitude

get_position('1285 rue Villeray')
