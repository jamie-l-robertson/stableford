import React, { Fragment } from 'react'
import { Row, Divider, PageHeader, Spin } from "antd";
import { TwoColumn } from '../../../layout';

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
        <TwoColumn side="sidebar" content="players" />
      </Fragment>
    )
  }
}

export default AddCompetition;