class ProductList extends React.Component {
  constructor() {
    super();
    this.state = {
      products: []
    };
    this.addProduct = this.addProduct.bind(this);
  }

  addProduct(product) {
    product.id = this.state.products.length + 1;
    const newProductsList = this.state.products.slice();
    newProductsList.push(product);
    this.setState({
      products: newProductsList
    });
  }

  render() {
    return React.createElement(React.Fragment, null, React.createElement("h1", null, "My Company Inventory"), React.createElement("h3", null, "Showing all available products"), React.createElement("hr", null), React.createElement(ProductTable, {
      products: this.state.products
    }), React.createElement("hr", null), React.createElement(ProductAdd, {
      addProduct: this.addProduct
    }));
  }

}

class ProductTable extends React.Component {
  render() {
    const rowStyle = {
      border: "1px solid silver",
      padding: 4
    };
    const productRows = this.props.products.map(product => React.createElement(ProductRow, {
      key: product.id,
      product: product
    }));
    return React.createElement("table", {
      className: "prodTable"
    }, React.createElement("thead", null, React.createElement("tr", null, React.createElement("th", {
      style: rowStyle
    }, "Product Name"), React.createElement("th", {
      style: rowStyle
    }, "Price"), React.createElement("th", {
      style: rowStyle
    }, "Category"), React.createElement("th", {
      style: rowStyle
    }, "Image"))), React.createElement("tbody", null, productRows));
  }

}

class ProductRow extends React.Component {
  render() {
    const product = this.props.product;
    const rowStyle = {
      border: "1px solid silver",
      padding: 4
    };
    return React.createElement("tr", null, React.createElement("td", {
      align: "center",
      style: rowStyle
    }, product.productName), React.createElement("td", {
      align: "center",
      style: rowStyle
    }, "$", product.pricePerUnit), React.createElement("td", {
      align: "center",
      style: rowStyle
    }, product.category), React.createElement("td", {
      align: "center",
      style: rowStyle
    }, React.createElement("a", {
      href: product.imageUrl,
      target: "_blank"
    }, "View")));
  }

}

class ProductAdd extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const form = document.forms.productAdd;
    const price = form.pricePerUnit.value;
    const product = {
      category: form.category.value,
      pricePerUnit: price.substring(1, price.length),
      productName: form.productName.value,
      imageUrl: form.imageUrl.value
    };
    this.props.addProduct(product);
    form.category.value = "";
    form.pricePerUnit.value = "$";
    form.productName.value = "";
    form.imageUrl.value = "";
  }

  render() {
    return React.createElement("div", null, React.createElement("h3", null, "Add a new product to inventory"), React.createElement("hr", null), React.createElement("div", {
      className: "row"
    }, React.createElement("form", {
      name: "productAdd",
      onSubmit: this.handleSubmit
    }, React.createElement("div", {
      className: "column"
    }, React.createElement("p", null, React.createElement("label", {
      htmlFor: "category"
    }, "Category : "), React.createElement("br", null), React.createElement("select", {
      name: "category"
    }, React.createElement("option", {
      value: "Shirts"
    }, "Shirts"), React.createElement("option", {
      value: "Jeans"
    }, "Jeans"), React.createElement("option", {
      value: "Jackets"
    }, "Jackets"), React.createElement("option", {
      value: "Sweaters"
    }, "Sweaters"), React.createElement("option", {
      value: "Accessories"
    }, "Accessories"))), React.createElement("p", null, React.createElement("label", {
      htmlFor: "productName"
    }, "Product Name : "), React.createElement("br", null), React.createElement("input", {
      type: "text",
      name: "productName"
    })), React.createElement("button", {
      className: "button"
    }, "Add Product")), React.createElement("div", {
      className: "column"
    }, React.createElement("p", null, React.createElement("label", {
      htmlFor: "pricePerUnit"
    }, "Price Per Unit : "), React.createElement("br", null), React.createElement("input", {
      type: "text",
      name: "pricePerUnit",
      defaultValue: "$"
    })), React.createElement("p", null, React.createElement("label", {
      htmlFor: "image"
    }, "Image : "), React.createElement("br", null), React.createElement("input", {
      type: "text",
      name: "imageUrl"
    }))))));
  }

}

const element = React.createElement(ProductList, null);
ReactDOM.render(element, document.getElementById('content'));