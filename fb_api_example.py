import facebook

# set app parameters and init the graph
app_id = 276011932843801
secret = "42cfe67d5bb3a90837db80a8cc03b91a"
token = facebook.GraphAPI().get_app_access_token(app_id, secret)
graph = facebook.GraphAPI(access_token=token, version='2.8')

# set parameters for login
canvas_url = 'https://vrhome.pythonanywhere.com/auth'
perms = ['manage_pages', 'publish_pages']

# generate login URL
fb_login_url = graph.auth_url(app_id, canvas_url, perms)

# output the URL for user's login - open this link so app get more permissions
print(fb_login_url)

print("Enter the code - it's placed in the last URL you were redirected to:")
code = input().strip()

# check if user entered a valid code
if len(code) < 30:
    code = False
# If user entered the code:
if code:
    permissions = graph.get_permissions(user_id=100003122401720)
    friends = graph.get_connections(id='100003122401720',
                                    connection_name='friends')
    print(friends)

# We can assess object information by it's id


def get_object_data(obj_id, app_id=app_id, secret=secret):
    FB_OBJECT_ID = obj_id
    token = facebook.GraphAPI().get_app_access_token(app_id, secret)
    graph = facebook.GraphAPI(access_token=token)
    result = graph.request(FB_OBJECT_ID)
    for key in result.keys():
        print("{}: {}".format(key, result[key]))
    print("\n")

# User's name by its facebook id example:
get_object_data('100003122401720')
# Get post data:
get_object_data('100003122401720_1365016490279085')
