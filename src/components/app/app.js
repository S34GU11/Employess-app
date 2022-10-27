import {Component} from "react"

import AppInfo from "../app-info/app-info"
import SearchPanel from "../search-panel/search-panel"
import AppFilter from "../app-filter/app-filter"
import EmployeesList from "../employees-list/employees-list"
import EmployeesAddForm from "../employees-add-form/employees-add-form"

import './app.css'

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [
                {name: 'Serhii', salary: 1500, increase: false, rise: true, id: 1},
                {name: 'Olha', salary: 3500, increase: false, rise: true, id: 2},
                {name: 'Dmytro', salary: 1000, increase: false, rise: false, id: 3},
            ],
            term: '',
            filter: 'all',

        }
        this.maxId = 4
    }

    deleteItem = (id) => {
        this.setState(({data}) => ({
            data: data.filter(item => item.id !== id)
        }))
    }

    addItem = (name, salary) => {
        this.setState(({data}) => ({
            data: [...data,                // newArr
                {                          // newItem
                    name,
                    salary,
                    increase: false,
                    rise: false,
                    id: this.maxId++
                }
            ],
        }))
    }

    onToggleProp = (id, prop) => {
        this.setState(({data}) => ({
            data: data.map(item =>
                item.id === id
                    ? {...item, [prop]: !item[prop]}
                    : item
                )
            })
        )
    }

    searchEmp = (items, term) => {
        if (term.length === 0) return items
        return items.filter(item =>
            item.name.indexOf(term) > -1
        )
    }

    onUpdateSearchGlobal = (term) => {
        this.setState({term})
    }

    filterPost = (items, filter) => {
        switch (filter) {
            case 'rise':
                return items.filter(item => item.rise)
            case 'moreThen1000':
                return items.filter(item => item.salary > 1000)
            default:
                return items
        }
    }

    onFilterSelect = (filter) => {
        this.setState(({filter}))
    }

    render() {
        const {data, term, filter} = this.state
        const numEmployees = this.state.data.length
        const award = this.state.data.filter(item => item.increase).length
        const visibleData = this.filterPost(this.searchEmp(data, term), filter)

        return (
            <div className="app">
                <AppInfo numEmployees={numEmployees}
                         award={award}/>
                <div className="search-panel">
                    <SearchPanel onUpdateSearchGlobal={this.onUpdateSearchGlobal}/>
                    <AppFilter filter={filter}
                               onFilterSelect={this.onFilterSelect}/>
                </div>
                <EmployeesList data={visibleData}
                               onDelete={this.deleteItem}
                               onToggleProp={this.onToggleProp}/>
                <EmployeesAddForm onAdd={this.addItem}/>
            </div>
        )
    }
}

export default App