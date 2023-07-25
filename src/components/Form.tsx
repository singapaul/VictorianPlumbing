import { useState} from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Form({ handleSubmitForm }: any) {
  const [formValues, setFormValues] = useState({
    search: "",
    option: 1,
  });

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const handleSubmit = (event) => {
    event.preventDefault();
    handleSubmitForm(formValues); // Call the parent's callback function and pass the formValues
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex md:flex-col gap-4">
        {/* Search Field */}
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
        <button
          type="submit"
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
