import css from './ImageGallery.module.css';

const ImageGallery = ({ children }) => {
  return <ul className={css.gallery}>{children}</ul>;
};

export default ImageGallery;
