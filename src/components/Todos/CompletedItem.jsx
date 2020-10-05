import React from 'react';

const dateFormatter = () => {
  const date = new Date();
  const format = new Intl.DateTimeFormat('en', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  });
  const [
    { value: month },
    ,
    { value: day },
    ,
    { value: year },
  ] = format.formatToParts(date);

  return `${day}.${month}.${year}`;
};

const CompletedItem = (...formData) => {
  <tr>
    <td>{formData.title}</td>
    <td>{formData.author}</td>
    <td>{formData.description}</td>
    <td>{dateFormatter()}</td>
  </tr>;
};

export default CompletedItem;
