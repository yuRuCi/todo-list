import React, { Component, createRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  Button,
  List,
  Card,
  Modal,
  Alert,
  Form,
  Input,
  message,
  Switch
 } from 'antd';
import {
  EditTwoTone,
  DeleteTwoTone,
  ExclamationCircleOutlined
} from '@ant-design/icons';
import { connect } from 'react-redux';
import { del, edit, add, finish } from '../../actions/actions'

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
}
const config = {
  rules: [{ required: true, message: '此项为必填项！！' }],
}

class Todolist extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      title: '',
      content: '',
      editId: null,
      editTitle: '',
      editVisible: false,
      editContent: ''
    }
    this.formRef = createRef()
    this.editFormRef = createRef()
  }
  // 删除
  confirmModal = item => {
    Modal.confirm({
      title: '提示',
      icon: <ExclamationCircleOutlined />,
      content: `是否要删除“${item.title}”?`,
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        this.props.del(item.id)
      },
      onCancel: () => {}
    })
  }
  // 添加
  titleVal = e => {
    this.setState(
      {
        title: e.currentTarget.value
      }
    )
  }
  contentVal = e => {
    this.setState(
      {
        content: e.currentTarget.value
      }
    )
  }
  showModal = () => {
    this.setState({
      visible: true
    })
  }
  handleOk = () => {
    this.formRef.current.validateFields()
    .then(() => {
      this.formRef.current.resetFields()
      this.setState({
        visible: false
      })
      this.props.add(this.state.title, this.state.content)
      message.success({
      content: 'Todo-List添加成功',
      style: {
        marginTop: '20vh'
      }
    })
    })
    .catch(() => {})
  }
  handleCancel = () => {
    this.setState({
      visible: false
    })
  }
  // 修改
  editContentVal = e => {
    this.setState(
      {
        editContent: e.currentTarget.value
      }
    )
  }
  editShowModal = item => {
    const currentId = item.id
    const currentTitle = item.title
    this.setState({
      editVisible: true,
      editId: currentId,
      editTitle: currentTitle
    })
  }
  editHandleOk = () => {
    this.editFormRef.current.validateFields()
    .then(() => {
      this.editFormRef.current.resetFields()
      this.setState({
        editVisible: false
      })
      this.props.edit(this.state.editId, this.state.editContent)
      message.success({
      content: 'Todo-List修改成功',
      style: {
        marginTop: '20vh'
      }
    })
    })
    .catch(() => {})
  }
  editHandleCancel = () => {
    this.setState({
      editVisible: false
    })
  }
  render() {
    return (
      <div>
        <Alert message="Todo-List" type="success" />
        <div style={{ padding: '16px 8px' }}>
          <List
            grid={{
              gutter: 16,
              xs: 1,
              sm: 2,
              md: 3,
              lg: 4,
              xl: 4,
              xxl: 6,
            }}
            dataSource={this.props.dataList}
            renderItem={item => (
              <List.Item>
                <Card 
                title={item.title}
                extra={<Switch
                  checkedChildren="已完成"
                  unCheckedChildren="进行中"
                  checked={ item.isFinish }
                  onClick={this.props.finish.bind(this, item.id )}
                />}
                actions={[
                  <EditTwoTone data-title={item} onClick={this.editShowModal.bind(this, item)} />,
                  <DeleteTwoTone onClick={this.confirmModal.bind(this, item)} />,
                ]}>
                  { item.content }
                </Card>
              </List.Item>
            )}
          />
        </div>
        <div>
          <Button type='primary' onClick={ this.showModal.bind(this) }>添加</Button>
          <Button type='danger'>
            <Link to='/home'>BACK</Link>
          </Button>
        </div>
        {/* 新--------------------增 */}
        <Modal
          title="添加Todo-List"
          visible={this.state.visible}
          okText= '添加'
          cancelText= '取消'
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Form
            {...layout}
            ref={ this.formRef }
            initialValues={
              { title: '', content: '' }
            }
          >
            <Form.Item
              label="Todo"
              name="title"
              { ...config }
            >
              <Input placeholder="请输入todo" onBlur={ this.titleVal.bind(this) } />
            </Form.Item>
            <Form.Item
              label="Todo内容"
              name="content"
              { ...config }
            >
              <Input placeholder="请输入todo内容" onBlur={ this.contentVal.bind(this) } />
            </Form.Item>
          </Form>
        </Modal>
        {/* 修--------------------改 */}
        <Modal
          title="修改Todo-List"
          visible={this.state.editVisible}
          okText= '修改'
          cancelText= '取消'
          onOk={this.editHandleOk}
          onCancel={this.editHandleCancel}
        >
          <Form
            {...layout}
            ref={ this.editFormRef }
            initialValues={
              { title: '', content: '' }
            }
          >
            <Form.Item
              label="Todo"
              name="title"
            >
              <Input placeholder={this.state.editTitle} disabled />
            </Form.Item>
            <Form.Item
              label="Todo内容"
              name="content"
              { ...config }
            >
              <Input placeholder="请输入todo内容" onBlur={ this.editContentVal.bind(this) } />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    dataList: state
  }
}

export default connect(mapStateToProps, { del, edit, add, finish })(Todolist)