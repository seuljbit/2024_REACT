import './App.css';
import UserList from '../src/component/UserList';
import StoreList from '../src/component/StoreList';

function App() {
  return (
    <div className="App">
      <UserList /> <br />
      <h3> 맛집 리스트 </h3>
      <StoreList /> <br />
    </div>
  );
}

export default App;
