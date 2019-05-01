import React from 'react';
import { Admin, Resource } from 'react-admin';
import { NodeList, NodeShow } from './kubernetes/Nodes';
import k8sProvider from './provider';
import NodeIcon from '@material-ui/icons/Computer';

const dataProvider = k8sProvider('http://localhost:8080', 'asv');
const App = () => (
  <Admin dataProvider= { dataProvider } >
    <Resource icon={ NodeIcon } options={{ label: 'Nodes' }} name="api/v1/nodes" list={ NodeList } show={ NodeShow } />
  </Admin >
);

export default App;
