import { TagCloud } from "react-tagcloud";

interface Word {
  value: string;
  count: number;
}

interface SimpleCloudProps {
  words: Word[];
}

const SimpleCloud: React.FC<SimpleCloudProps> = ({ words }) => {
  const handleRedirect = (tag: Word) => {
    // Redirect to the tag page
    window.location.href = `/tags/${encodeURIComponent(tag.value)}`;
  };

  return (
    <TagCloud
      className="hover:cursor-pointer"
      minSize={12}
      maxSize={35}
      tags={words}
      shuffle={true}
      colorOptions={{
        luminosity: "bright",
        hue: "orange",
      }}
      onClick={handleRedirect}
    />
  );
};

export default SimpleCloud;
