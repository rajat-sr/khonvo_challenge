import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/actionDispatchers';
import fileDownload from 'js-file-download'
import { Button, Card, Intent, H5 } from '@blueprintjs/core';
import JobCard from '../../components/JobCard/JobCard';
import JobDialog from '../../components/JobDialog/JobDialog';
import CreateJob from '../../components/CreateJob/CreateJob';
import classes from './Querier.module.css';
import { BASE_URL } from '../../utils';
import axios from 'axios';
import { errorToast } from '../../components/Toast/Toast';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

class Querier extends Component {
  onDragEnd = result => {
    const { destination, source } = result;

    if (!destination) {
      return;
    }

    const pickQueue = this.props[source.droppableId];
    const dropQueue = this.props[destination.droppableId];

    if (pickQueue === dropQueue) {
      return;
    }

    const updatedPickQueue = [...pickQueue];
    const updatedDropQueue = [...dropQueue];
    const movedJobItem = updatedPickQueue.splice(source.index, 1)[0];
    updatedDropQueue.splice(destination.index, 0, movedJobItem);

    const newState = { ...this.props };
    newState[source.droppableId] = updatedPickQueue;
    newState[destination.droppableId] = updatedDropQueue;

    let newStatus = 'OPEN';
    if (destination.droppableId === 'processingQueue') {
      newStatus = 'INPROCESS';
    } else if (destination.droppableId === 'jobQueue') {
      newStatus = 'OPEN';
    }

    axios
      .patch(
        `${BASE_URL}/job/${movedJobItem._id}/status`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('khonvotoken')}`,
          },
        },
      )
      .then()
      .catch(e => errorToast(e.response ? e.response.data : e.message));

    this.props.setJobList(newState.jobQueue, newState.processingQueue);
  };

  downloadcsv() {
    const url = BASE_URL + '/user/likedcandidates';
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('khonvotoken')}`,
        },
      })
      .then(res =>  fileDownload(res.data, 'candidates.csv'))
      .catch(e => errorToast(e.response ? e.response.data : e.message));
  }

  render() {
    const {
      showJobDetailsDialog,
      showCreateJobDialog,
      openCreateJob,
      jobQueue,
      processingQueue,
    } = this.props;

    const jobQueueList = jobQueue.map((job, index) => (
      <Draggable draggableId={job._id} index={index} key={job._id}>
        {provided => (
          <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
            <JobCard
              companyName={job.companyName}
              jobTitle={job.jobTitle}
              candidatesRequired={job.candidatesRequired}
              key={job._id}
              jobid={job._id}
              candidatesProposed={job.candidatesProposed}
            />
          </div>
        )}
      </Draggable>
    ));

    const processingQueueList = processingQueue.map((job, index) => (
      <Draggable draggableId={job._id} key={job._id} index={index}>
        {provided => (
          <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
            <JobCard
              companyName={job.companyName}
              jobTitle={job.jobTitle}
              candidatesRequired={job.candidatesRequired}
              key={job._id}
              jobid={job._id}
              candidatesProposed={job.candidatesProposed}
            />
          </div>
        )}
      </Draggable>
    ));

    return (
      <div className={classes.querier}>
        {showJobDetailsDialog ? <JobDialog /> : null}
        {showCreateJobDialog ? <CreateJob /> : null}
        <Card className={classes.outercard}>
          <Button
            intent={Intent.PRIMARY}
            icon="plus"
            className={classes.button}
            onClick={() => openCreateJob()}
          >
            Create new job
          </Button>
          <Button
            intent={Intent.NONE}
            icon="download"
            className={classes.button}
            onClick={() => this.downloadcsv()}
            style={{ marginLeft: '0' }}
          >
            Download Liked Candidate List
          </Button>
          <div className={classes.querierList}>
            <DragDropContext onDragEnd={this.onDragEnd}>
              <div>
                <H5 style={{ color: '#aaa', margin: '10px' }}>JOB QUEUE</H5>
                <Card className={classes.card}>
                  <Droppable droppableId="jobQueue">
                    {provided => (
                      <div
                        style={{ minHeight: '40px' }}
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                      >
                        {jobQueueList}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </Card>
              </div>
              <div>
                <H5 style={{ color: '#aaa', margin: '10px' }}>PROCESSING QUEUE</H5>
                <Card className={classes.card}>
                  <Droppable droppableId="processingQueue">
                    {provided => (
                      <div
                        style={{ minHeight: '40px' }}
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                      >
                        {processingQueueList}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </Card>
              </div>
            </DragDropContext>
          </div>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    showJobDetailsDialog: state.jobDialogOpen,
    showCreateJobDialog: state.createJobDialogOpen,
    jobQueue: state.jobQueue,
    processingQueue: state.processingQueue,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    openCreateJob: () => dispatch(actionCreators.openCreateJobDialog()),
    setJobList: (jobQueue, processingQueue) =>
      dispatch(actionCreators.setJobList(jobQueue, processingQueue)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Querier);
