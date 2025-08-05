import React from 'react'
import { useState , useEffect } from "react"
import { useParams, useLocation } from 'react-router-dom';

import {client} from '../client'
import MasonryLayout from "./MasonryLayout";
import Spinner from "./Spinner";
import { feedQuery , searchQuery } from '../utilis/data';



const Feed = () => {
  const [loading, setLoading] = useState(false);
  const categoryId = useParams().categoryId;
  const [pins, setPins] = useState(null);
  const location = useLocation(); // Add this to detect route changes

  useEffect(() => {
    setLoading(true);
    
    if (categoryId) {
      const query = searchQuery(categoryId);
      client.fetch(query)
        .then((data) => {
          setPins(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          setLoading(false);
        });
    } else {
      client.fetch(feedQuery)
        .then((data) => {
          setPins(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          setLoading(false);
        });
    }
  }, [categoryId, location.pathname]); // Add location.pathname to refetch when route changes

  if (loading) return <Spinner message="We are adding new ideas to your feed!" />;

  if (!pins?.length) return <h2 className='text-center text-xl font-bold mt-2'>No Pins Available!</h2>;
  return (
    <div>
      {pins && <MasonryLayout pins={pins} />}
    </div>
  )
}

export default Feed;
