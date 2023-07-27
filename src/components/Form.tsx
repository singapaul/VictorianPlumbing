import { useState, ChangeEvent, FormEvent } from "react";
import Button from "./Button";
import extractMinMaxNumbers from "../utils/extractMinMax";

interface FormProps {
  handleSubmitForm: (formValues: {
    search: string;
    option: number;
    priceRanges?: string[];
  }) => void;
}

export default function Form({ handleSubmitForm }: FormProps) {
  const [formValues, setFormValues] = useState({
    search: "toilets",
    option: 1,
    priceRanges: [] as string[],
  });

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = event.target;

    if (type === "checkbox") {
      const checked = (event.target as HTMLInputElement).checked;

      const updatedPriceRanges = checked
        ? [...formValues.priceRanges, value]
        : formValues.priceRanges.filter((range) => range !== value);

      setFormValues((prevValues) => ({
        ...prevValues,
        priceRanges: updatedPriceRanges,
      }));
    } else {
      setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { smallest, biggest } = extractMinMaxNumbers(formValues.priceRanges);
    const sendBody = {
      search: formValues.search,
      option: formValues.option,
      low: smallest,
      high: biggest,
    };
    handleSubmitForm(sendBody);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex gap-4 md:flex-col">
          <div className="flex flex-col">
            <label className="block text-left font-bold">
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
            <label className="block text-left font-bold">
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
          </div>
          <div className="block text-left max-w-md">
            <p className="font-bold">Price Range:</p>
            <div className="grid grid-cols-1 gap-2 mt-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="priceRange"
                  value="0-200"
                  checked={formValues.priceRanges.includes("0-200")}
                  onChange={handleChange}
                  className="mr-2"
                />
                £0 - £200
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="priceRange"
                  value="200-500"
                  checked={formValues.priceRanges.includes("200-500")}
                  onChange={handleChange}
                  className="mr-2"
                />
                £200 - £500
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="priceRange"
                  value="500-1000"
                  checked={formValues.priceRanges.includes("500-1000")}
                  onChange={handleChange}
                  className="mr-2"
                />
                £500 - £1000
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="priceRange"
                  value="1000-10000"
                  checked={formValues.priceRanges.includes("1000-10000")}
                  onChange={handleChange}
                  className="mr-2"
                />
                £1000 - £10000
              </label>
            </div>
          </div>
        </div>
        <Button type="submit" label="Submit" variant="secondary" />
      </form>
    </div>
  );
}
