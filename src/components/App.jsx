import css from './App.module.css';
import Searchbar from './Searchbar/Searchbar';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
import { fetchByName, pagination } from '../services/pixabay-api';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import { useState, useEffect } from 'react';
import Error from './Error/Error';

export default function App() {
  const [foundImages, setFoundImages] = useState(null);
  const [searchItem, setSearchItem] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [largerImage, setLargerImage] = useState(null);
  const [total, setTotal] = useState(0);
  const [alt, setAlt] = useState(null);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('idle');
  const [nextPage, setNextPage] = useState(1);

  useEffect(() => {
    if (searchItem !== '') {
      setStatus('pending');
      setNextPage(2);
      fetchByName(searchItem)
        .then(foundImages => {
          if (foundImages.total !== 0) {
            setFoundImages(foundImages.hits);
            setStatus('resolved');
            setError(null);
            setTotal(foundImages.total);
            if (foundImages.hits.length !== 1) {
              setShowButton(true);
            }
          } else {
            setStatus('rejected');
            setError(new Error(`Cannot find photos for ${searchItem} category`));
          }
        })
        .catch(error => {
          setError(error);
          setStatus('rejected');
        });
    }
  }, [searchItem]);

  const setSearchItemEl = data => {
    setSearchItem(data);
  };

  const toggleModal = () => {
    setShowModal(prev => !prev);
  };

  const modalImage = ({ alt, largerImage }) => {
    setLargerImage(largerImage);
    setAlt(alt);
  };

  const onLoadMore = () => {
    pagination(searchItem, nextPage)
      .then(newImages => {
        setFoundImages(prev => [...prev, ...newImages.hits]);
        setStatus('resolved');
        setNextPage(prev => prev + 1);
        console.log(newImages.hits.length);
        if (foundImages.length + 12 >= total) {
          setShowButton(false);
        }
      })
      .catch(error => {
        setError(error);
        setStatus('rejected');
      });
  };

  return (
    <div className={css.app}>
      <Searchbar onSubmit={setSearchItemEl} />
      {status === 'pending' && <Loader />}
      {status === 'resolved' && (
        <ImageGallery
          images={foundImages}
          openModal={toggleModal}
          modalImage={modalImage}
        />
      )}
      {status === 'rejected' && <Error error={error.message} />}
      {status === 'resolved' && showButton && <Button onClick={onLoadMore} />}
      {showModal && (
        <Modal onClose={toggleModal}>
          <img src={largerImage} alt={alt} />
        </Modal>
      )}
    </div>
  );
}