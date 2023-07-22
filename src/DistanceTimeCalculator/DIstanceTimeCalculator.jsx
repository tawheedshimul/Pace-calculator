import React, { useState, useEffect } from 'react';

const DistanceTimeCalculator = () => {
  const [distance, setDistance] = useState('');
  const [timeHours, setTimeHours] = useState('');
  const [timeMinutes, setTimeMinutes] = useState('');
  const [timeSeconds, setTimeSeconds] = useState('');
  const [pace, setPace] = useState('');
  const [speed, setSpeed] = useState('');
  const [raceDistance, setRaceDistance] = useState('');
  const [predictionTimeHours, setPredictionTimeHours] = useState('');
  const [predictionTimeMinutes, setPredictionTimeMinutes] = useState('');
  const [predictionTimeSeconds, setPredictionTimeSeconds] = useState('');
  const [adjustPace, setAdjustPace] = useState('');

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

  const handlePaceChange = (e) => {
    setPace(e.target.value);
  };

  const handleSpeedChange = (e) => {
    setSpeed(e.target.value);
  };

  const handleRaceDistanceChange = (e) => {
    setRaceDistance(e.target.value);
  };

  const handlePredictionTimeChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case 'hours':
        setPredictionTimeHours(value);
        break;
      case 'minutes':
        setPredictionTimeMinutes(value);
        break;
      case 'seconds':
        setPredictionTimeSeconds(value);
        break;
      default:
        break;
    }
  };

  const handleAdjustPaceChange = (e) => {
    setAdjustPace(e.target.value);
  };

  // Calculate and update the other values based on the provided inputs
  useEffect(() => {
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

  // Calculate the estimated finishing time when race distance changes
  useEffect(() => {
    const raceDistanceFloat = parseFloat(raceDistance);
    if (raceDistanceFloat && pace) {
      const [paceHoursStr, paceMinutesStr, paceSecondsStr] = pace.split(':');
      const paceInSeconds = (+paceHoursStr * 3600) + (+paceMinutesStr * 60) + (+paceSecondsStr);
      const raceTimeInSeconds = raceDistanceFloat * paceInSeconds;
      const hours = Math.floor(raceTimeInSeconds / 3600);
      const minutes = Math.floor((raceTimeInSeconds % 3600) / 60);
      const seconds = Math.floor(raceTimeInSeconds % 60);

      setPredictionTimeHours(hours);
      setPredictionTimeMinutes(minutes);
      setPredictionTimeSeconds(seconds);
    } else {
      setPredictionTimeHours('');
      setPredictionTimeMinutes('');
      setPredictionTimeSeconds('');
    }
  }, [raceDistance, pace]);

  // Calculate the adjusted pace and update the prediction time when adjust pace changes
  useEffect(() => {
    const adjustedPaceInSeconds = (((+predictionTimeHours * 3600 + +predictionTimeMinutes * 60 + +predictionTimeSeconds)/ +raceDistance )/60).toFixed(2);
    setAdjustPace(adjustedPaceInSeconds);
  }, [raceDistance, predictionTimeHours, predictionTimeMinutes, predictionTimeSeconds]);

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
        <input type="text" value={pace} onChange={handlePaceChange} />
      </div>
      <div>
        <label>Speed (km/hr):</label>
        <input type="number" value={speed} onChange={handleSpeedChange} />
      </div>
      <div>
        <label>Race Distance (in km): </label>
        <input type="number" value={raceDistance} onChange={handleRaceDistanceChange} />
      </div>
      <div>
        <label>Prediction Finishing Time:</label>
        <input type="number" name="hours" placeholder="hours" value={predictionTimeHours} onChange={handlePredictionTimeChange} />
        <input type="number" name="minutes" placeholder="minutes" value={predictionTimeMinutes} onChange={handlePredictionTimeChange} />
        <input type="number" name="seconds" placeholder="seconds" value={predictionTimeSeconds} onChange={handlePredictionTimeChange} />
      </div>
      <div>
        <label>Adjust Pace (km/hr):</label>
        <input type="number" value={adjustPace} onChange={handleAdjustPaceChange} />
      </div>
    </div>
  );
};

export default DistanceTimeCalculator;
