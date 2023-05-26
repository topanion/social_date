export const timeDifference = (initial_time, other_time) => {
  // can either compare the time difference between the two OR with current time if only one argument
  const currentTime = other_time ? new Date(other_time) : new Date(); 
  const time = new Date(initial_time);
  const difference = currentTime.getTime() - time.getTime();

  const minutes = Math.floor(difference / (1000 * 60));
  const hours = Math.floor(difference / (1000 * 60 * 60));
  const days = Math.floor(difference / (1000 * 60 * 60 * 24));

  return ({minutes, hours, days});
}

export const timeOrNot = (msg, previous_msg) => {
  const difference = timeDifference(msg.created_at, previous_msg.created_at);
  const same = (msg.source_id === previous_msg.source_id) ? true : false;

  // if the two messages are from the same user with less than 30 minutes of difference, time is not displayed
  if (difference.days === 0 && difference.hours === 0 && 
    difference.minutes < 30 && same) 
    return false;
    else
    return true;
}

export const postTime = (post_time) => {
    const difference = timeDifference(post_time);
    const time = new Date(post_time);
  
    if (difference.days > 0) {
      const formattedTime = time.toLocaleTimeString([], {
        month: 'long',
        day: 'numeric',
      });
      return `${formattedTime}`;
    } else if (difference.hours > 0) {
      return `${difference.hours} h`;
    } else if (difference.minutes > 0){
      return `${difference.minutes} m`;
    } else {
        return ``;
    }
};

export const getDay = (inputTime) => {
  const time = new Date(inputTime);

  // give another format for the day
  const formatter = new Intl.DateTimeFormat([], {
    day: 'numeric',
    month: 'long',
  });

  const formattedTime = formatter.format(time);

  return formattedTime;
};


export const messageTime = (msg_time) => {
  const difference = timeDifference(msg_time);
  const time = new Date(msg_time);


  if (difference.days > 0) {
    return (time.toLocaleTimeString([], {
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute:'numeric',
    }));
  }
    else {
      return (time.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
      }));
  }
}