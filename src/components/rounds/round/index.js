import React, { Fragment } from "react";
import { Query, withApollo } from "react-apollo";
import calculateStablefordScore from "../../../helpers/stableford";

import { Input, Popconfirm, Form, Icon, Spin } from "antd";
import { ROUND_SINGLE_Q } from "../../../threads/queries";
import {
  UPDATE_ROUND_MUTATION,
  UPDATE_SCORECARD
} from "../../../threads/mutations";

import RoundHeader from "./header";
import ScoreCard from "./scorecard";

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

    this.columns.push(
      {
        title: "Total",
        dataIndex: "total",
        key: "total",
        defaultSortOrder: "ascend",
        sorter: (a, b) => a.total - b.total,
        align: "center"
      },
      {
        title: "Stableford",
        dataIndex: "stableford",
        key: "stableford",
        defaultSortOrder: "ascend",
        sorter: (a, b) => a.stableford - b.stableford,
        align: "center"
      }
    );

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
      let holeArray = [];
      let strokes = [];

      const index = round.scorecard.findIndex(item => key === item.key);
      const rowData = [];
      let score = 0;

      for (var i = 0; i < row.hole.length; i++) {
        strokes.push(parseInt(row.hole[i].putts, 10));
        score += parseInt(row.hole[i].putts, 10);

        rowData.push({
          number: i + 1,
          putts: parseInt(row.hole[i].putts, 10)
        });
      }

      round.courses[0].holes.items.map(hole => {
        holeArray.push([parseInt(hole.par, 10), parseInt(hole.index, 10)]);
      });

      const stablefordTotal = calculateStablefordScore(
        round.players[index].handicap,
        strokes,
        holeArray
      );

      const scorecardData = {
        key: index,
        id: round.players[index].id,
        name: round.scorecard[index].name,
        hole: rowData,
        total: score,
        stableford: stablefordTotal
      };

      const item = round.scorecard[index];

      round.scorecard.splice(index, 1, {
        ...item,
        ...row
      });

      round.scorecard[index] = scorecardData;
      this.setState({ editingKey: "" });

      this.props.client.mutate({
        mutation: UPDATE_ROUND_MUTATION,
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

  handleSubmit = e => {
    e.preventDefault();

    if (!this.state.roundComplete) return false;

    this.props.client.mutate({
      mutation: UPDATE_SCORECARD,
      variables: {
        id: this.props.match.params.id,
        complete: this.state.roundComplete
      }
    });
  };

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
        query={ROUND_SINGLE_Q}
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
              {loading ? <Spin /> : null}
              {data.round && (
                <Fragment>
                  <RoundHeader
                    round={data.round}
                    ID={roundID}
                    {...this.props}
                  />
                  <ScoreCard
                    round={data.round}
                    components={components}
                    columns={columns}
                    handleCompleted={this.handleCompleted}
                    handleSubmit={this.handleSubmit}
                    allowSubmission={this.state.roundComplete}
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
