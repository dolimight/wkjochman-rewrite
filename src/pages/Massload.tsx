import { FunctionComponent, useCallback, useState } from "react";
import * as XLSX from "xlsx";
import useMassload, { MassloadRSVP } from "../hooks/useMassload";
import { Person, Age, ComingTo } from "../hooks/useRSVP";
import useRespondant from "../hooks/useRespondant";
import classNames from "classnames";

interface MassloadProps {}

const Massload: FunctionComponent<MassloadProps> = () => {
  enum LogType {
    Error = "text-red-500",
    Message = "text-success",
    Warning = "bg-warning text-warning-content",
  }
  const [file, setFile] = useState<File | null>(null);

  const { addRSVP } = useMassload();
  const { generateFamilyName } = useRespondant();

  const onChange = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      if (e.currentTarget.files) {
        const files = e.currentTarget.files;
        setFile(files[0]);
        const console = document.getElementById("console-out");
        if (console) {
          console.innerHTML = "";
        }
      }
    },
    [file]
  );

  const handleFile = () => {
    const reader = new FileReader();
    let numErrors = 0;
    let skipping = false;

    reader.onload = (evt) => {
      if (evt.target) {
        const bstr = evt.target.result;
        const wb = XLSX.read(bstr, { type: "binary" });
        const wsname = wb.SheetNames[2];
        const ws = wb.Sheets[wsname];
        const data: {
          address: string;
          ages: string;
          getsPlusOne: boolean;
          lastname: string;
          names: string;
          code: string;
        }[] = XLSX.utils.sheet_to_json(ws);
        data.forEach(async (item) => {
          if (
            item.address != null &&
            item.ages != null &&
            item.code != null &&
            item.lastname != null &&
            item.names != null
          ) {
            let people: Person[] = [];
            let names = item.names.split(",").map((str) => str.trim());
            let ages: Age[] = item.ages
              .toString()
              .split(",")
              .map((str) => str.trim())
              .map((age) => parseInt(age) as Age);
            let addressData: string[] = item.address
              .split(",")
              .map((e) => e.trim());
            let address;
            if (addressData.length > 3) {
              address = {
                address: addressData[0],
                city: addressData[1],
                state: addressData[2],
                zipCode: parseInt(addressData[3]),
              };
            } else {
              address = {
                address: addressData.join(","),
                city: "",
                state: "",
                zipCode: NaN,
              };
            }

            for (let i = 0; i < names.length; ++i) {
              people.push({ name: names[i], age: ages[i] });
            }
            let rsvp: MassloadRSVP = {
              respondant: {
                names: people,
                lastname: item.lastname,
                getsPlusOne: item.getsPlusOne,
                address: address,
                comingTo: ComingTo.Unknown,
              },
              code: item.code,
            };
            try {
              await addRSVP(rsvp);
              logData(
                `Added: ${generateFamilyName(rsvp.respondant)} as code: ${
                  rsvp.code
                }`,
                LogType.Message
              );
            } catch (e) {
              logData(
                `Unable to Add: ${generateFamilyName(
                  rsvp.respondant
                )} as code: ${rsvp.code}: ${e}`,
                LogType.Warning
              );
            }
          } else {
            if (numErrors < 5) {
              let text = `Error Reading Line: ${data.indexOf(item) + 1};`;
              let errors = [];
              if (!item.address) {
                errors.push("address");
              }
              if (!item.names) {
                errors.push("names");
              }
              if (!item.code) {
                errors.push("code");
              }
              if (!item.ages) {
                errors.push("ages");
              }
              if (!item.lastname) {
                errors.push("lastname");
              }
              text += ` Missing: (${errors.join(", ")})`;
              logData(text, LogType.Error);
              ++numErrors;
            } else {
              if (!skipping) {
                logData("Skipping Errors...", LogType.Error);
                skipping = true;
              }
            }
          }
        });
        setFile(null);
        const input = document.getElementById("input") as HTMLInputElement;
        if (input) {
          input.value = "";
        }
      }
    };
    file && reader.readAsBinaryString(file);
  };

  function logData(msg: string, type: LogType) {
    let ele = document.createElement("pre");
    let code = document.createElement("code");
    code.innerText = msg;
    ele.className += type;
    ele.append(code);
    ele.setAttribute("data-prefix", ">");
    document.getElementById("console-out")?.append(ele);
  }

  return (
    <div className="flex w-full flex-col items-center justify-center gap-2 p-4">
      <div className="flex gap-2">
        <input
          type="file"
          className="file-input-bordered file-input-info file-input w-full max-w-xs"
          id="input"
          onChange={onChange}
        />
        <button
          className={classNames("btn-info btn", !file && "btn-disabled")}
          onClick={handleFile}
        >
          Submit
        </button>
      </div>
      <div className="w-full max-w-4xl text-left">
        <h1 className="mb-2 text-center text-4xl font-bold">Console</h1>
        <div className="mockup-code w-full bg-gray-800">
          <div id="console-out" className="h-[600px] overflow-y-auto"></div>
        </div>
      </div>
    </div>
  );
};

export default Massload;
