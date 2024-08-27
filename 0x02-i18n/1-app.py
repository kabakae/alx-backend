#!/usr/bin/env python3
"""
This module contains the Flask application configured with Babel
for internationalization and localization support.
"""

from flask import Flask, render_template
from flask_babel import Babel


class Config:
    """
    Configuration class for Flask app with Babel settings.
    """
    LANGUAGES = ["en", "fr"]
    BABEL_DEFAULT_LOCALE = "en"
    BABEL_DEFAULT_TIMEZONE = "UTC"


app = Flask(__name__)
app.config.from_object(Config)

babel = Babel(app)


@app.route('/')
def index() -> str:
    """
    Route for the index page.

    Returns:
        str: The rendered HTML template for the index page.
    """
    return render_template('1-index.html')


if __name__ == '__main__':
    app.run(debug=True)
