import React, { Fragment } from "react";
import RoundLabel from './roundLabel';
import { Row, Col, Table, Icon, Checkbox, Button } from "antd";

const ScoreCard = ({
  components,
  columns,
  round,
  handleSubmit,
  handleCompleted,
  allowSubmission,
  roundLabel,
  roundID,
  hideFooter
}) => {
  return (
    <Fragment>
      {roundLabel && <RoundLabel label={roundLabel} />}
      <Table
        components={components}
        bordered
        dataSource={round.scorecard}
        columns={columns}
        rowClassName="editable-row"
        pagination={false}
        scroll={{ x: true }}
        footer={() => {
          if (!hideFooter) {
            return (
              <Row>
                <Col span={24} style={{ textAlign: "right" }}>
                  <Checkbox onChange={handleCompleted}>Finish</Checkbox>
                  {/* Hook up final submission and store snapshot */}
                  <Button
                    type="primary"
                    onClick={e => handleSubmit(e), roundID}
                  disabled={!allowSubmission}
                  >
                  Submit <Icon type="save" />
                </Button>
              </Col>
            </Row>);
}
}} />
    </Fragment>
  );
};

export default ScoreCard;
