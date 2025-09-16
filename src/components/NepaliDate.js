import { useState, useEffect } from "react";

const DateDisplay = ({ className = "" }) => {
  const [dates, setDates] = useState({ english: "", nepali: "" });

  useEffect(() => {
    const today = new Date();
    
    // English date
    const englishDate = today.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long'
    });
    
    // Current Nepali date
    const nepaliDate = "२९ भादौ २०८२, आइतबार";
    
    setDates({ english: englishDate, nepali: nepaliDate });
  }, []);

  return (
    <div className={className} style={{ color: "white", fontSize: "0.875rem", fontWeight: "500" }}>
      <div>{dates.english}</div>
      <div style={{ marginTop: "4px" }}>{dates.nepali}</div>
    </div>
  );
};

export default DateDisplay;