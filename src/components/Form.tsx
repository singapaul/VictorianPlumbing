import { useState, ChangeEvent, FormEvent } from "react";
import Button from "./Button";

interface FormProps {
  handleSubmitForm: (formValues: { search: string; option: number }) => void;
}

export default function Form({ handleSubmitForm }: FormProps) {
  const [formValues, setFormValues] = useState({
    search: "toilets",
    option: 1,
  });

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleSubmitForm(formValues); 
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex md:flex-col gap-4">
        <label className="block text-left">
          Search
          <input
            onChange={handleChange}
            name="search"
            type="text"
            value={formValues.search}
            placeholder="search items"
            className="px-3 py-3 placeholder-slate-300 text-slate-600 relative bg-white bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
          />
        </label>
        <label className="block text-left">
          Sort Results:
          <select
            onChange={handleChange}
            name="option"
            className="px-3 py-3 placeholder-slate-300 text-slate-600 relative bg-white bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
          >
            <option value={1}>Recommended</option>
            <option value={2}>Price: low to high</option>
            <option value={3}>Price: high to low</option>
            <option value={4}>Largest discount</option>
          </select>
        </label>
        <Button type="submit" label="Submit" variant="secondary"/>
      </form>
    </div>
  );
}
