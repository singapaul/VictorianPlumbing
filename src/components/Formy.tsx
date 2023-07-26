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
    priceRanges: [] as string[], // Initialize an empty array for selected price ranges
  });

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const { name, value, type, checked } = event.target;

    if (type === "checkbox") {
      // If the checkbox is checked, add the value to the priceRanges array
      // If unchecked, remove the value from the priceRanges array
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

  // const extractMinMaxNumbers = (
  //   ranges: string[]
  // ): { smallest: number; biggest: number } => {
  //   const numbers: number[] = ranges.flatMap((range) =>
  //     range.split("-").map(Number)
  //   );
  //   const smallest: number = Math.min(...numbers);
  //   const biggest: number = Math.max(...numbers);
  //   return { smallest, biggest };
  // };

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
        <label className="block text-left">
          Price Range:
          <div>
            <input
              type="checkbox"
              name="priceRange"
              value="0-200"
              checked={formValues.priceRanges.includes("0-200")}
              onChange={handleChange}
            />
            £0 - £200
          </div>
          <div>
            <input
              type="checkbox"
              name="priceRange"
              value="200-500"
              checked={formValues.priceRanges.includes("200-500")}
              onChange={handleChange}
            />
            £200 - £500
          </div>
          <div>
            <input
              type="checkbox"
              name="priceRange"
              value="500-1000"
              checked={formValues.priceRanges.includes("500-1000")}
              onChange={handleChange}
            />
            £500 - £1000
          </div>
          <div>
            <input
              type="checkbox"
              name="priceRange"
              value="1000-10000"
              checked={formValues.priceRanges.includes("1000-10000")}
              onChange={handleChange}
            />
            £1000 - £10000
          </div>
        </label>
        <Button type="submit" label="Submit" variant="secondary" />
      </form>
    </div>
  );
}
