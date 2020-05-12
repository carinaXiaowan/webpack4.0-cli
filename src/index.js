require( '../src/assets/styles/common.less');
import React, {Component} from 'react'
import ReactDOM from 'react-dom'

class App extends Component {
    constructor(){
       super()
    }
    componentDidMount(){
        this.gandleGetId().then(()=>{
            console.info(2)
        })
    }
    gandleGetId = ()=>{
        return new Promise((resolve)=>{
            console.info(1)
            resolve()
        })
    }
    render() {
        return <div>react frame content.</div>
    }
}

ReactDOM.render(<App />, document.getElementById('root'));