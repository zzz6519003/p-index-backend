import YAML from 'npm:yaml'

export class Network {
  constructor(
    name,
    chain_id,
    rpc,
    explorer,
    max_scan_range,
    polling_interval
  ) {
    this.name = name;
    this.chain_id = chain_id;
    this.rpc = rpc;
    this.explorer = explorer;
    this.max_scan_range = max_scan_range; // blocks
    this.polling_interval = polling_interval; // seconds
  }

  display_name() {
    return this.name.split('_').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  }

  // public get contracts(): Contract[] {
  //   return Contract.all.filter(contract => contract.network.name.toLowerCase() === this.name.toLowerCase());
  // }

  // public get startBlock(): number {
  //   let result = -1;
  //   this.contracts.forEach(contract => {
  //     contract.startBlock;
  //     if (result === -1 || contract.startBlock < result) {
  //       result = contract.startBlock;
  //     }
  //   });
  //   return result;
  // }

  // public static find(nameOrChainId: string | number): Network | undefined {
  //   if (typeof nameOrChainId === 'number') {
  //     return this.all().find(network => network.chainId === nameOrChainId);
  //   } else {
  //     return this.all().find(network => network.name.toLowerCase() === nameOrChainId.toLowerCase());
  //   }
  // }

  static async _all() {
    const data = await Deno.readTextFile("pindex.yml");
    const parsedData = YAML.parse(data);
    const parsedNetwork = parsedData["shared"]["networks"];

    // console.log(parsedNetwork);
    return Object.entries(parsedNetwork).map((entries) => {
      // console.log(Object.entries(parsedNetwork));
      return new Network(
        entries[0],
        entries[1].chain_id,
        entries[1].rpc,
        entries[1].explorer,
        entries[1].max_scan_range || 20000,
        entries[1].polling_interval || 5
      );
    });
  }
}