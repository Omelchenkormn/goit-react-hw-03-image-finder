import React, { Component } from 'react';
import { fetchImages } from 'services/api';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SearchBar } from '../Searchbar/Searchbar';
import { LoadMore } from 'components/Button/Button';
import ModalWindow from 'components/Modal/Modal';
import Loader from 'components/Loader/Loader';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';

export default class App extends Component {
  state = {
    items: [],
    currentPage: 1,
    query: '',
    isLoading: false,
    showModal: false,
    largeImage: '',
  };

  componentDidUpdate(_, prevState) {
    const next = this.state.query;
    const last = prevState.query;
    if (last !== next) {
      this.setState({ items: [] });
      this.getImages();
    }
  }

  getImages = async () => {
    const { currentPage, query } = this.state;
    this.setState({
      isLoading: true,
    });
    try {
      const { hits } = await fetchImages(query, currentPage);
      this.setState(prevState => ({
        items: [...prevState.items, ...hits],
        currentPage: prevState.currentPage + 1,
      }));
      setTimeout(() => {
        if (this.state.items.length === 0) {
          toast.error('oh not found');
        }
      }, 300);
    } catch (error) {
      console.log('error');
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleSubmit = query => {
    this.setState({ query, currentPage: 1 });
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  handleGalleryItem = fullImageUrl => {
    this.setState({
      largeImage: fullImageUrl,
      showModal: true,
    });
  };

  render() {
    const { items, isLoading, largeImage, showModal } = this.state;
    const visibleLoadMoreBtn = items.length > 0 && items.length >= 12;
    return (
      <>
        <SearchBar onSubmit={this.handleSubmit} />
        {isLoading && <Loader />}
        {showModal && (
          <ModalWindow onClose={this.toggleModal} fullImg={largeImage} />
        )}
        <ImageGallery items={items} getFullImg={this.handleGalleryItem} />
        {visibleLoadMoreBtn && <LoadMore onClick={this.getImages} />}
        <ToastContainer />
      </>
    );
  }
}
