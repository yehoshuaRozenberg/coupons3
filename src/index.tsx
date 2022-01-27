import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter} from 'react-router-dom';
import Layout from './Components/mainLayout/layout/layout';

ReactDOM.render(
 
  <BrowserRouter>
    <Layout />
  </BrowserRouter>,
  
  document.getElementById('root')
);

reportWebVitals();
