import React, { Fragment } from "react";
import { Query, withApollo } from "react-apollo";
import gql from "graphql-tag";
import {
  Row,
  Col,
  PageHeader,
  Table,
  Input,
  Popconfirm,
  Form,
  Divider,
  Icon,
  Checkbox,
  Button,
  Tag
} from "antd";

const ROUND_Q = gql`
  query roundInfo($roundID: ID!) {
    round(where: { id: $roundID }) {
      teeTime
      scorecard
      courses {
        name
        id
        holes
      }
      players {
        id
        name
        handicap
        status
      }
      complete
    }
  }
`;

const EditableContext = React.createContext();

class EditableCell extends React.Component {
  getInput = () => {
    return <Input />;
  };

  getHoleID(data, index) {
    const id = index.match(/\d/g);
    return id ? data.hole[id.join("")].putts : "";
  }

  renderCell = ({ getFieldDecorator }) => {
    const {
      editing,
      dataIndex,
      title,
      inputType,
      record,
      index,
      children,
      ...restProps
    } = this.props;

    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item style={{ margin: 0, width: "100%" }}>
            {getFieldDecorator(dataIndex, {
              initialValue: this.getHoleID(record, dataIndex)
            })(this.getInput())}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };

  render() {
    return (
      <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>
    );
  }
}

class EditableTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = { editingKey: "", isFirstRender: true, roundComplete: false };

    this.columns = [
      {
        title: "Player",
        dataIndex: "name",
        key: "name"
      }
    ];

    // Append the all holes
    for (var i = 0; i < 18; i++) {
      this.columns.push({
        title: i + 1,
        dataIndex: `hole[${i}].putts`,
        key: `hole-${i}`,
        align: "center",
        editable: true
      });
    }

    this.columns.push({
      title: "Total",
      dataIndex: "total",
      key: "total",
      defaultSortOrder: "ascend",
      sorter: (a, b) => a.total - b.total,
      align: "right"
    });

    this.columns.push({
      title: "",
      dataIndex: "operation",
      align: "center",
      render: (text, record) => {
        const { editingKey } = this.state;
        const editable = this.isEditing(record);
        return editable ? (
          <span>
            <EditableContext.Consumer>
              {form => (
                <a
                  href="javascript:;"
                  onClick={() => this.save(form, record.key)}
                  style={{ marginRight: 8 }}
                >
                  <Icon type="save" />
                </a>
              )}
            </EditableContext.Consumer>
            <Popconfirm
              title="Sure to cancel?"
              onConfirm={() => this.cancel(record.key)}
            >
              <a>
                <Icon type="close-circle" />
              </a>
            </Popconfirm>
          </span>
        ) : (
          <a disabled={editingKey !== ""} onClick={() => this.edit(record.key)}>
            <Icon type="edit" />
          </a>
        );
      }
    });
  }

  isEditing = record => {
    return record.key === this.state.editingKey;
  };

  cancel = () => {
    this.setState({ editingKey: "", isFirstRender: true });
  };

  save(form, key) {
    form.validateFields((error, row) => {
      if (error) {
        return;
      }

      const currentData = { ...this.state.data };
      const round = currentData.round;

      const index = round.scorecard.findIndex(item => key === item.key);
      const rowData = [];
      let score = 0;

      for (var i = 0; i < row.hole.length; i++) {
        score += parseInt(row.hole[i].putts, 10);

        rowData.push({
          number: i + 1,
          putts: parseInt(row.hole[i].putts, 10)
        });
      }

      const scorecardData = {
        key: index,
        id: round.players[index].id,
        name: round.scorecard[index].name,
        hole: rowData,
        total: score
      };

      const item = round.scorecard[index];

      round.scorecard.splice(index, 1, {
        ...item,
        ...row
      });

      round.scorecard[index] = scorecardData;
      this.setState({ editingKey: "" });

      this.props.client.mutate({
        mutation: gql`
          mutation upateScorecard($id: ID, $scorecard: Json) {
            updateRound(where: { id: $id }, data: { scorecard: $scorecard }) {
              id
              scorecard
            }
          }
        `,
        variables: {
          id: this.props.match.params.id,
          scorecard: round.scorecard
        }
      });
    });
  }

  edit(key) {
    this.setState({ editingKey: key });
  }

  handleSubmit(e) {
    e.preventDefault();

    if (!this.state.roundComplete) return false;

    this.props.client.mutate({
      mutation: gql`
        mutation upateScorecard($id: ID, $complete: Boolean) {
          updateRound(where: { id: $id }, data: { complete: $complete }) {
            id
          }
        }
      `,
      variables: {
        id: this.props.match.params.id,
        complete: this.state.roundComplete
      }
    });
  }

  handleCompleted = e => {
    this.setState({
      roundComplete: e.target.checked
    });
  };

  render() {
    const roundID = this.props.match.params.id;
    const components = {
      body: {
        cell: EditableCell
      }
    };

    const columns = this.columns.map(col => {
      if (!col.editable) {
        return col;
      }

      return {
        ...col,
        onCell: record => ({
          record,
          inputType: "number",
          dataIndex: col.dataIndex,
          title: col.title,
          editing: this.isEditing(record)
        })
      };
    });

    return (
      <Query
        query={ROUND_Q}
        variables={{ roundID }}
        onCompleted={data => this.setState({ data })}
        fetchPolicy="cache-and-network"
        errorPolicy="ignore"
      >
        {({ loading, error, data }) => {
          console.log(data);
          return (
            <EditableContext.Provider value={this.props.form}>
              {error ? <div>{error}</div> : null}
              {loading ? <div>{loading}</div> : null}
              {data.round && (
                <Fragment>
                  <PageHeader
                    onBack={() => window.history.back()}
                    title={data.round.courses[0].name}
                    subTitle={`Date: ${new Date(data.round.teeTime)}`}
                    extra={[
                      <Tag
                        color={`${data.round.complete ? "green" : "orange"}`}
                      >
                        {data.round.complete ? "Complete" : "In progress"}
                      </Tag>,
                      <Tag>{roundID}</Tag>
                    ]}
                  />
                  <Divider />
                  <Table
                    components={components}
                    bordered
                    dataSource={data.round.scorecard}
                    bordered
                    columns={columns}
                    rowClassName="editable-row"
                    pagination={false}
                    footer={() => {
                      return (
                        <Row>
                          <Col span={24} style={{ textAlign: "right" }}>
                            <Checkbox onChange={this.handleCompleted}>
                              Finish
                            </Checkbox>
                            {/* Hook up final submission */}
                            <Button
                              type="primary"
                              onClick={e => this.handleSubmit(e)}
                            >
                              Submit <Icon type="save" />
                            </Button>
                          </Col>
                        </Row>
                      );
                    }}
                  />
                </Fragment>
              )}
            </EditableContext.Provider>
          );
        }}
      </Query>
    );
  }
}

export const Round = withApollo(Form.create()(EditableTable));
