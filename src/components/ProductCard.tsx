// @todo placeholder image

type ProductCardProps = {
  name: string;
  brand: string;
  imageSource?: string;
  price: string;
  stockStatus?: string;
};

const ProductCard = ({
  name,
  brand,
  imageSource,
  price,
  stockStatus,
}: ProductCardProps) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div className="w-full max-h-60 overflow-hidden">
        <img
          className=" object-cover rounded-t-lg w-full h-full"
          src={imageSource}
          alt={name}
        />
      </div>
      <div className="p-5">
        <h5 className="mb-2 text-l font-bold  text-gray-900 dark:text-white">
          {name}
        </h5>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {brand}
        </p>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          £{price}
        </p>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {stockStatus}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
