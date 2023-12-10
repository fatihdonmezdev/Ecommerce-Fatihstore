import Image from "next/image";
import Link from "next/link";

const Cards = ({ product }) => {
  return (
    <div>
      <Link href={`/products/detail/${product?.id}`}>
        <div>
          <div className="bg-gray-200 lg:h-[300px] flex items-center">
            <Image
              alt="Hero"
              width={200}
              height={200}
              className="mx-auto"
              src={product?.image}
            />
          </div>
          <p className="font-bold text-2xl lg:text-lg mt-2 truncate-description">
            {product?.name}
          </p>
          <p className="truncate-description lg:text-lg  text-xl">
            {product?.description}
          </p>
          <p className="font-bold text-xl lg:text-lg  mt-2">
            ${product?.price}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default Cards;
