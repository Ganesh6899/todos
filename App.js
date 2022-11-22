import React,{Component} from 'react'
class App extends Component{
  constructor(props){
    super(props)
    this.state={
      todos:[],
      isLoading:false,
      isError:false
    }
  }

  async componentDidMount(){
    this.setState({isLoading:true})
    const response = await fetch("https://jsonplaceholder.typicode.com/todos")

    if(response.ok){
      const todos = await response.json()
      console.log(todos)
      this.setState({todos,isLoading:false})

    }else{
      this.setState({isError:true,isLoading:false})

    }
  }

  renderTableHeader = () => {
    return Object.keys(this.state.todos[0]).map(attr => <th key={attr}>
      {attr.toUpperCase()}
    </th>)

  }
  renderTableRows = () => {
    return this.state.todos.map(todos => {
      return(
        <tr key={todos.id}>
          <td>{todos.userId}</td>
          <td>{todos.id}</td>
          <td>{todos.title}</td>
          <td>{todos.completed}</td>
        </tr>
      )
    })

  }
  render(){ 
    const {todos,isLoading,isError} = this.state
  
    if(isLoading){
      return <div>Loading...</div>
    }
    if(isError){
      return <div>Error...</div>
    }
    return todos.length > 0
    ? (
      <table>
        <thead>
          <tr>
            {this.renderTableHeader()}
          </tr>
        </thead>
        <tbody>
          {this.renderTableRows()}
        </tbody>
      </table>

    ):(
      <div>No user</div>
    )
  }

}
export default App
