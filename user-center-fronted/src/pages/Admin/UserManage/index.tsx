import {PlusOutlined} from '@ant-design/icons';
import type {ActionType, ProColumns} from '@ant-design/pro-components';
import {ProTable, TableDropdown} from '@ant-design/pro-components';
import {Button} from 'antd';
import {useRef} from 'react';

import {searchUsers} from "@/services/ant-design-pro/api";

export const waitTimePromise = async (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export const waitTime = async (time: number = 100) => {
  await waitTimePromise(time);
};

const columns: ProColumns<API.CurrentUser>[] = [
  {
    dataIndex: 'id',
    valueType: 'indexBorder',
    width: 48,
  },
  {
    title: '用户账号',
    dataIndex: 'userAccount',
    copyable: true,
    width: 120,
  },
  {
    title: '用户昵称',
    dataIndex: 'username',
  },
  {
    title: '头像',
    dataIndex: 'avatarUrl',
    valueType: 'avatar',
  },
  {
    title: '性别',
    dataIndex: 'gender',
  },
  {
    title: '手机号',
    dataIndex: 'phone',
  },
  {
    title: '邮箱',
    dataIndex: 'email',
  },
  {
    title: '用户角色',
    dataIndex: 'userRole',
    valueType: 'select',
    valueEnum: {
      99: {text: '管理员',
        status: 'success',},
      0: {text: '普通用户', status: 'default'},
      1: {text: 'VIP', status: 'processing'},
    },
  },
  {
    title: '用户状态',
    dataIndex: 'userStatus',
    valueType: 'select',
    valueEnum: {
      0: {text: '正常', status: 'success'},
      1: {text: '禁用',status: 'error'},
    },
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    valueType: 'dateTime',
    width: 180,
  },
  {

    title: '操作',
    valueType: 'option',
    render: () => [
      // <a key="link">编辑</a>,
      // <TableDropdown
      //   key="actionGroup"
      //   menus={[
      //     {key: 'copy', name: '复制'},
      //     {key: 'delete', name: '删除'},
      //   ]}
      // />,
      <a key={'link'}>编辑</a>,
      <a key={'link'}>查看</a>,
      <TableDropdown
        key={'actionGroup'}
        menus={[
          {key: 'copy', name: '复制'},
          {key: 'delete', name: '删除'},
        ]}
      />,
    ],
    width: 240,
  },
];

export default () => {
  const actionRef = useRef<ActionType>();

  return (
    <ProTable<API.CurrentUser>
      columns={columns}
      actionRef={actionRef}
      cardBordered
      // @ts-ignore
      request={async (params, sort, filter) => {
        console.log(sort, filter);
        await waitTime(2000);
        const userList = await searchUsers({...params, sorter: sort, filter});
        return {
          data: Array.isArray(userList) ? userList : [userList],
          total: 1,
        }
      }}
      editable={{
        type: 'multiple',
      }}
      columnsState={{
        persistenceKey: 'pro-table-singe-demos',
        persistenceType: 'localStorage',
        defaultValue: {
          option: {fixed: 'right', disable: true},
        },
        onChange(value) {
          console.log('value: ', value);
        },
      }}
      rowKey="id"
      search={{
        labelWidth: 'auto',
      }}
      options={{
        setting: {
          listsHeight: 400,
        },
      }}
      form={{
        // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
        syncToUrl: (values, type) => {
          if (type === 'get') {
            return {
              ...values,
              created_at: [values.startTime, values.endTime],
            };
          }
          return values;
        },
      }}
      pagination={{
        pageSize: 5,
        onChange: (page) => console.log(page),
      }}
      dateFormatter="string"
      headerTitle="高级表格"
      toolBarRender={() => [
        <Button
          key="button"
          icon={<PlusOutlined/>}
          onClick={() => {
            actionRef.current?.reload();
          }}
          type="primary"
        >
          新建
        </Button>,
      ]}></ProTable>
  );
};
