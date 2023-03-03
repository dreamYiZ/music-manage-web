import React, { useEffect } from "react";
import { getMusicList } from "../../api/api";

function MusicList() {
  useEffect(() => {
    let isSubscribed = true;

    // declare the async data fetching function
    const fetchData = async () => {
      // get the data from the api
      const data = await getMusicList();
      // convert the data to json
      // const json = await response.json();
      console.log('data', data)
      // set state with the result if `isSubscribed` is true
      if (isSubscribed) {
        // setData(json);
      }
    };

    // call the function
    fetchData()
      // make sure to catch any error
      .catch(console.error);

    // cancel any future `setData`
    return () => (isSubscribed = false);
  }, []);

  return (
    <div>
      <h1>music list</h1>
    </div>
  );
}

export default MusicList;
