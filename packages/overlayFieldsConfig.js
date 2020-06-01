import lodash from 'lodash'
const
  defaultData = [{
      id: 1,
      name: "张三",
      sex: "男",
      date: "1994-02-23 00:00:00",
    },
    {
      id: 2,
      name: "李四",
      sex: "女",
      date: "1994-02-23 00:00:00",
    },
    {
      id: 3,
      name: "王五",
      sex: "女",
      date: "1994-02-23 00:00:00",
    },
    {
      id: 4,
      name: "赵六",
      sex: "男",
      date: "1994-02-23 00:00:00",
    },
  ];

function getRemoteData() {
  let remoteData = localStorage.getItem('remoteData')
  if ((remoteData || '') == '') {
    remoteData = lodash.clone(defaultData);
    localStorage.setItem('remoteData', JSON.stringify(remoteData))
  } else {
    remoteData = JSON.parse(remoteData)
  }
  return remoteData
}

function setRemoteData(remoteData) {
  localStorage.setItem('remoteData', JSON.stringify(remoteData))
}

function crudFetchData(page) {
  console.log('page', page)
  return new Promise((resolve) => {
    let remoteData = getRemoteData();
    resolve(remoteData)
  })
}

function crudAddRecord(newRecord) {
  console.log('newRecord', newRecord)
  return new Promise((resolve) => {
    let remoteData = getRemoteData()
    if (!newRecord.id) {
      newRecord.id = remoteData.length ? remoteData[remoteData.length - 1].id + 1 : 0;
    } else {
      if (remoteData.some(record => record.id == newRecord.id)) {
        alert('记录已存在')
        return
      }
    }
    remoteData.push(newRecord)
    setRemoteData(remoteData);
    resolve()
  })
}

function crudUpdateRecord(record) {
  return new Promise((resolve) => {
    let remoteData = getRemoteData()
    remoteData.forEach(item => {
      if (item.id == record.id) {
        item = lodash.clone(record)
      }
    })
    setRemoteData(remoteData)
    resolve()
  })
}

function crudDelRecord(record) {
  return new Promise((resolve) => {
    let remoteData = getRemoteData()
    let updated = remoteData.filter(item => item.id != record.id)
    setRemoteData(updated)
    resolve()
  })
}
export default [{
  title: 'AVIC字段',
  list: [{
    type: 'crud',
    label: 'crud表格',
    icon: 'icon-group',
    display: true,
    typeslot: true,
    slot: true,
    formslot: true,
    funcs: {
      fetchData: crudFetchData,
      add: crudAddRecord,
      update: crudUpdateRecord,
      delete: crudDelRecord
    },
    options: {
      title: "表格的标题",
      page: true,
      selection: true,
      align: "center",
      menuAlign: "center",
      leftButtons: [],
      column: [{
          label: "姓名",
          prop: "name",
        },
        {
          label: "性别",
          prop: "sex",
        },
        {
          label: "日期",
          prop: "date",
          type: "date",
          format: "yyyy-MM-dd hh:mm:ss",
          valueFormat: "yyyy-MM-dd hh:mm:ss",
        },
      ],
    },
    children: {
      column: []
    }
  }, {
    type: 'modal',
    label: '弹窗',
    icon: 'icon-table',
    span: 24,
    display: true,
    options: {
      fieldMappings: []
    },
    children: {
      submitBtn: false,
      emptyBtn: false,
      column: []
    }
  }]
}, ]