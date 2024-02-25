import css from './Searchbar.module.css';
import { PureComponent } from 'react';

export default class Searchbar extends PureComponent {
  state = {
    value: '',
  };

  onInputChange = e => {
    const value = e.currentTarget.value.trim();

    this.setState({ value });
  };

  onFormSubmit = e => {
    e.preventDefault();

    this.props.onSubmit(this.state.value);

    this.setState({ value: '' });
  };

  render() {
    const { onFormSubmit, onInputChange } = this;
    return (
      <header className={css.searchbar}>
        <form className={css.form} onSubmit={onFormSubmit}>
          <button type="submit" className={css.button}>
            {this.props.children}
          </button>

          <input
            className={css.input}
            type="text"
            autoComplete="on"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.value}
            onChange={onInputChange}
          />
        </form>
      </header>
    );
  }
}
