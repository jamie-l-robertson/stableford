// import React, { Fragment } from "react";
// import { Query } from "react-apollo";
// import gql from "graphql-tag";
// import {
//   Table,
//   PageHeader,
//   Divider,
//   InputNumber,
//   Popconfirm,
//   Form,
//   Input
// } from "antd";

// const EditableContext = React.createContext();

// export const Round = props => {
//   const roundID = props.match.params.id;
//   return (
//     <React.Fragment>
//       <Query query={ROUND_Q} variables={{ roundID }}>
//         {({ loading, error, data }) => {
//           return (
//             <React.Fragment>
//               {error ? <div>{error}</div> : null}
//               {loading ? <div>{loading}</div> : null}
//               {data.round && (
//                 <Fragment>
//                   <PageHeader
//                     onBack={() => window.history.back()}
//                     title={data.round.courses[0].name}
//                     subTitle={`Date: ${data.round.teeTime}`}
//                   />
//                   <Divider />
//                   <Table
//                     columns={columns}
//                     dataSource={data.round.scorecard}
//                     bordered
//                     title={() => "Sorecard"}
//                     pagination={false}
//                   />
//                 </Fragment>
//               )}
//             </React.Fragment>
//           );
//         }}
//       </Query>
//     </React.Fragment>
//   );
// };

import React, { Fragment } from "react";
import { Query, withApollo } from "react-apollo";
import gql from "graphql-tag";
import {
  PageHeader,
  Table,
  Input,
  InputNumber,
  Popconfirm,
  Form,
  Divider,
  Icon
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
    }
  }
`;

// const data = [];
// for (let i = 0; i < 100; i++) {
//   data.push({
//     key: i.toString(),
//     name: `Edrward ${i}`,
//     age: 32,
//     address: `London Park no. ${i}`
//   });
// }
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
    this.state = { editingKey: "", isFirstRender: true };
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

      const newData = { ...this.state.data };
      const index = newData.round.scorecard.findIndex(item => key === item.key);

      // console.log(newData.round.scorecard[index].name);
      console.log(row);

      if (index > -1) {
        const item = newData.round.scorecard[index];
        newData.round.scorecard.splice(index, 1, {
          ...item,
          ...row
        });
        this.setState({ data: newData, editingKey: "" });
      } else {
        newData.push(row);
        this.setState({ data: newData, editingKey: "" });
      }

      const scorecardData = {
        id: newData.round.scorecard[index].id,
        name: newData.round.scorecard[index].name,
        holes: row
      };

      console.log(scorecardData);

      // this.props.client
      //   .mutate({
      //     mutation: gql`
      //       mutation upateScorecard($id: ID, $scorecard: Json) {
      //         updateRound(where: { id: $id }, data: { scorecard: $scorecard }) {
      //           id
      //         }
      //       }
      //     `,
      //     variables: {
      //       id: newData.round.scorecard[index].id,
      //       scorecard: {}
      //     }
      //   })
      //   .then(result => {
      //     console.log(result);
      //     return true;
      //   });
    });
  }

  edit(key) {
    this.setState({ editingKey: key });
  }

  setData = data => {
    if (this.state.isFirstRender) {
      this.setState({ data, isFirstRender: false });
    }

    console.log(this.state);
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
        onCompleted={data => this.setData(data)}
      >
        {({ loading, error, data }) => {
          return (
            <EditableContext.Provider value={this.props.form}>
              {error ? <div>{error}</div> : null}
              {loading ? <div>{loading}</div> : null}
              {data.round && (
                <Fragment>
                  <PageHeader
                    onBack={() => window.history.back()}
                    title={data.round.courses[0].name}
                    subTitle={`Date: ${data.round.teeTime}`}
                  />
                  <Divider />
                  <Table
                    components={components}
                    bordered
                    dataSource={this.state.data.round.scorecard}
                    bordered
                    columns={columns}
                    rowClassName="editable-row"
                    pagination={false}
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
