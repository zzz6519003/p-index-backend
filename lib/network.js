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

  static async _all() {
    const data = await Deno.readTextFile("pindex.yml");
    const parsedData = YAML.parse(data);
    const parsedNetwork = parsedData["shared"]["networks"];

    // console.log(parsedNetwork);
    return Object.entries(parsedNetwork).map((network) => {
      // console.log(Object.entries(parsedNetwork));
      return new Network(
        network[0],
        network[1].chain_id,
        network[1].rpc,
        network[1].explorer,
        network[1].max_scan_range || 20000,
        network[1].polling_interval || 5
      );
    });
  }
}