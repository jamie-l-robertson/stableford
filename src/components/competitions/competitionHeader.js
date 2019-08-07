import React, { Fragment } from "react";
import dayjs from "dayjs";
import { Row, PageHeader, Divider, Tag } from "antd";

const CompetitionHeader = props => {

  const { id, name, startDate, endDate, roundData, options, complete } = props.details;

  return (
    <Fragment>
      <Row gutter={30}>
        <PageHeader
          onBack={() => window.history.back()}
          title={name}
          subTitle={dayjs(startDate).format("DD/MM/YYYY, hh:mm")}
          extra={[
            <Tag color={`${complete ? "green" : "orange"}`}>
              {complete ? "Complete" : "In progress"}
            </Tag>,
            <Tag>{id}</Tag>
          ]}
        />
      </Row>
      <Divider />
    </Fragment>
  );
};

export default CompetitionHeader;
