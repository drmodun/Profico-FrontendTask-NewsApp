interface CategoryProps {
  Name: string;
  setCategory: (category: string) => void;
  isActive: boolean;
  ImageOn: string;
  ImageOff: string;
}
export const Category = ({
  Name,
  setCategory,
  isActive,
  ImageOn,
  ImageOff,
}: CategoryProps) => {
  return (
    <div
      className={isActive ? "category-on" : "category-off"}
      onClick={() => setCategory(Name)}
    >
      <img src={isActive ? ImageOn : ImageOff} alt={Name} />
      <p>{Name}</p>
    </div>
  );
};
