import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import TraineeList from './TraineeList';
import TraineeDetail from './TraineeDetail';

const propTypes = {
  match: PropTypes.element.isRequired,
};
const Topics = ({ match }) => (
  <>
    <Switch>
      <Route exact path={match.path} component={TraineeList} />
      <Route path={`${match.url}/:id`} component={TraineeDetail} />
    </Switch>
  </>
);
Topics.propTypes = propTypes;

export default Topics;
