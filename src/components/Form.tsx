import { useState } from "react";

export default function Form() {
  const [form, setForm] = useState({
    search: "",
    option: "",
  });

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const handleChange = (evt) => {
    const name = evt.target.name;
    const value = evt.target.value;
    setForm({ ...form, [name]: value });
    console.log(form);
  };

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const handleSubmit = (evt) => {
    evt.preventDefault();
    console.log(form);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label title="search" placeholder="search">
          <input
            onChange={handleChange}
            name="search"
            type="text"
            value={form.search}
          />
        </label>
        <select onChange={handleChange} name="dropDown" id="">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </select>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
