import { useState, useEffect } from "react";
import moment from "moment-timezone";
import { getUserTimeZoneInBrowser } from "@/lib/utils.ts";

// NowTime component to display the current time in a specified or user-detected timezone
const NowTime = ({ timezone }: { timezone?: string }) => {
  const [currentTime, setCurrentTime] = useState<string>("");

  const SECOND_UPDATE_DURATION = 1000; // Update interval in milliseconds (1 second)

  // Determine the timezone to use: either the provided prop or the user's browser timezone
  const browserTimezone = getUserTimeZoneInBrowser();
  const usingTimezone = timezone || browserTimezone;

  useEffect(() => {
    // Set up an interval to update the current time every second
    const interval = setInterval(() => {
      const now = moment().tz(usingTimezone).format("ddd MMM DD YYYY HH:mm:ss");
      setCurrentTime(now);
    }, SECOND_UPDATE_DURATION);

    // Clear the interval on component unmount
    return () => clearInterval(interval);
  }, [usingTimezone]);

  // Validate if currentTime is in the expected format
  const isCurrentTimeValid = currentTime && currentTime.includes(" "); // Ensure it has a space to split

  // Split current time into date and time components
  const dateStrings = isCurrentTimeValid ? currentTime.split(" ") : [];
  const theDate = dateStrings.slice(0, 4).join(" ") || "Loading..."; // Format: "ddd MMM DD YYYY"
  const theTime = dateStrings.slice(4).join(" ") || "Loading..."; // Format: "HH:mm:ss"

  return (
    <>
      <div>
        <p>{theDate}</p>
        <p className="text-2xl my-2">{theTime}</p>
        <p className="text-sm text-gray-500">{usingTimezone}</p>
      </div>
      {/* Display a loading indicator if no timezone is provided */}
      {!timezone && (
        <span className="relative flex h-3 w-3">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
          <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500" />
        </span>
      )}
    </>
  );
};

export default NowTime;
