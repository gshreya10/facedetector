import React from 'react';

const Rank = ({name, entries}) => {
  return (
  //Rank
  <div>
    <div className='center f3 white'>
      {name}
    </div>
    <div className='center f1 white'>
      {'Your entries = '}
      {entries}
    </div>
  </div>);
}

export default Rank;