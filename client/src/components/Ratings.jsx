function Ratings({ rating, onClick }) {
  return (
    <>
      {Array.from({ length: Math.floor(rating) }).map((_, index) => {
        return (
          <span
            className="text-amber-500 cursor-pointer mx-1 text-xl"
            key={index}
            onClick={() => onClick && onClick(index + 1)}
          >
            ★
          </span>
        );
      })}

      {Array.from({ length: Math.ceil(5 - rating) }).map((_, index) => {
        return (
          <span
            className="text-white cursor-pointer mx-1 text-xl"
            key={index}
            onClick={() =>
              onClick && onClick(Math.floor(rating) + index + 1)
            }
          >
            ☆
          </span>
        );
      })}
    </>
  );
}

export default Ratings;
