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
    return React.createElement(React.Fragment, null, React.createElement("h1", null, "My Company Inventory"), React.createElement("hr", null), React.createElement("h3", null, "Showing all available products"), React.createElement("hr", null), React.createElement(ProductTable, {
      products: this.state.products
    }), React.createElement("hr", null), React.createElement(ProductAdd, {
      addProduct: this.addProduct
    }));
  }

}

class ProductTable extends React.Component {
  render() {
    const productRows = this.props.products.map(product => React.createElement(ProductRow, {
      key: product.id,
      product: product
    }));
    return React.createElement("table", null, React.createElement("thead", null, React.createElement("tr", null, React.createElement("th", null, "Product Name"), React.createElement("th", null, "Price"), React.createElement("th", null, "Category"), React.createElement("th", null, "Image"))), React.createElement("tbody", null, productRows));
  }

}

class ProductRow extends React.Component {
  render() {
    const product = this.props.product;
    return React.createElement("tr", null, React.createElement("td", null, product.productName), React.createElement("td", null, "$", product.pricePerUnit), React.createElement("td", null, product.category), React.createElement("td", null, React.createElement("a", {
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
    return React.createElement("form", {
      name: "productAdd",
      onSubmit: this.handleSubmit
    }, React.createElement("select", {
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
    }, "Accessories")), React.createElement("input", {
      type: "text",
      name: "pricePerUnit",
      placeholder: "Price Per Unit",
      defaultValue: "$"
    }), React.createElement("input", {
      type: "text",
      name: "productName",
      placeholder: "Product Name"
    }), React.createElement("input", {
      type: "text",
      name: "imageUrl",
      placeholder: "Image URL"
    }), React.createElement("button", null, "Add Product"));
  }

}

const element = React.createElement(ProductList, null);
ReactDOM.render(element, document.getElementById('content'));