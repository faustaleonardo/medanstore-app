/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import { AuthContext } from '../context/auth/authState';
import { CategoryProvider } from '../context/categories/categoryState';
import { ItemProvider } from '../context/items/itemState';
import { VoucherProvider } from '../context/vouchers/voucherState';
import { CartProvider } from '../context/carts/cartState';

// partials
import Header from './partials/Header';
import SearchBar from './partials/SearchBar';
import Jumbotron from './partials/Jumbotron';

// auth
import Login from './auth/Login';
import Signup from './auth/Signup';

// items
import ItemList from './items/ItemList';
import ItemDetails from './items/ItemDetails';

// checkout
import Checkout from './orders/Checkout';
import Order from './orders/Order';

// admin manage
import Category from './admin/categories/Category';
import CategoryForm from './admin/categories/CategoryForm';

import Item from './admin/items/Item';
import ItemForm from './admin/items/ItemForm';

import Voucher from './admin/vouchers/Voucher';
import VoucherForm from './admin/vouchers/VoucherForm';

const App = () => {
  const { fetchUser } = useContext(AuthContext);
  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="container">
      <BrowserRouter>
        <div>
          <CartProvider>
            <Header />
            <SearchBar />
            <Route exact path="/" component={Jumbotron} />

            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />

            <ItemProvider>
              <Route exact path="/items" component={ItemList} />
              <Route exact path="/items/:id" component={ItemDetails} />
            </ItemProvider>

            <Route exact path="/checkout" component={Checkout} />
            <Route exact path="/orders" component={Order} />
          </CartProvider>

          {/* admin only */}
          <CategoryProvider>
            <Route exact path="/admin/categories" component={Category} />
            <Route
              exact
              path="/admin/categories/create"
              render={props => (
                <CategoryForm
                  {...props}
                  title="Create a Category"
                  buttonName="Create"
                />
              )}
            />
            <Route
              exact
              path="/admin/categories/:id/update"
              render={props => (
                <CategoryForm
                  {...props}
                  title="Update the Category"
                  buttonName="Update"
                />
              )}
            />
          </CategoryProvider>

          <ItemProvider>
            <Route exact path="/admin/items" component={Item} />
            <Route
              exact
              path="/admin/items/create"
              render={props => (
                <ItemForm
                  {...props}
                  title="Create an Item"
                  buttonName="Create"
                />
              )}
            />
            <Route
              exact
              path="/admin/items/:id/update"
              render={props => (
                <ItemForm
                  {...props}
                  title="Update the Item"
                  buttonName="Update"
                />
              )}
            />
          </ItemProvider>

          <VoucherProvider>
            <Route exact path="/admin/vouchers" component={Voucher} />
            <Route
              exact
              path="/admin/vouchers/create"
              render={props => (
                <VoucherForm
                  {...props}
                  title="Create a Voucher"
                  buttonName="Create"
                />
              )}
            />
            <Route
              exact
              path="/admin/vouchers/:id/update"
              render={props => (
                <VoucherForm
                  {...props}
                  title="Update the Voucher"
                  buttonName="Update"
                />
              )}
            />
          </VoucherProvider>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
