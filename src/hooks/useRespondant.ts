import useAddress, { Address } from "./useAddress";
import { Person, ComingTo } from "./useRSVP";

type Respondant = {
  names: Person[];
  lastname: string;
  plusOne?: Person;
  address: Address;
  comingTo: ComingTo;
  getsPlusOne: boolean;
};

const useRespondant = () => {
  const addressHook = useAddress();
  const generateFamilyName = (resp: Respondant) => {
    return (
      [...resp.names.map((person) => person.name)].slice(0, 2).join(" & ") +
      " " +
      resp.lastname +
      (resp.names.length > 2 ? " & Family" : "")
    );
  };

  const toLabel = (resp: Respondant) => {
    return `${generateFamilyName(resp)}\n${addressHook.toLabel(resp.address)}`;
  };

  const data = (resp: Respondant) => {
    return {
      names: [...resp.names].map((person) => person),
      lastname: resp.lastname,
      getsPlusOne: resp.getsPlusOne,
      plusOne: resp.plusOne ? resp.plusOne : null,
      address: resp.address,
      comingTo: resp.comingTo,
    };
  };

  return {
    generateFamilyName,
    toLabel,
    data,
  };
};

export default useRespondant;
export type { Respondant };
