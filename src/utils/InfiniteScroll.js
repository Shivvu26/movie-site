import React, { useState, useRef, useEffect } from 'react';

const InfiniteScroll = () => {
  const [items, setItems] = useState([]);
  const containerRef = useRef(null);

  // Simulate fetching new items
  const fetchMoreItems = () => {
    // Add logic to fetch more items, for example, from an API
    const newItems = Array.from({ length: 10 }, (_, index) => `Item ${items.length + index + 1}`);
    setItems((prevItems) => [...prevItems, ...newItems]);
  };

  // Add scroll event listener for infinite scrolling
  const handleScroll = () => {
    const container = containerRef.current;

    if (container) {
      // Check if the user has scrolled to the top
      if (container.scrollTop === 0) {
        fetchMoreItems(); // Fetch more items when scrolling to the top
      }

      // Check if the user has reached the bottom
      if (container.scrollHeight - container.scrollTop === container.clientHeight) {
        fetchMoreItems(); // Fetch more items when scrolling to the bottom
      }
    }
  };

  // Attach the scroll event listener
  useEffect(() => {
    const container = containerRef.current;

    if (container) {
      container.addEventListener('scroll', handleScroll);

      // Cleanup the event listener on component unmount
      return () => {
        container.removeEventListener('scroll', handleScroll);
      };
    }
  }, []);

  return (
    <div
      ref={containerRef}
      style={{ height: '400px', overflowY: 'auto', border: '1px solid #ccc' }}
    >
      {/* Render the items */}
      {items.map((item, index) => (
        <div key={index} style={{ padding: '20px', borderBottom: '1px solid #eee' }}>
          {item}
        </div>
      ))}
    </div>
  );
};

export default InfiniteScroll;
