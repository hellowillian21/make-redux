const appState = {
  title: {
    text: '这是标题',
    color: 'red'
  },
  content: {
    text: '这是内容',
    color: 'blue'
  }
}

function createStore(state, stateChanger) {
  const listeners = []
  const subscribe = (listener) => listeners.push(listener)

  const getState = () => state
  const dispath = (action) => {
    stateChanger(state, action)
    listeners.forEach((listener) => listener())
  }
  return {getState, dispath, subscribe}
}

function stateChanger(state, action) {
  switch (action.type) {
    case 'UPDATE_TITLE_TEXT':
      state.title.text = action.text
      break
    case 'UPDATE_TITLE_COLOR':
      state.title.color = action.color
      break
    default:
      break
  }
}



// dispath负责修改数据
// function dispath(action) {
//   switch (action.type) {
//     case 'UPDATE_TITLE_TEXT':
//       appState.title.text = action.text
//       break
//     case 'UPDATE_TITLE_COLOR':
//     appState.title.color = action.color
//       break
//     default:
//       break
//   }
// }

function renderApp(appState) {
  renderTitle(appState.title)
  renderContent(appState.content)
}

function renderTitle(title) {
  const titleDOM = document.getElementById('title')
  titleDOM.innerHTML = title.text
  titleDOM.style.color = title.color
}

function renderContent(content) {
  const contentDOM = document.getElementById('content')
  contentDOM.innerHTML = content.text
  contentDOM.style.color = content.color
}

// renderApp(appState) // 首次渲染页面
// dispath({type: 'UPDATE_TITLE_TEXT', text: '修改了标题'})
// dispath({type: 'UPDATE_TITLE_COLOR', color: 'blue'})
// renderApp(appState) // 把新的数据渲染到页面上

const store = createStore(appState, stateChanger)
store.subscribe(() => renderApp(store.getState()))

renderApp(store.getState()) // 首次渲染页面
store.dispath({type: 'UPDATE_TITLE_TEXT', text: '修改了标题'})
store.dispath({type: 'UPDATE_TITLE_COLOR', color: 'blue'})
// renderApp(store.getState()) // 把新的数据渲染到页面上