#!/usr/bin/env python3
"""
FIFOCache module that implements a FIFO caching system.
"""

from base_caching import BaseCaching


class FIFOCache(BaseCaching):
    """
    FIFOCache class that inherits from BaseCaching and uses FIFO caching.
    """

    def __init__(self):
        """
        Initialize the class with the parent class's attributes.
        """
        super().__init__()
        self.order = []

    def put(self, key, item):
        """
        Add an item to the cache using FIFO policy.

        Args:
            key (str): The key associated with the item.
            item (any): The item to be stored in the cache.

        Returns:
            None
        """
        if key is None or item is None:
            return

        if key not in self.cache_data:
            self.order.append(key)
        self.cache_data[key] = item

        if len(self.cache_data) > BaseCaching.MAX_ITEMS:
            first_key = self.order.pop(0)
            del self.cache_data[first_key]
            print(f"DISCARD: {first_key}")

    def get(self, key):
        """
        Retrieve an item from the cache by key.

        Args:
            key (str): The key associated with the item to be retrieved.

        Returns:
            The value associated with the key, or None if the key is not found.
        """
        return self.cache_data.get(key, None)
