from flask import Flask, render_template, redirect
from urllib import urlopen
app = Flask(__name__)


@app.route('/')
def hello_world():
    return render_template("index.html")


@app.route('/auth')
def auth():
    from instagram.client import InstagramAPI

    client_id = "50857ec0537e47d5816e0ce24c4a36fa"
    client_secret = "f261c52e5886413d8c78e34276f77f9b"
    redirect_uri = "http://vrhome.pythonanywhere.com/auth"
    scope = "basic"

    api = InstagramAPI(client_id=client_id, client_secret=client_secret,
                       redirect_uri=redirect_uri)
    redirect_uri = api.get_authorize_login_url(scope=scope)

    return redirect(redirect_uri, code=302, Response=None)

    code = (str(input("Paste in code in query string after redirect: ").strip()))

    access_token = api.exchange_code_for_access_token(code)
    print("access token: ")
    print(access_token)

    return redirect("login.html")
