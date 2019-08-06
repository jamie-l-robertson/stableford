import React, { Fragment } from 'react'
import { Row, Divider, PageHeader, Spin } from "antd";
import CompetitionForm from './competitionForm';

class AddCompetition extends React.Component {
  render() {
    return (
      <Fragment>
        <Fragment>
          <Row gutter={30}>
            <PageHeader
              onBack={() => window.history.back()}
              title="Add Competition"
            />
          </Row>
          <Divider />
        </Fragment>
        <CompetitionForm />
      </Fragment>
    )
  }
}

export default AddCompetition;