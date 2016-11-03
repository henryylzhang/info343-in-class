"use strict";

/*var females = BABYNAMES.filter(function(record) {
    return "F" == record.sex;
})*/

var females = BABYNAMES.filter(record => "F" == record.sex);  
/* => replaces function, don't need parens for single parameter, and return statement*/

var topFemNames = females.sort((rec1, rec2) => rec2.count - rec1.count).slice(0,100);
console.log(topFemNames.length);

//main application React component
class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        var colMeta = {
            count: {
                type: columnTypes.numeric,
                caption: "Num of Babies"
            }
        }
        return (
            <div className="container">
                <h1>Most Popular Female Baby Names from 1996</h1>
                <DataTable records={this.props.records} columnMeta={colMeta}/>
            </div>
        );
    }
}

//render the App component to the element with id="app"
ReactDOM.render(<App records={topFemNames}/>, document.getElementById("app"));
//comes in as a props object to the constructor


// <ul>
//     {   //records comes from the app props you passed in
//         this.props.records.map(record => <li key={record.name}>{record.name} {record.count}</li>)
//     }
// </ul>