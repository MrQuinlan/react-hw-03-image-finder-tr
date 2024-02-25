import './App.css';
import { PureComponent } from 'react';
import API from '../services/API';
import Searchbar from './Searchbar';
import { FaSearch } from 'react-icons/fa';
import ImageGallery from './ImageGallery';
import ImageGalleryItem from './ImageGalleryItem';
import Button from './Button';
import Error from './Error';
import Loader from './Loader';
import { createPortal } from 'react-dom';
import Modal from './Modal';

class App extends PureComponent {
  state = {
    gallery: [],
    total: null,
    searchQuery: '',
    page: 1,
    showModal: false,
    currentPicture: {},
    error: 'No images',
    status: 'idle',
  };

  modalPortalRef = document.querySelector('#modal-root');

  componentDidUpdate(prevProps, prevState) {
    if (this.state.searchQuery === '') {
      return;
    }

    const { searchQuery, page } = this.state;

    if (prevState.searchQuery !== searchQuery) {
      const gallery = API(searchQuery, page);

      this.setState({ status: 'pending' });

      gallery
        // .then(res => res.hits)
        .then(images => {
          if (images.total > 0) {
            this.setState({ status: 'resolved' });

            return this.setState({
              gallery: images.hits.map(
                ({ tags, largeImageURL, webformatURL, id }) => {
                  return { tags, largeImageURL, webformatURL, id };
                }
              ),
              total: images.totalHits,
            });
          }

          this.setState({
            status: 'error',
            searchQuery: '',
            // error: error,
          });
        });
    }

    if (prevState.page < page) {
      const gallery = API(searchQuery, page);

      gallery
        .then(res => {
          const images = res.hits;

          return this.setState(() => {
            return {
              gallery: [...prevState.gallery, ...images],
            };
          });
        })
        .then(() => this.setState({ status: 'resolved' }));
    }
  }

  onSubmit = searchQuery => {
    if (!searchQuery) {
      return;
    }
    this.setState({ searchQuery, page: 1 });
  };

  onLoadMore = () => {
    this.setState(state => {
      return { page: state.page + 1 };
    });
  };

  toggleModal = () => {
    if (this.state.showModal) {
      this.setState({ currentPicture: {} });
    }

    this.setState({ showModal: !this.state.showModal });
  };

  onOpenModal = picture => {
    this.setState({ currentPicture: picture });
    this.toggleModal();
  };

  render() {
    const { onSubmit, onOpenModal, onLoadMore, modalPortalRef, toggleModal } =
      this;
    const { gallery, showModal, currentPicture, status, error, total } =
      this.state;

    return (
      <div className="App">
        <Searchbar onSubmit={onSubmit}>
          <FaSearch size="32" />
        </Searchbar>

        {status === 'resolved' && (
          <ImageGallery>
            <ImageGalleryItem
              gallery={gallery}
              onOpenModal={onOpenModal}
            ></ImageGalleryItem>
          </ImageGallery>
        )}

        {status === 'resolved' &&
          total > gallery.length &&
          gallery.length >= 12 && (
            <Button loadMore="Load more" onLoadMore={onLoadMore} />
          )}

        {status === 'error' && <Error message={error} />}

        {status === 'pending' && <Loader />}

        {showModal &&
          createPortal(
            <Modal toggleModal={toggleModal} {...currentPicture} />,
            modalPortalRef
          )}
      </div>
    );
  }
}

export default App;
