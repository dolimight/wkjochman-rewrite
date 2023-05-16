import { FC, FunctionComponent, useRef, useState } from "react";
import { ToastContainer } from "react-toastify";
import useCode from "../hooks/useCode";
import useRSVP, { Age, ComingTo, Person } from "../hooks/useRSVP";
import "react-toastify/dist/ReactToastify.css";
import Code from "../components/Code";
import {
  faRotateLeft,
  faPlus,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Respondant } from "../hooks/useRespondant";
import useFirebase from "../hooks/useFirebase";

type RSVPProps = {};

const RSVP: FC<RSVPProps> = ({}) => {
  const { code, handleCodeChange } = useCode();
  const { respondant, loading, weddingPhoto } = useRSVP(code);

  return (
    <>
      {!respondant ? (
        <div className="grid h-screen w-full place-items-center">
          <div className="mx-4 flex flex-col gap-4 text-center">
            <div className="flex flex-col gap-4 rounded-md bg-gray-50 py-6 md:px-16 md:py-14">
              <h1 className="text-xl font-semibold">
                Please Enter Your RSVP Code
              </h1>
              <Code
                length={6}
                onCompleted={handleCodeChange}
                loading={loading}
              />
            </div>
            <p className="text-sm text-gray-400">
              Please call <span className="text-primary">(920) 286-0139</span>{" "}
              if you have any troubles with your code.
            </p>
          </div>
        </div>
      ) : (
        <div className="flex h-screen w-full justify-center text-center">
          <RSVPForm respondant={respondant} weddingPhotoProp={weddingPhoto} />
        </div>
      )}
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="light"
      />
    </>
  );
};

interface RSVPFormProps {
  respondant: Respondant | null;
  weddingPhotoProp?: string;
}

const RSVPForm: FunctionComponent<RSVPFormProps> = ({
  respondant,
  weddingPhotoProp,
}) => {
  const {} = useFirebase();
  const res = respondant;
  const [names, setNames] = useState(res?.names ?? ([] as Person[]));
  const [personHistory, setPersonHistory] = useState([] as Person[]);
  const [plusOne, setPlusOne] = useState(res?.plusOne);
  const comingToRef = useRef<HTMLSelectElement>(null);
  const addressRef = useRef<HTMLInputElement>(null);
  const cityRef = useRef<HTMLInputElement>(null);
  const stateRef = useRef<HTMLInputElement>(null);
  const zipRef = useRef<HTMLInputElement>(null);
  const weddingPhotoRef = useRef<HTMLInputElement>(null);
  const [weddingPhoto, setWeddingPhoto] = useState<string | undefined>(
    weddingPhotoProp
  );

  const remove = (person: Person) => {
    setPersonHistory([...personHistory, person]);
    setNames(names.filter((p) => p !== person));
  };

  const undo = () => {
    const last = personHistory.pop();
    if (!last) return;
    setNames([...names, last]);
  };

  return (
    <div className="m-2 flex flex-col gap-6 rounded-md bg-gray-50 px-32 py-2">
      <h1 className="text-4xl font-bold">RSVP Form</h1>
      <form autoComplete="off" className="flex flex-col items-center gap-2">
        <h2 className="text-2xl font-semibold">People Invited</h2>
        {names.map((person) => (
          <RSVPPerson person={person} remove={remove} key={person.name} />
        ))}
        {personHistory.length !== 0 && (
          <button
            onClick={undo}
            type="button"
            className="rounded-md bg-red-500 p-2 text-white hover:brightness-105"
          >
            Undo <FontAwesomeIcon icon={faRotateLeft} />
          </button>
        )}
      </form>
      {res?.getsPlusOne && (
        <form autoComplete="off" className="flex flex-col items-center gap-2">
          <h2 className="text-lg font-semibold">
            Plus One
            {!plusOne && (
              <button
                type="button"
                onClick={() => {
                  setPlusOne({ name: "", age: Age.Adult });
                }}
                className="ml-2 h-10 w-10 rounded-md bg-green-500 text-white hover:brightness-105"
              >
                <FontAwesomeIcon icon={faPlus} />
              </button>
            )}
          </h2>
          {plusOne && (
            <RSVPPerson
              person={plusOne}
              remove={() => setPlusOne(undefined)}
              key={plusOne.name}
            />
          )}
        </form>
      )}
      <form autoComplete="on" className="flex flex-col items-center gap-2">
        <h2 className="text-lg font-semibold">Current Address</h2>
        <input
          className="h-10 w-full rounded-l-md bg-gray-100 p-2 focus:outline-none"
          type="text"
          id="address-in"
          name="address-in"
          placeholder="Address"
          autoComplete="street-address"
          defaultValue={res?.address.address ?? ""}
          ref={addressRef}
        />
        <input
          className="h-10 w-full rounded-l-md bg-gray-100 p-2 focus:outline-none"
          type="text"
          id="city"
          name="city"
          placeholder="City"
          autoComplete="address-level2"
          defaultValue={res?.address.city ?? ""}
          ref={cityRef}
        />
        <input
          className="h-10 w-full rounded-l-md bg-gray-100 p-2 focus:outline-none"
          type="text"
          id="state"
          name="state"
          placeholder="State"
          autoComplete="address-level1"
          defaultValue={res?.address.state ?? ""}
          ref={stateRef}
        />
        <input
          className="h-10 w-full rounded-l-md bg-gray-100 p-2 focus:outline-none"
          type="text"
          id="zipCode"
          name="zipCode"
          placeholder="Zip Code"
          autoComplete="postal-code"
          defaultValue={res?.address.zipCode.toString() ?? ""}
          ref={zipRef}
        />
        <h2 className="text-lg font-semibold">Wedding Photo</h2>
        <div className="w-48">
          {weddingPhoto && <img src={weddingPhoto} alt="" />}
        </div>
        <input
          type="file"
          id="weddingPhoto"
          name="weddingPhoto"
          accept="image/png, image/jpeg"
          ref={weddingPhotoRef}
          onChange={(event) => {
            const file = event.target.files?.item(0);
            if (file) {
              setWeddingPhoto(URL.createObjectURL(file));
            }
          }}
        ></input>
      </form>
      <form className="flex flex-col items-center gap-2">
        <h2 className="text-lg font-semibold">Coming to?</h2>
        <select defaultValue={res?.comingTo} ref={comingToRef}>
          {Object.values(ComingTo)
            .filter((i) => isNaN(Number(i)))
            .map((value, index) => (
              <option value={index} key={value}>
                {value}
              </option>
            ))}
        </select>
        <button type="button" onClick={async () => {}}>
          Submit
        </button>
      </form>
    </div>
  );
};

interface RSVPPersonProps {
  person: Person;
  remove: Function;
  onUpdate?: () => any;
}

const RSVPPerson: FunctionComponent<RSVPPersonProps> = ({
  person,
  remove,
  onUpdate,
}) => {
  return (
    <div className="w-fit rounded-md bg-gray-200 p-2">
      <input
        className="h-10 rounded-l-md bg-gray-100 p-2 focus:outline-none"
        type="text"
        placeholder="Name"
        id={person.name}
        defaultValue={person.name}
        autoComplete="off"
        onChange={(e) => {
          person.name = e.target.value;
          if (onUpdate) onUpdate();
        }}
      />
      <select
        className="h-10 rounded-r-md bg-gray-100"
        defaultValue={person.age.toString()}
        onChange={(e) => {
          person.age = parseInt(e.target.value);
        }}
      >
        <option value={Age.Adult}>Adult</option>
        <option value={Age.Kid}>Kid</option>
      </select>
      <button
        type="button"
        className="ml-2 h-10 w-10 rounded-md bg-red-500 text-white hover:brightness-105"
        onClick={() => {
          remove(person);
        }}
      >
        <FontAwesomeIcon icon={faXmark} />
      </button>
    </div>
  );
};

export default RSVP;
