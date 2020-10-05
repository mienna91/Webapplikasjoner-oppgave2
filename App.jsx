import React from 'react';
import Navbar from './src/components/Navbar';
import Layout from './src/components/Layout';
import TodosContainer from './src/components/Todos/TodosContainer';

// import Search from './src/components/Search';
// import List from './src/components/List';

// TODO: Add TodosContainer
const App = () => (
  <>
    <Layout>
      <Navbar />
      <TodosContainer />
    </Layout>
  </>
);

export default App;
