import css from './Button.module.css';

const Button = ({ loadMore, onLoadMore }) => {
  return (
    <button
      className={css.btn}
      type="button"
      onClick={onLoadMore}
      aria-label="load more"
    >
      {loadMore}
    </button>
  );
};

export default Button;
