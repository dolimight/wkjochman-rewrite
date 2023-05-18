import { FC, FunctionComponent, useCallback, useRef, useState } from "react";
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
import ConfettiExplosion from "react-confetti-explosion";
import classNames from "classnames";

type RSVPProps = {};

const RSVP: FC<RSVPProps> = ({}) => {
  const { code, handleCodeChange } = useCode();
  const { respondant, loading, weddingPhoto, updateRSVP } = useRSVP(code, () =>
    handleCodeChange("")
  );
  const [isExploding, setIsExploding] = useState(false);

  const handleDone = useCallback(
    async (res: Respondant, photo?: File | null) => {
      await updateRSVP(code, res, setIsExploding, photo);
    },
    [code]
  );

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
                placeholder={code ?? ""}
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
        <div className="grid place-items-center">
          <RSVPForm
            respondant={respondant}
            weddingPhotoProp={weddingPhoto}
            onDone={handleDone}
            isExploding={isExploding}
            setIsExploding={setIsExploding}
          />
        </div>
      )}

      <ToastContainer
        position="top-center"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable
        theme="light"
      />
    </>
  );
};

interface RSVPFormProps {
  respondant: Respondant | null;
  weddingPhotoProp?: string;
  onDone: (res: Respondant, photo?: File | null) => Promise<void>;
  isExploding?: boolean;
  setIsExploding: (isExploding: boolean) => void;
}

const RSVPForm: FunctionComponent<RSVPFormProps> = ({
  respondant,
  weddingPhotoProp,
  onDone,
  isExploding,
  setIsExploding,
}) => {
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
  const [weddingPhoto, setWeddingPhoto] = useState<string>();

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
    <div className="m-2 flex max-w-xl flex-col gap-6 rounded-md py-16 text-center">
      <h1 className="text-4xl font-bold">RSVP Form</h1>
      <form autoComplete="off" className="flex flex-col items-center gap-2">
        <h2 className="text-2xl font-semibold">Guests Invited</h2>
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
          <h2 className="text-2xl font-semibold">
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
      <form autoComplete="on">
        <h2 className="mb-2 text-2xl font-semibold">Current Address</h2>
        <div className="flex flex-col items-center gap-2">
          <input
            className="w-full rounded-md bg-gray-100 p-2 focus:outline-none"
            type="text"
            id="address-in"
            name="address-in"
            placeholder="Address"
            autoComplete="street-address"
            defaultValue={res?.address.address ?? ""}
            ref={addressRef}
          />
          <input
            className="w-full rounded-md bg-gray-100 p-2 focus:outline-none"
            type="text"
            id="city"
            name="city"
            placeholder="City"
            autoComplete="address-level2"
            defaultValue={res?.address.city ?? ""}
            ref={cityRef}
          />
          <input
            className="w-full rounded-md bg-gray-100 p-2 focus:outline-none"
            type="text"
            id="state"
            name="state"
            placeholder="State"
            autoComplete="address-level1"
            defaultValue={res?.address.state ?? ""}
            ref={stateRef}
          />
          <input
            className="w-full rounded-md bg-gray-100 p-2 focus:outline-none"
            type="text"
            id="zipCode"
            name="zipCode"
            placeholder="Zip Code"
            autoComplete="postal-code"
            defaultValue={res?.address.zipCode.toString() ?? ""}
            ref={zipRef}
          />
          <br />
          <h2 className="text-2xl font-semibold">Coming to?</h2>
          <select
            defaultValue={res?.comingTo}
            ref={comingToRef}
            className="w-full cursor-pointer rounded-md bg-gray-100 p-2"
          >
            {Object.values(ComingTo)
              .filter((i) => isNaN(Number(i)))
              .map((value, index) => (
                <option value={index} key={value}>
                  {value}
                </option>
              ))}
          </select>
          <br />
          <h2 className="text-2xl font-semibold">Wedding Photo</h2>
          <p className="text-sm text-gray-500">
            We would be absolutely thrilled to have a glimpse of your cherished
            moments! If you are married, we kindly request you to share the joy
            by uploading your favorite picture from your special day.
          </p>
          <div className="h-36 w-36 overflow-hidden rounded-md bg-gray-100">
            {(weddingPhoto || weddingPhotoProp) && (
              <img
                src={weddingPhoto ?? weddingPhotoProp}
                alt=""
                className="h-full w-full object-cover"
              />
            )}
          </div>
          <input
            className="w-full rounded-md bg-gray-100 p-2"
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
          />
        </div>
      </form>
      <form className="flex flex-col items-center gap-2">
        <button
          type="button"
          onClick={async () => {
            if (
              !comingToRef.current ||
              !addressRef.current ||
              !cityRef.current ||
              !stateRef.current ||
              !zipRef.current ||
              !res ||
              isExploding
            )
              return;

            onDone(
              {
                ...res,
                address: {
                  address: addressRef.current.value,
                  city: cityRef.current.value,
                  state: stateRef.current.value,
                  zipCode: Number(zipRef.current.value),
                },
                comingTo: Number(comingToRef.current.value),
                plusOne,
              },
              weddingPhotoRef.current?.files?.item(0)
            );
          }}
          className={classNames(
            "mt-6 w-full rounded-md bg-primary p-2 text-white hover:brightness-105",
            isExploding && "cursor-not-allowed brightness-95"
          )}
          disabled={isExploding}
        >
          Submit
          <span className="grid place-items-center">
            {isExploding && (
              <ConfettiExplosion
                force={1.5}
                particleCount={250}
                width={1600}
                colors={["#FDB0F0", "#FFEF5F", "#141414"]}
                onComplete={() => {
                  setIsExploding(false);
                }}
              />
            )}
          </span>
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
    <div className="flex w-full justify-between rounded-md bg-gray-100 p-2">
      <div className="flex w-full">
        <input
          className="h-10 w-full flex-1 rounded-l-md bg-gray-50 p-2 focus:outline-none"
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
          className="h-10 w-1/4 cursor-pointer rounded-r-md bg-gray-50"
          defaultValue={person.age.toString()}
          onChange={(e) => {
            person.age = parseInt(e.target.value);
          }}
        >
          <option value={Age.Adult}>Adult</option>
          <option value={Age.Kid}>Kid</option>
        </select>
      </div>
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
