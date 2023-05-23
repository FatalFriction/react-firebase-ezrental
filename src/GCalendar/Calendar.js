import React, { useEffect, useRef, useState } from 'react';
import 'flatpickr/dist/themes/confetti.css';
import flatpickr from 'flatpickr';
import './Calendar.styles.css'
import { CalendarMonthOutlined } from '@mui/icons-material';

const Calendar = ({ selectedDates, setSelectedDate }) => {
  const inputRef = useRef(null);
  const [flatpickrInstance, setFlatpickrInstance] = useState(null);

  useEffect(() => {
    const fp = flatpickr(inputRef.current, {
      mode: 'range',
      altInput: true,
      altFormat: 'F j, Y',
      dateFormat: 'm-d-Y',
      minDate: 'today',
      errorHandler: (error) => {
        console.error('Flatpickr error:', error);
      },
      onChange: (selectedDates, dateStr) => {
        setSelectedDate(dateStr);
      },
    });

    setFlatpickrInstance(fp);

    return () => {
      fp.destroy(); // Destroy the Flatpickr instance when unmounting the component
    };
  }, [setSelectedDate]);

  useEffect(() => {
    // Set the initial selected date value
    if (selectedDates && flatpickrInstance) {
      flatpickrInstance.setDate(selectedDates, false, 'Y-m-d');
      flatpickrInstance.set('minDate', 'today');
    }
  }, [selectedDates, flatpickrInstance]);

  return <><div className='rowContainer'><CalendarMonthOutlined/><input className='select' type="text" ref={inputRef} placeholder="Select starting date & Ending Date" required /></div></>;

};

export default Calendar;
