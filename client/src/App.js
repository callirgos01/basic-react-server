import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import './App.css';
import logo from './robot-img.png';
import Queue from './components/queue';
const client = new ApolloClient({
    uri: 'http://localhost:5000/graphql'
});

function App() {
  return (
      <ApolloProvider client={client}>
         <div className="container">
            <img 
                src={logo} 
                alt="Robot" 
                style={{width:300, display:'block', margin:'auto'}}
            />
            <Queue/>
        </div>
      </ApolloProvider>
  );
}

export default App;
