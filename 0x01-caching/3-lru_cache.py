#!/usr/bin/env python3
"""
LRU Caching Module
"""
from base_caching import BaseCaching


class LRUCache(BaseCaching):
    """
    LRUCache class implements a caching system using the
    Least Recently Used (LRU) algorithm.
    """

    def __init__(self):
        """Initialize the class."""
        super().__init__()
        self.access_order = []  # List to keep track of the order of access

    def put(self, key, item):
        """
        Add an item in the cache using the LRU algorithm.

        Args:
            key (str): The key to add.
            item (any): The item to add.

        Returns:
            None
        """
        if key is None or item is None:
            return

        # Update or add the item to the cache
        if key in self.cache_data:
            # Remove the key from access order to update its position later
            self.access_order.remove(key)
        elif len(self.cache_data) >= BaseCaching.MAX_ITEMS:
            # Discard the least recently used item if the cache is full
            lru_key = self.access_order.pop(0)
            del self.cache_data[lru_key]
            print(f"DISCARD: {lru_key}")

        # Add the key to the cache and update access order
        self.cache_data[key] = item
        self.access_order.append(key)

    def get(self, key):
        """
        Get an item by key from the cache.

        Args:
            key (str): The key to get.

        Returns:
            any: The value associated with the key, or None if not found.
        """
        if key is None or key not in self.cache_data:
            return None

        # Update the access order since this key is being accessed
        self.access_order.remove(key)
        self.access_order.append(key)

        return self.cache_data[key]
