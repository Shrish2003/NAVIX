import requests
import polyline
import time

OSRM_URL = "http://localhost:5000/route/v1/driving"

start = (21.1458, 79.0882)
end = (21.0945, 79.0497)

url = f"{OSRM_URL}/{start[1]},{start[0]};{end[1]},{end[0]}?overview=full"

res = requests.get(url).json()

geometry = res['routes'][0]['geometry']

# decode route
route_nodes = polyline.decode(geometry)

print(f"Total nodes: {len(route_nodes)}")

# simulate movement
for i, (lat, lon) in enumerate(route_nodes):
    print(f"Step {i}: {lat}, {lon}")
    time.sleep(0.2)