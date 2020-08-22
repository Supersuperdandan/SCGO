import React, { useEffect, useState } from "react";
import ImageGallery from "react-image-gallery";

function ProductImage(props) {
  const path =
    process.env.NODE_ENV === "production" ? "." : "http://localhost:5000";
  const [Images, setImages] = useState([]);

  useEffect(() => {
    if (props.detail.images && props.detail.images.length > 0) {
      let images = [];

      props.detail.images &&
        props.detail.images.map((item) => {
          images.push({
            original: `${path}/${item}`,
            thumbnail: `${path}/${item}`,
          });
          return null;
        });
      setImages(images);
    }
  }, [props.detail]);

  return (
    <div>
      <ImageGallery items={Images} />
    </div>
  );
}

export default ProductImage;
