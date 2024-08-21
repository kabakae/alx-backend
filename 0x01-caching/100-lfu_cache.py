#!/usr/bin/env python3
"""
LFU Caching Module
"""
from base_caching import BaseCaching


class LFUCache(BaseCaching):
    """
    LFUCache class implements a caching system using the
    Least Frequently Used (LFU) algorithm.
    """

    def __init__(self):
        """Initialize the class."""
        super().__init__()
        self.frequency = {}  # Dictionary to store frequency of each key
        self.usage_order = []  # List to store usage order of keys

    def put(self, key, item):
        """
        Add an item in the cache using the LFU algorithm.

        Args:
            key (str): The key to add.
            item (any): The item to add.

        Returns:
            None
        """
        if key is None or item is None:
            return

        if key in self.cache_data:
            # Update the item and increase the frequency
            self.cache_data[key] = item
            self.frequency[key] += 1
        else:
            if len(self.cache_data) >= BaseCaching.MAX_ITEMS:
                # Find the least frequently used key(s)
                min_freq = min(self.frequency.values())
                min_freq_keys = [k for k, v in self.frequency.items() if v == min_freq]

                # If there are multiple keys with the same frequency, use LRU (the first in usage_order)
                if len(min_freq_keys) > 1:
                    lru_key = None
                    for k in self.usage_order:
                        if k in min_freq_keys:
                            lru_key = k
                            break
                    self.cache_data.pop(lru_key)
                    self.frequency.pop(lru_key)
                    self.usage_order.remove(lru_key)
                    print(f"DISCARD: {lru_key}")
                else:
                    # Single key with min frequency
                    lfu_key = min_freq_keys[0]
                    self.cache_data.pop(lfu_key)
                    self.frequency.pop(lfu_key)
                    self.usage_order.remove(lfu_key)
                    print(f"DISCARD: {lfu_key}")

            # Add the new item to the cache
            self.cache_data[key] = item
            self.frequency[key] = 1

        # Update the usage order (remove if exists and then append to end)
        if key in self.usage_order:
            self.usage_order.remove(key)
        self.usage_order.append(key)

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

        # Update the frequency and usage order
        self.frequency[key] += 1
        self.usage_order.remove(key)
        self.usage_order.append(key)

        return self.cache_data[key]
