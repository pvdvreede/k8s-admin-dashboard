import k8sProvider from './provider';
import { GET_LIST, GET_ONE, UPDATE } from 'react-admin';

const subj = k8sProvider('http://kubeapi:8080');

describe('get_list', () => {
  it('gets namespaces list', () => {
    return subj(GET_LIST, 'api/v1/namespaces', {
      pagination: { page: 1, perPage: 5 },
      sort: { field: 'name', order: 'ASC' },
    }).then((resp) => {
      expect(resp.total).toBe(3);
      expect(resp.data.map(x => x.id)).toEqual(['default', 'kube-public', 'kube-system'])
    });
  });

  it('gets nodes list with nothing', () => {
    return subj(GET_LIST, 'api/v1/nodes', {
      pagination: { page: 1, perPage: 5 },
      sort: { field: 'name', order: 'ASC' },
    }).then((resp) => {
      expect(resp.total).toBe(3);
      expect(resp.data.map(x => x.id)).toEqual(['test-node-1', 'test-node-2', 'test-node-3',])
    });
  });
});

describe('get_one', () => {
  it('gets a single namespace', () => {
    return subj(GET_ONE, 'api/v1/namespaces', {
      id: 'default',
    }).then((resp) => {
      expect(resp.data.id).toBe('default');
      expect(resp.data.metadata.name).toBe('default');
    });
  })
});

describe('update_one', () => {
  it('updates a single node', () => {
    return subj(UPDATE, 'api/v1/nodes', {
      id: 'test-node-1',
      data: {
        // spec: {
        //   unschedulable: true
        // }
      },
      previousData: {},
    }).then((resp) => {
      expect(resp.data.id).toBe('test-node-1');
      expect(resp.data.metadata.name).toBe('test-node-1');
      expect(resp.data.spec.unschedulable).toBe(true);
    });
  })
});
