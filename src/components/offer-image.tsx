interface OfferImageProps {
  image: string;
}

export default function OfferImage({image}: OfferImageProps): JSX.Element {
  return (
    <div key={image} className="offer__image-wrapper">
      <img className="offer__image" src={image} alt="Photo studio"/>
    </div>
  );
}
