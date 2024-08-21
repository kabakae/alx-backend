#!/usr/bin/env python3
"""
LIFOCache module that implements a LIFO caching system.
"""

from base_caching import BaseCaching


class LIFOCache(BaseCaching):
    """
    LIFOCache class that inherits from BaseCaching and uses LIFO caching.
    """

    def __init__(self):
        """
        Initialize the class with the parent class's attributes.
        """
        super().__init__()
        self.last_key = None

    def put(self, key, item):
        """
        Add an item to the cache using LIFO policy.

        Args:
            key (str): The key associated with the item.
            item (any): The item to be stored in the cache.

        Returns:
            None
        """
        if key is None or item is None:
            return

        if len(self.cache_data) >= BaseCaching.MAX_ITEMS and \
           key not in self.cache_data:
            if self.last_key is not None:
                del self.cache_data[self.last_key]
                print(f"DISCARD: {self.last_key}")

        self.cache_data[key] = item
        self.last_key = key

    def get(self, key):
        """
        Retrieve an item from the cache by key.

        Args:
            key (str): The key associated with the item to be retrieved.

        Returns:
            The value associated with the key, or None if the key is not found.
        """
        return self.cache_data.get(key)
