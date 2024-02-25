import css from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ gallery, onOpenModal }) => {
  return gallery.map(({ tags, largeImageURL, webformatURL, id }, index) => (
    <li className={css.item} key={id}>
      <img
        src={webformatURL}
        className={css.img}
        onClick={() => onOpenModal({ largeImageURL, tags })}
        alt={tags}
      ></img>
    </li>
  ));
};

export default ImageGalleryItem;
