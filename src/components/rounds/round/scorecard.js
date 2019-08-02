import React from "react";
import { Row, Col, Table, Icon, Checkbox, Button } from "antd";

const ScoreCard = ({
  components,
  columns,
  round,
  handleSubmit,
  handleCompleted,
  allowSubmission
}) => {
  return (
    <Table
      components={components}
      bordered
      dataSource={round.scorecard}
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
              <Button
                type="primary"
                onClick={e => handleSubmit(e)}
                disabled={!allowSubmission}
              >
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
