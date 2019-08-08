import React from 'react';
import { Row, PageHeader } from 'antd';

const RoundLabel = ({ label }) => {
  return (
    <Row gutter={40}>
      <PageHeader title={label} />
    </Row>
  );
}

export default RoundLabel;