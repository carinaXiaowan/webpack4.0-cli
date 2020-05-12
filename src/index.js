require( '../src/assets/styles/common.less');
import React, {Component} from 'react'
import ReactDOM from 'react-dom'

class App extends Component {
    render() {
        return <div>react frame content.</div>
    }
}

ReactDOM.render(<App />, document.getElementById('root'));