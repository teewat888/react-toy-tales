import React from 'react';
import ToyCard from './ToyCard'



const ToyContainer = ({toysList, removeToy, likeToy}) => {

/*  const handleDelete = id => {
    rmToy(id);
  };*/

  const renderedToysList = toysList.map(el => <ToyCard toy={el} removeToy={removeToy} likeToy={likeToy} />);
  return(
    <div id="toy-collection">
      {renderedToysList}
    </div>
  );
}

export default ToyContainer;
