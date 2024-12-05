from flask import Flask
from routes.auth import auth_bp
from routes.listings import listings_bp
from utils.database import db
import config

app = Flask(__name__)
app.config.from_object(config.Config)

db.init_app(app)

app.register_blueprint(auth_bp)
app.register_blueprint(listings_bp)

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
