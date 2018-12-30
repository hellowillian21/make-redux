// const appState = {
//   title: {
//     text: '这是标题',
//     color: 'red'
//   },
//   content: {
//     text: '这是内容',
//     color: 'blue'
//   }
// }

function createStore(stateChanger) {
  let state = null
  // 发布订阅模式
  const listeners = []
  const subscribe = (listener) => listeners.push(listener)

  const getState = () => state
  const dispath = (action) => {
    state = reducer(state, action) // 覆盖原对象
    listeners.forEach((listener) => listener())
  }
  dispath({}) // 初始化state
  return {getState, dispath, subscribe}
}

function reducer(state, action) {
  if(!state) {
    return {
      title: {
        text: '这是标题',
        color: 'red'
      },
      content: {
        text: '这是内容',
        color: 'blue'
      }
    }
  }
  switch (action.type) {
    case 'UPDATE_TITLE_TEXT':
      return { // 构建新对象并返回
        ...state,
        title: {
          ...state.title,
          text: action.text
        }
      }
    case 'UPDATE_TITLE_COLOR':
      return {
        ...state,
        title: {
          ...state.title,
          color: action.color
        }
      }
    default:
      return state // 没有修改，返回原来的对象
  }
}

function renderApp(newAppState, oldAppState = {}) {
  // 没有数据变化就不渲染
  if(newAppState === oldAppState) return
  console.log('render app...')
  renderTitle(newAppState.title, oldAppState.title)
  renderContent(newAppState.content, oldAppState.content)
}

function renderTitle(newTitle, oldTitle = {}) {
  if(newTitle === oldTitle) return
  console.log('render title...')
  const titleDOM = document.getElementById('title')
  titleDOM.innerHTML = newTitle.text
  titleDOM.style.color = newTitle.color
}

function renderContent(newContent, oldContent = {}) {
  if(newContent === oldContent) return
  console.log('render content...')
  const contentDOM = document.getElementById('content')
  contentDOM.innerHTML = newContent.text
  contentDOM.style.color = newContent.color
}

const store = createStore(reducer)
let oldState = store.getState() // 缓存旧的state

store.subscribe(() => {
  const newState = store.getState()
  // 把新旧的State传进去渲染
  renderApp(newState, oldState)
  oldState = newState
})

renderApp(store.getState()) // 首次渲染页面
store.dispath({type: 'UPDATE_TITLE_TEXT', text: '修改了标题'})
store.dispath({type: 'UPDATE_TITLE_COLOR', color: 'blue'})