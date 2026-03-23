import OfferImage from "./offer-image";

interface OfferGalleryProps {
  imagesToShow: string[];
}

export default function OfferGallery({ imagesToShow }: OfferGalleryProps): JSX.Element {
  return (
    <div className="offer__gallery-container container">
      <div className="offer__gallery">
        {imagesToShow.map((image) => (
          <OfferImage key={image} image={image} />
        ))}
      </div>
    </div>
  );
}
