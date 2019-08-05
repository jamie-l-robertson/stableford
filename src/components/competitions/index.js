import React, { Fragment } from 'react';
import { Link } from "react-router-dom";
import { Query } from "react-apollo";
import { Row, Divider, PageHeader, Spin, Button, Icon } from "antd";
import { TwoColumn } from '../../layout';

class Competitions extends React.Component {
  render() {
    return (
      <Fragment>
        <Fragment>
          <Row gutter={30}>
            <PageHeader
              onBack={() => window.history.back()}
              title="Competitions"
            />
          </Row>
          <Divider />
          <Link to="/add-competition">
            <Button type="primary">
              Add Competition <Icon type="plus" />
            </Button>
          </Link>
        </Fragment>
      </Fragment>
    )
  }
}

export default Competitions;