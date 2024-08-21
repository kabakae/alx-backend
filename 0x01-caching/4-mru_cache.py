#!/usr/bin/env python3
"""
MRU Caching Module
"""
from base_caching import BaseCaching


class MRUCache(BaseCaching):
    """
    MRUCache class implements a caching system using the
    Most Recently Used (MRU) algorithm.
    """

    def __init__(self):
        """Initialize the class."""
        super().__init__()
        self.most_recent_key = None  # To track the most recently used key

    def put(self, key, item):
        """
        Add an item in the cache using the MRU algorithm.

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
            self.cache_data[key] = item
        else:
            if len(self.cache_data) >= BaseCaching.MAX_ITEMS:
                if self.most_recent_key is not None:
                    del self.cache_data[self.most_recent_key]
                    print(f"DISCARD: {self.most_recent_key}")
            self.cache_data[key] = item

        # Update the most recently used key
        self.most_recent_key = key

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

        # Update the most recently used key
        self.most_recent_key = key

        return self.cache_data[key]
