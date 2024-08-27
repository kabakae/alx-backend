#!/usr/bin/env python3
"""
This module contains the Flask application configured with Babel
for internationalization and localization support, including locale selection.
"""

from flask import Flask, render_template, request
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


@babel.localeselector
def get_locale() -> str:
    """
    Determine the best match for supported languages.

    Returns:
        str: The best match locale.
    """
    return request.accept_languages.best_match(app.config['LANGUAGES'])


@app.route('/')
def index() -> str:
    """
    Route for the index page.

    Returns:
        str: The rendered HTML template for the index page.
    """
    return render_template('2-index.html')


if __name__ == '__main__':
    app.run(debug=True)
