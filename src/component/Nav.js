import { useState } from "react";
import Setting from "./Setting";

function Nav(props) {
  const { category, setCategory } = props;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="nav">
      <p className="nav-title">TODOoO</p>
      <p
        className="nav-setting"
        onClick={() => {
          setIsOpen(true);
        }}
      >
        ☸︎
      </p>
      {isOpen ? <Setting category={category} setCategory={setCategory}></Setting> : null}
    </div>
  );
}

export default Nav;
