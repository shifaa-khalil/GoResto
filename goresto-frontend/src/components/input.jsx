import React from "react";
import "../App.css";
import styles from "../css/input.module.css";

const Input = (props) => {
  return (
    <div className={`flex-column ${styles.container}`}>
      <label className={styles.label}>{props.label}</label>
      <input
        type={props.type}
        placeholder={props.placeholder}
        className={styles.input}
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
