import React from 'react';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

const SplitRequirementContainer = () => {
  const history = useHistory();
  return (
    <div className="SplitRequirementContainer">
      <Button variant="primary" onClick={() => console.log('hihi')}>
        Hihi
      </Button>
    </div>
  );
};

export default SplitRequirementContainer;
