import React, { useEffect, useState } from 'react';
import { Col, Form } from 'react-bootstrap';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { Sprint } from '../../../interfaces';
import { updateSelectedSprint } from '../../../redux/actions/updateSelectedSprintAction';

const SprintSelector = () => {
  const dispatch = useDispatch();
  const sprints = useSelector(
    (state: RootStateOrAny) => state.getAllSprints.sprints
  );
  //   const [selectedSprint, setSelectedSprint] = useState(1);
  const selectedSprintId = useSelector(
    (state: RootStateOrAny) => state.updateSelectedSprint.selectedSprintId
  );

  const onSelectedSprintChanged = (e: any) => {
    console.log('onSelectedSprintChanged ', e.target.value);
    dispatch(updateSelectedSprint(e.target.value));
    // setSelectedSprint(e.target.value);
  };

  useEffect(() => {
    console.log('selectedSprintId changed to ', selectedSprintId);
  }, [selectedSprintId]);

  return (
    <Form.Group as={Col} controlId="formGridState">
      <Form.Label>Current Sprint</Form.Label>
      <Form.Control
        as="select"
        defaultValue={1}
        value={selectedSprintId}
        onChange={onSelectedSprintChanged}
      >
        {sprints?.map((sprint: Sprint) => {
          return <option value={sprint.id}>Sprint {sprint.id}</option>;
        })}
      </Form.Control>
    </Form.Group>
  );
};

export default SprintSelector;
