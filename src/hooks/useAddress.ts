type Address = {
  address: string;
  city: string;
  state: string;
  zipCode: number;
};

const useAddress = () => {
  const toString = (addr: Address) => {
    return `${addr.address} ${addr.city}, ${addr.state} ${addr.zipCode}`;
  };

  const toLabel = (addr: Address) => {
    return `${addr.address}\n${addr.city}, ${addr.state} ${addr.zipCode}`;
  };

  return {
    toString,
    toLabel,
  };
};

export default useAddress;
export type { Address };
