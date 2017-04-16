# File: json_example.py
# This script shows how to work with json format in Python 3
import urllib.request
import json

# Set the url which contains a json object
# In this example we are using json data set with sherlock series description
data_url = "http://api.tvmaze.com/singlesearch/shows?q=sherlock&embed=episodes"

# Get data from url
with urllib.request.urlopen(data_url) as url:

    # here we use json.loads() because the url.read().decode() returns a str
    data = json.loads(url.read().decode())  # json to python data structure
    print(data)

# write data from url to file
fp = open("sherlock_data.txt", "w")

fp.seek(0)  # clear the file
fp.truncate()  # clear the file

json.dump(data, fp, indent="\t")  # set the intend to "/t" to show each level
fp.close()

# read data from File
fp = open("sherlock_data.txt", "r")

# get the data from file
sherlock_data = json.load(fp)


# beautify data print by adding indent and sort_keys
print(json.dumps(sherlock_data, indent=4, sort_keys=True))

# get object keys and it's values
for key in sherlock_data.keys():
    print("{}: {}".format(key, sherlock_data[key]))
    print()
