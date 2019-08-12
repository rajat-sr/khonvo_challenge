import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/actionDispatchers';
import { Button, Card } from '@blueprintjs/core';
import JobCard from '../../components/JobCard/JobCard';
import JobDialog from '../../components/JobDialog/JobDialog';
import CreateJob from '../../components/CreateJob/CreateJob';
import classes from './Querier.module.css';
import axios from 'axios';
import { BASE_URL } from '../../utils';
import { errorToast } from '../../components/Toast/Toast';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

class Querier extends Component {
  state = {
    jobQueue: [],
    processingQueue: [],
  };

  onDragEnd = result => {
    const { destination, source } = result;

    if (!destination) {
      return;
    }

    const pickQueue = this.state[source.droppableId];
    const dropQueue = this.state[destination.droppableId];

    if (pickQueue === dropQueue) {
      return;
    }

    const updatedPickQueue = [...pickQueue];
    const updatedDropQueue = [...dropQueue];
    const movedJobItem = updatedPickQueue.splice(source.index, 1)[0];
    updatedDropQueue.splice(destination.index, 0, movedJobItem);

    const newState = { ...this.state };
    newState[source.droppableId] = updatedPickQueue;
    newState[destination.droppableId] = updatedDropQueue;

    let newStatus = 'OPEN';
    if (destination.droppableId === 'processingQueue') {
      newStatus = 'INPROCESS';
    } else if (destination.droppableId === 'jobQueue') {
      newStatus = 'OPEN';
    }

    axios
      .patch(`${BASE_URL}/job/${movedJobItem._id}/status`, { status: newStatus })
      .then()
      .catch(e => errorToast(e.message));

    this.setState(newState);
  };

  componentDidMount() {
    const url = BASE_URL + '/job';
    axios
      .get(url)
      .then(res => {
        const jobQueue = [];
        const processingQueue = [];
        res.data.forEach(job => {
          if (job.status === 'OPEN') {
            jobQueue.push(job);
          } else if (job.status === 'INPROCESS') {
            processingQueue.push(job);
          }
        });
        this.setState({ jobQueue, processingQueue });
      })
      .catch(e => errorToast(e.message));
  }

  render() {
    const { showJobDetailsDialog, showCreateJobDialog, openCreateJob } = this.props;

    const jobQueueList = this.state.jobQueue.map((job, index) => (
      <Draggable draggableId={job._id} index={index} key={job._id}>
        {provided => (
          <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
            <JobCard
              companyName={job.companyName}
              jobTitle={job.jobTitle}
              candidatesRequired={job.candidatesRequired}
              key={job._id}
              jobid={job._id}
            />
          </div>
        )}
      </Draggable>
    ));

    const processingQueueList = this.state.processingQueue.map((job, index) => (
      <Draggable draggableId={job._id} key={job._id} index={index}>
        {provided => (
          <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
            <JobCard
              companyName={job.companyName}
              jobTitle={job.jobTitle}
              candidatesRequired={job.candidatesRequired}
              key={job._id}
              jobid={job._id}
            />
          </div>
        )}
      </Draggable>
    ));

    return (
      <div className={classes.querier}>
        {showJobDetailsDialog ? <JobDialog /> : null}
        {showCreateJobDialog ? <CreateJob /> : null}
        <Button
          type="primary"
          icon="plus"
          className={classes.button}
          onClick={() => openCreateJob()}
        >
          Create new job
        </Button>
        <div className={classes.querierList}>
          <DragDropContext onDragEnd={this.onDragEnd}>
            <div>
              <p>JOB QUEUE</p>
              <Card className={classes.card}>
                <Droppable droppableId="jobQueue">
                  {provided => (
                    <div ref={provided.innerRef} {...provided.droppableProps}>
                      {jobQueueList}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </Card>
            </div>
            <div>
              <p>PROCESSING QUEUE</p>
              <Card className={classes.card}>
                <Droppable droppableId="processingQueue">
                  {provided => (
                    <div ref={provided.innerRef} {...provided.droppableProps}>
                      {processingQueueList}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </Card>
            </div>
          </DragDropContext>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    showJobDetailsDialog: state.jobDialogOpen,
    showCreateJobDialog: state.createJobDialogOpen,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    openCreateJob: () => dispatch(actionCreators.openCreateJobDialog()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Querier);
