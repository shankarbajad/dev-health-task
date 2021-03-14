import {
	BrowserRouter as Router,
	Switch,
	Route,
} from "react-router-dom";

import MainFrame from './Components/MainFrame/MainFrame';
import Dashboard from './Components/Dashboard/Dashboard';
import Settings from './Components/Settings/Settings';
import './App.css';

function App() {
	return (
		<Router>
			<Switch>
				<MainFrame>
					<Route exact path="/" component={Dashboard}/>
					<Route exact path="/settings" component={Settings}/>
				</MainFrame>
			</Switch>
		</Router>
	);
}

export default App;
