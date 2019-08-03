import React, { Fragment } from "react";
import dayjs from "dayjs";
import { Row, PageHeader, Divider, Tag } from "antd";

const RoundHeader = ({ round, ID }) => {
  return (
    <Fragment>
      <Row gutter={30}>
        <PageHeader
          onBack={() => window.history.back()}
          title={round.courses[0].name}
          subTitle={dayjs(round.teeTime).format("DD/MM/YYYY, hh:mm")}
          extra={[
            <Tag color={`${round.complete ? "green" : "orange"}`}>
              {round.complete ? "Complete" : "In progress"}
            </Tag>,
            <Tag>{ID}</Tag>
          ]}
        />
      </Row>
      <Divider />
    </Fragment>
  );
};

export default RoundHeader;
