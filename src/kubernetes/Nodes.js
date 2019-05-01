import React from 'react';
import { List, Datagrid, TextField, Show, SimpleShowLayout, DateField, ChipField } from 'react-admin';

export const NodeList = (props) => (
  <List title="Nodes" {...props} perPage={25}>
    <Datagrid rowClick="show">
      <TextField label="Name" source="metadata.name" />
      <DateField label="Creation time" source="metadata.creationTimestamp" />
      <TextField label="Version" source="status.nodeInfo.kubeletVersion" />
    </Datagrid>
  </List>
);

export const NodeShow = (props) => (
  <Show title="Node" {...props}>
    <SimpleShowLayout>
      <TextField label="Name" source="metadata.name" />
      <DateField label="Creation time" source="metadata.creationTimestamp" />
      <ChipField label="Labels" source={(rec) => Object.keys(rec.metadata.labels).map((k, i) => `${k}: ${k[i]}`)} />
    </SimpleShowLayout>
  </Show>
);
