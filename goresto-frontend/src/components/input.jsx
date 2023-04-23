import React from "react";
import "../App.css";

const Input = (props) => {
  return (
    <div className="flex-column input-container">
      <label className="form-label">{props.label}</label>
      <input
        type={props.type}
        placeholder={props.placeholder}
        className="form-input"
      />
    </div>
  );
};

export default Input;

// function InputExample() {
//   const [inputValue, setInputValue] = useState('');

//   const handleChange = (event) => {
//     setInputValue(event.target.value);
//   };

//   return (
//     <div>
//       <input type="text" value={inputValue} onChange={handleChange} />
//       <p>You typed: {inputValue}</p>
//     </div>
//   );
// }
