import ImageGalleyItem from 'components/ImageGalleryItem/ImageGalleyItem';
import css from './ImageGallery.module.css';
import PropTypes from 'prop-types';

export default function ImageGallery({ images, openModal, modalImage }) {

  const onClick = ({ largerImage, alt }) => {
    modalImage({ largerImage, alt });
    openModal();
  };

  return (
    <ul className={css.ImageGallery}>
      {images.map(image => {
        return (
          <ImageGalleyItem
            onClick={onClick}
            key={image.id}
            src={image.webformatURL}
            alt={image.tags}
            largerImage={image.largeImageURL}
          />
        );
      })}
    </ul>
  );
}

ImageGallery.propTypes = {
  images: PropTypes.array.isRequired,
  openModal: PropTypes.func.isRequired,
  modalImage: PropTypes.func.isRequired,
};