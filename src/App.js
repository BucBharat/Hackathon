import logo from './logo.svg';
import { Button, Typography } from '@mui/material';
import './App.css';
import UserDashboard from './UserDashboard';
function App() {
  return (
    <div className="App">
      <UserDashboard />
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Typography variant="h4">Welcome to React with Material-UI</Typography>
        <Button variant="contained" color="primary">
          Click me!
        </Button>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;
