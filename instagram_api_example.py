from instagram.client import InstagramAPI


client_id = "50857ec0537e47d5816e0ce24c4a36fa"
client_secret = "f261c52e5886413d8c78e34276f77f9b"
redirect_uri = ""
raw_scope = input("Requested scope (separated by spaces, blank for just basic read): ").strip()
scope = "basic"

api = InstagramAPI(client_id=client_id, client_secret=client_secret, redirect_uri=redirect_uri)
redirect_uri = api.get_authorize_login_url(scope = scope)

print ("Visit this page and authorize access in your browser: "+ redirect_uri)

code = (str(input("Paste in code in query string after redirect: ").strip()))

access_token = api.exchange_code_for_access_token(code)
print ("access token: " )
print (access_token)
