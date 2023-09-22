import React, { useEffect, useState } from "react";
import XMLParser from "react-xml-parser";
import "./EventData.css";

function EventData() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://openapi.seoul.go.kr:8088/7a636c7a736b616c35366e6e714246/xml/eduCmpltEnt/1/5/"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        const text = await response.text();
        const xml = new XMLParser().parseFromString(text);
        setData(xml);
      } catch (error) {
        setError(error);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  const rows = data.getElementsByTagName("row");

  return (
    <div>
      {rows.map((row, index) => (
        <div key={index}>
          <h3>{row.children[2].value}</h3>
          <p>Date: {row.children[3].value}</p>
          <p>Place: {row.children[4].value}</p>
          {}
        </div>
      ))}
    </div>
  );
}

export default EventData;
