import React, { useState } from 'react';

const DistanceTimeCalculator = () => {
  const [distance, setDistance] = useState('');
  const [timeHours, setTimeHours] = useState('');
  const [timeMinutes, setTimeMinutes] = useState('');
  const [timeSeconds, setTimeSeconds] = useState('');
  const [pace, setPace] = useState('');
  const [speed, setSpeed] = useState('');

  const handleDistanceChange = (e) => {
    setDistance(e.target.value);
  };

  const handleTimeChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case 'hours':
        setTimeHours(value);
        break;
      case 'minutes':
        setTimeMinutes(value);
        break;
      case 'seconds':
        setTimeSeconds(value);
        break;
      default:
        break;
    }
  };

  React.useEffect(() => {
    const timeInSeconds = (+timeHours * 3600) + (+timeMinutes * 60) + (+timeSeconds);

    if (distance !== '' && timeInSeconds !== 0) {
      const speed = (distance * 3600) / timeInSeconds;
      const paceInSeconds = timeInSeconds / distance;
      const paceHours = Math.floor(paceInSeconds / 3600);
      const paceMinutes = Math.floor((paceInSeconds % 3600) / 60);
      const paceSeconds = paceInSeconds % 60;
      const paceString = `${paceHours}:${String(paceMinutes).padStart(2, '0')}:${String(paceSeconds).padStart(2, '0')}`;

      setSpeed(speed);
      setPace(paceString);
    } else if (speed !== '' && timeInSeconds !== 0) {
      const distance = (speed * timeInSeconds) / 3600;
      setDistance(distance);
      const paceInSeconds = timeInSeconds / distance;
      const paceHours = Math.floor(paceInSeconds / 3600);
      const paceMinutes = Math.floor((paceInSeconds % 3600) / 60);
      const paceSeconds = paceInSeconds % 60;
      const paceString = `${paceHours}:${String(paceMinutes).padStart(2, '0')}:${String(paceSeconds).padStart(2, '0')}`;

      setPace(paceString);
    } else {
      setSpeed('');
      setPace('');
    }
  }, [distance, timeHours, timeMinutes, timeSeconds, speed]);

  return (
    <div>
      <div>
        <label>Distance (in km): </label>
        <input type="number" value={distance} onChange={handleDistanceChange} />
      </div>
      <div>
        <label>Time:</label>
        <input type="number" name="hours" placeholder="hours" value={timeHours} onChange={handleTimeChange} />
        <input type="number" name="minutes" placeholder="minutes" value={timeMinutes} onChange={handleTimeChange} />
        <input type="number" name="seconds" placeholder="seconds" value={timeSeconds} onChange={handleTimeChange} />
      </div>
      <div>
        <label>Pace (hh:mm:ss):</label>
        <input type="text" value={pace} onChange={() => {}} readOnly />
      </div>
      <div>
        <label>Speed (km/hr):</label>
        <input type="number" value={speed} onChange={(e) => setSpeed(e.target.value)} />
      </div>
    </div>
  );
};

export default DistanceTimeCalculator;

