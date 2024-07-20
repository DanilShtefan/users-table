import "./serchInput.scss";

export function SerchInputs({ serch, setSerch }) {
  return (
    <input
      className="serch-inputs"
      onChange={(el) => setSerch(el.target.value)}
      value={serch}
    ></input>
  );
}
