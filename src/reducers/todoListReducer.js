import todoListTypes from '../actions/actionTypes';

let initState = [
  {
    id: 1,
    title: '阅读',
    content: '《十万个为什么》',
    isFinish: true
  },
  {
    id: 2,
    title: '睡觉',
    content: '21：00',
    isFinish: false
  },
  {
    id: 3,
    title: '运动',
    content: '打篮球',
    isFinish: false
  },
  {
    id: 4,
    title: '散步',
    content: '棠湖公园',
    isFinish: true
  },
  {
    id: 5,
    title: '玩游戏',
    content: '王者荣耀',
    isFinish: false
  },
  {
    id: 6,
    title: '吃饭',
    content: '西红柿炒饭',
    isFinish: true
  }
]

initState = sessionStorage.getItem('initState')?JSON.parse(sessionStorage.getItem('initState')):initState
console.log(initState)

export default (state = initState, action) => {
  switch(action.type) {
    case todoListTypes.TODOLIST_DEL:
      const delState = state.filter(item => {
        return item.id !== action.payload.id
      })
      sessionStorage.setItem('initState', JSON.stringify(delState))
      return delState
    case todoListTypes.TODOLIST_ADD:
      const addState = state.concat({ ...action.payload })
      sessionStorage.setItem('initState', JSON.stringify(addState))
      return addState
    case todoListTypes.TODOLIST_EDIT:
      const editState = state.map(item => {
        if (item.id === action.payload.id) {
          item.content = action.payload.content
        }
        return item
      })
      sessionStorage.setItem('initState', JSON.stringify(editState))
      return editState
    case todoListTypes.TODOLIST_FINISH:
      const finishState = state.map(item => {
        if (item.id === action.payload.id) {
          item.isFinish = action.payload.isFinish
        }
        return item
      })
      sessionStorage.setItem('initState', JSON.stringify(finishState))
      return finishState
    default:
      return state
  }
}

// let shopDetailInfo = sessionStorage.getItem('shopDetailInfo')?JSON.parse(sessionStorage.getItem('shopDetailInfo')):{};
// let detailId = sessionStorage.getItem('detailId')?sessionStorage.getItem('detailId'):'';
// let defaultState = {
//     shopDetailInfo,
//     detailId
// };
// export const homeData = (state = defaultState, action = {}) => {
//     switch (action.type) {
//         case home.SAVEPRODUCTDETAIL:
//             sessionStorage.setItem('shopDetailInfo', JSON.stringify(action.data));
//             return {...state, ...{shopDetailInfo: action.data}};
//         case home.SAVEDETAILID:
//             sessionStorage.setItem('detailId', action.data);
//             return {...state, ...{detailId: action.data}};
//         default:
//             return state;
//     }
// }