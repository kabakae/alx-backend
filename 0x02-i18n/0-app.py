#!/usr/bin/env python3
"""
This module contains the Flask application for a simple web page
that displays a welcoming message.
"""

from flask import Flask, render_template

app = Flask(__name__)


@app.route('/')
def index() -> str:
    """
    Route for the index page.

    Returns:
        str: The rendered HTML template for the index page.
    """
    return render_template('0-index.html')


if __name__ == '__main__':
    app.run(debug=True)
