import './app-info.css'

const AppInfo = ({award, numEmployees}) => {
    return (
        <div className="app-info">
            <h1>Accounting for employees in the Epam company N</h1>
            <h2>Total number of employees: {numEmployees}</h2>
            <h2>Will receive an award: {award}</h2>
        </div>
    )
}

export default AppInfo