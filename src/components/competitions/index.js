import React, { Fragment } from 'react';
import { Link } from "react-router-dom";
import { Query } from "react-apollo";
import { Row, Divider, PageHeader, Spin, Button, Icon } from "antd";
import { TwoColumn } from '../../layout';
import CompetitionsList from './competitionList';
import { COMPETITIONS_Q } from '../../threads/queries';
class Competitions extends React.Component {
  render() {
    return (
      <Query query={COMPETITIONS_Q}>
        {({ loading, error, data }) => {
          return (
            <Fragment>
              <Row gutter={30}>
                <PageHeader
                  onBack={() => window.history.back()}
                  title="Competitions"
                />
              </Row>
              <Divider />
              {data.competitions && <CompetitionsList data={data.competitions} />}
              <Divider />
              <Link to="/add-competition">
                <Button type="primary">
                  Add Competition <Icon type="plus" />
                </Button>
              </Link>
            </Fragment>

          )
        }}
      </Query>
    )
  }
}

export default Competitions;