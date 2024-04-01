import YAML from 'npm:yaml'

export class Network {
    name: string;
    rpc: string;
    chain_id: number;
    max_scan_range: number;
    explorer: string;
    polling_interval: number;
  
    constructor(
      name: string,
      chain_id: number,
      rpc: string,
      explorer: string,
      max_scan_range: number,
      polling_interval: number
    ) {
      this.name = name;
      this.chain_id = chain_id;
      this.rpc = rpc;
      this.explorer = explorer;
      this.max_scan_range = max_scan_range; // blocks
      this.polling_interval = polling_interval; // seconds
    }

//   contracts(): Contract[] {
//     return Contract.all.filter((contract) => contract.network.name.toLowerCase() === this.name.toLowerCase());
//   }

//   start_block(): number {
//     let result = -1;
//     this.contracts().forEach((contract) => {
//       contract.start_block();
//       if (result === -1 || contract.start_block() < result) {
//         result = contract.start_block();
//       }
//     });
//     return result;
//   }

  display_name(): string {
    return this.name.split('_').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  }

//   static all(): Network[] {
//     // return _all();
//   }

//   static find(name_or_chain_id: string | number): Network | undefined {
//     if (typeof name_or_chain_id === 'number') {
//       return this.all().find((network) => network.chain_id === name_or_chain_id);
//     } else {
//       return this.all().find((network) => network.name.toLowerCase() === name_or_chain_id.toLowerCase());
//     }
//   }

  private static async _all(): Promise<Network[]> {
    const data = await Deno.readTextFile("pindex.yml");
    const parsedData = YAML.parse(data);
    const parsedNetwork = parsedData["shared"]["networks"];
    // console.log(parsedData["shared"]["networks"]);

    return parsedNetwork.map((name: string, network: any) => {
      return new Network(
        name,
        network.chain_id,
        network.rpc,
        network.explorer,
        network.max_scan_range || 20000,
        network.polling_interval || 5
      );
    });
  }
}