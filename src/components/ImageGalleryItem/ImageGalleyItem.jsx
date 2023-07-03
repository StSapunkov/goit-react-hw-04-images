import css from './ImageGalleyItem.module.css';

import PropTypes from 'prop-types';

export default function ImageGalleyItem({ alt, largerImage, src, ...props }) {
  
  const onClick = () => {
    return props.onClick({
      largerImage: largerImage,
      alt: alt,
    });
  };

  return (
    <li className={css.ImageGalleryItem}>
      <img src={src} alt={alt} onClick={onClick} />
    </li>
  );
}

ImageGalleyItem.propTypes = {
  onClick: PropTypes.func.isRequired,
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  largerImage: PropTypes.string.isRequired,
};