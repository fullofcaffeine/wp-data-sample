import React from "react";
import { render, useState, Fragment } from "@wordpress/element";
import { useSelect } from "@wordpress/data";
import { ProductEditView } from "./components/product-edit";
import { ProductGrid } from "./components/product-display";
import { Cart } from "./components/cart";
import BoxForm from "./components/json-box";
import { __, sprintf } from "@wordpress/i18n";
import classnames from "classnames";
import { CART_STORE_KEY } from "./data";

const getRenderedView = (view, onBoxFormSubmit) => {
  switch (view) {
    case "box-form":
      return <BoxForm onSubmit={onBoxFormSubmit} />;
    case "cart":
      return (
        <Fragment>
          <h1>Cart</h1>
          <Cart />
        </Fragment>
      );
    case "display":
      return (
        <Fragment>
          <h1>Product Directory</h1>
          <ProductGrid />
        </Fragment>
      );
    case "edit":
      return (
        <Fragment>
          <h1>Product Editor</h1>
          <ProductEditView />
        </Fragment>
      );
    default:
      return null;
  }
};

function App() {
  const [view, setView] = useState("box-form");
  const countCartItems = useSelect(select => {
    if (window.resourceAddress === "") {
      return 0;
    }
    return select(CART_STORE_KEY).getCartItems().length;
  });
  const buttonClasses = ["btn", "btn-secondary", "btn-sm"];
  const onBoxFormSubmit = () => {
    setView("edit");
  };
  const ViewButtons = () => {
    return view === "box-form" ? null : (
      <div className="fixed-bottom mb-5 mr-5">
        <div
          className="btn-group float-right"
          role="group"
          aria-label={__("Context Switcher")}
        >
          <button
            type="button"
            className={classnames(...buttonClasses, {
              active: view === "edit"
            })}
            onClick={() => setView("edit")}
          >
            {__("Edit")}
          </button>
          <button
            type="button"
            className={classnames(...buttonClasses, {
              active: view === "display"
            })}
            onClick={() => setView("display")}
          >
            {__("Directory")}
          </button>
          <button
            type="button"
            className={classnames(...buttonClasses, {
              active: view === "cart"
            })}
            onClick={() => setView("cart")}
          >
            {sprintf(__("Cart (%s)"), countCartItems)}
          </button>
        </div>
      </div>
    );
  };
  return (
    <div className="mt-5">
      <div className="container">{getRenderedView(view, onBoxFormSubmit)}</div>
      <ViewButtons />
    </div>
  );
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
