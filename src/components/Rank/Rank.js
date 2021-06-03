import React from 'react';

const Rank = ({name, entries}) => {
  return (
  //Rank
  <div>
    <div className='f3 white'>
      {name}
    </div>
    <div className='f1 white'>
      {'Your entries - '}
      {entries}
    </div>
  </div>);
}

export default Rank;
