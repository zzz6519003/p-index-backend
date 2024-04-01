// const { Network } = require('./network');
import { Network } from './network.js';
// import { describe } from 'npm:jest';

describe('Network', () => {
  describe('_all', () => {
    it('should return an array of Network instances', async () => {
      // Mock the data and parsedNetwork
      const data = `
        shared:
          networks:
            network1:
              chain_id: 1
              rpc: http://localhost:8545
              explorer: https://explorer.network1.com
              max_scan_range: 20000
              polling_interval: 5
            network2:
              chain_id: 2
              rpc: http://localhost:8546
              explorer: https://explorer.network2.com
              max_scan_range: 30000
              polling_interval: 10
      `;
      const parsedNetwork = {
        network1: {
          chain_id: 1,
          rpc: 'http://localhost:8545',
          explorer: 'https://explorer.network1.com',
          max_scan_range: 20000,
          polling_interval: 5,
        },
        network2: {
          chain_id: 2,
          rpc: 'http://localhost:8546',
          explorer: 'https://explorer.network2.com',
          max_scan_range: 30000,
          polling_interval: 10,
        },
      };

      // Mock the Deno.readTextFile method
      jest.spyOn(Deno, 'readTextFile').mockResolvedValue(data);

      // Call the _all method
      const networks = await Network._all();

      // Assert the result
      expect(networks).toEqual([
        new Network(
          'network1',
          1,
          'http://localhost:8545',
          'https://explorer.network1.com',
          20000,
          5
        ),
        new Network(
          'network2',
          2,
          'http://localhost:8546',
          'https://explorer.network2.com',
          30000,
          10
        ),
      ]);

      // Restore the original Deno.readTextFile method
      jest.restoreAllMocks();
    });
  });
});