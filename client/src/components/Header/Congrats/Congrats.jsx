import React from 'react';
import { subDays, addDays } from 'date-fns';
function Congrats ({ birthday: birthdaySating }) {
  if (!birthdaySating) {
    return;
  }

  const isSameDay = (day1, day2) => {
    day1.getDate() === day2.getDate() && day1.getMonth() === day2.getMonth();
  };

  const today = new Date();
  const yesterday = subDays(today, 1);
  const tomorrow = addDays(today, 1);
  const birthday = new Date(birthdaySating);

  const isBirthdayToday =
    isSameDay(today, birthday) ||
    isSameDay(yesterday, birthday) ||
    isSameDay(tomorrow, birthday);

  return <>{isBirthdayToday && <div>Happy Birthday</div>}</>;
}

export default Congrats;
