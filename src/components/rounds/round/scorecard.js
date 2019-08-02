import React from "react";
import { Row, Col, Table, Icon, Checkbox, Button } from "antd";

const ScoreCard = ({
  components,
  columns,
  round,
  handleSubmit,
  handleCompleted
}) => {
  return (
    <Table
      components={components}
      bordered
      dataSource={round.scorecard}
      bordered
      columns={columns}
      rowClassName="editable-row"
      pagination={false}
      scroll={{ x: true }}
      footer={() => {
        return (
          <Row>
            <Col span={24} style={{ textAlign: "right" }}>
              <Checkbox onChange={handleCompleted}>Finish</Checkbox>
              {/* Hook up final submission */}
              <Button type="primary" onClick={e => handleSubmit(e)}>
                Submit <Icon type="save" />
              </Button>
            </Col>
          </Row>
        );
      }}
    />
  );
};

export default ScoreCard;
