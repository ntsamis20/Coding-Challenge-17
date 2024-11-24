import React, { useState, useEffect } from 'react';

const Gallery = () => {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTours = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await fetch('https://course-api.com/react-tours-project');
        if (!response.ok) {
          throw new Error('Failure to fetch data');
        }
        const data = await response.json();
        setTours(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchTours();
  }, []);

  const removeTour = (id) => {
    setTours(tours.filter((tour) => tour.id !== id));
  };

  const Tour = ({ tour }) => {
    const [showMore, setShowMore] = useState(false);
    return (
      <div className="tour">
        <img src={tour.image} alt={tour.name} className="tour-image" />
        <div className="tour-info">
          <h2>{tour.name}</h2>
          <h3>${tour.price}</h3>
          <p>
            {showMore ? tour.info : `${tour.info.substring(0, 100)}...`}
            <button onClick={() => setShowMore(!showMore)}>
              {showMore ? 'Show Less' : 'Read More'}
            </button>
          </p>
          <button onClick={() => removeTour(tour.id)} className="btn">
            Not Interested
          </button>
        </div>
      </div>
    );
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h2>Error: {error}</h2>;
  }

  if (tours.length === 0) {
    return <h2>No tours left. Refresh to reload.</h2>;
  }

  return (
    <div className="gallery">
      <h1>Our Tours</h1>
      <div className="tours">
        {tours.map((tour) => (
          <Tour key={tour.id} tour={tour} />
        ))}
      </div>
    </div>
  );
};

export default Gallery;
