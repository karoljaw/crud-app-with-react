import React, { Component } from 'react';
import './App.css';
import Item from './Item';
import ItemInput from './ItemInput'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = { products: JSON.parse(localStorage.getItem('products')) }

    this.onAdd = this.onAdd.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onEditSubmit = this.onEditSubmit.bind(this);
  }

  onDelete(name) {
    const products = this.state.products

    const filteredProducts = products.filter(product => {
      return product.name !== name;
    });
    localStorage.setItem('products', JSON.stringify(filteredProducts));
    this.setState({products: filteredProducts})
  }

  onAdd(name, price) {
    const products = this.state.products;

    products.push({
      name,
      price
    });
    localStorage.setItem('products', JSON.stringify(products));
    this.setState({ products });
  }

  onEditSubmit(name, price, originalName) {
    let products = this.state.products;

    products = products.map(product => {
      if (product.name === originalName) {
        product.name = name;
        product.price = price;
      }

      return product;
    });
    localStorage.setItem('products', JSON.stringify(products));
    this.setState({ products });
  }

  render() {
    return (
        <div className="App">
        <h1>Product Menager</h1>
        <ItemInput onAdd={this.onAdd}></ItemInput>
        {this.state.products.map(product => {
          return (
          <Item 
            key={product.name}
            name={product.name}
            price={product.price}
            onDelete={this.onDelete}
            onEditSubmit={this.onEditSubmit}>
            </Item>
          )
        })}
       
        </div>
    );
  }
}

export default App;
