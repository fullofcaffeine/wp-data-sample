import React from "react";
import { __ } from "@wordpress/i18n";
import { useSelect, useDispatch } from "@wordpress/data";
import { Fragment } from "@wordpress/element";
import { CART_STORE_KEY } from "../../data";

const CartRow = ({ cartItem, onRemove }) => {
  const { id, name, price } = cartItem;
  return (
    <tr>
      <td>{name}</td>
      <td className={"text-right"}>{price}</td>
      <td className={"text-right"}>
        <button
          className={"btn btn-secondary btn-sm btn-danger"}
          onClick={() => onRemove(id)}
        >
          {__("Remove")}
        </button>
      </td>
    </tr>
  );
};

const CartTable = () => {
  const { cartItems, cartTotal } = useSelect(select => {
    return {
      cartItems: select(CART_STORE_KEY).getCartItems(),
      cartTotal: select(CART_STORE_KEY).getCartTotal()
    };
  }, []);
  const { removeCartItem } = useDispatch(CART_STORE_KEY);
  const cartRows = cartItems.map(cartItem => {
    return (
      <CartRow
        key={cartItem.id}
        cartItem={cartItem}
        onRemove={id => removeCartItem(id)}
      />
    );
  });
  const cellStyle = {
    width: "5%"
  };
  return (
    <Fragment>
      <table className={"table"}>
        <thead>
          <tr>
            <th className="w-50">{__("Name")}</th>
            <th className={"text-right"} style={cellStyle}>
              {__("Price")}
            </th>
            <th />
          </tr>
        </thead>
        <tbody>{cartRows}</tbody>
        <tfoot>
          <tr>
            <td className={"text-right"}>{__("Total:")}</td>
            <td className={"text-right"}>{cartTotal}</td>
            <td />
          </tr>
        </tfoot>
      </table>
    </Fragment>
  );
};

export default CartTable;
